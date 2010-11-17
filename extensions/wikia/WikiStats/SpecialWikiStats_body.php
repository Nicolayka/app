<?php

/**
 * @package MediaWiki
 * @subpackage SpecialPage
 * @author Piotr Molski <moli@wikia.com> for Wikia.com
 * @version: $Id$
 */

if ( !defined( 'MEDIAWIKI' ) ) {
    echo "This is MediaWiki extension and cannot be used standalone.\n";
    exit( 1 ) ;
}

class WikiStatsPage extends IncludableSpecialPage
{
    var $mPosted;
    var $mStats;
    var $mSkinName;
    var $userIsSpecial;
    var $mFromDate;
    var $mToDate;
    var $mTab;
    var $mUser;
    var $mSkin;
    var $mCityId;
    var $mCityDBName;
    var $mCityDomain;
    var $mLang;
    var $mHub;
    var $mNS;
    var $mAction;
    var $mActiveTab;
    var $mXLS;
    var $mAllWikis;
    var $mMonth;
    var $mLimit;
	   
	private $TEST = 0;
	private $defaultAction = 'main';
    const USE_MEMC = 0;

    #--- constructor
    public function __construct() {
        parent::__construct( "WikiStats", "",  true/*class*/);
        if ( method_exists( 'SpecialPage', 'setGroup' ) ) { 
			parent::setGroup( 'WikiStats', 'wiki' );	
		}
    }

    public function execute( $subpage ) {
        global $wgUser, $wgOut, $wgRequest, $wgCityId, $wgDBname, $wgLang;

		wfLoadExtensionMessages("WikiStats");

        if ( $wgUser->isBlocked() ) {
            $wgOut->blockedPage();
            return;
        }
        
        if ( wfReadOnly() ) {
            $wgOut->readOnlyPage();
            return;
        }

        $this->mStats = WikiStats::newFromId($wgCityId);        
        
		$this->mUser = $wgUser;
		$this->userIsSpecial = $this->mStats->isAllowed();
        
		$this->mFromDate 	= intval($wgRequest->getVal( "wsfrom", sprintf("%d%d", WIKISTATS_MIN_STATS_YEAR, WIKISTATS_MIN_STATS_MONTH) ));
		$this->mToDate 		= intval($wgRequest->getVal( "wsto", sprintf("%d%d", date("Y"), date("m") ) ));
		$this->mTitle 		= Title::makeTitle( NS_SPECIAL, "WikiStats" );
		$this->mAction		= $wgRequest->getVal("action", "");
		$this->mXLS 		= $wgRequest->getVal("wsxls", false);
		$this->mMonth 		= $wgRequest->getVal("wsmonth", 0);
		$this->mLimit		= $wgRequest->getVal("wslimit", WIKISTATS_WIKIANS_RANK_NBR);					
		$this->mAllWikis 	= 0;
			
		$domain = $all = "";
		if ( $this->userIsSpecial ) {		
			$this->mLang 		= $wgRequest->getVal("wslang", "");
			$this->mHub 		= $wgRequest->getVal("wscat", "");
			$this->mNS 			= $wgRequest->getIntArray("wsns", "");
			$domain 			= $wgRequest->getVal( "wswiki", "" );
			$all 				= $wgRequest->getVal( "wsall", 0 );
			$this->mNamespaces  = $wgLang->getNamespaces();
			$this->mPredefinedNamespaces = $this->mStats->getPageNSList();   		
		}
		
		$this->mCityId 		= ($this->TEST == 1 ) ? 177 : $wgCityId;
		$this->mCityDBName 	= ($this->TEST == 1 ) ? WikiFactory::IDtoDB($this->mCityId) : $wgDBname;
		
		#---
		if ( $subpage ) { 
			$path = explode("/", $subpage);
			$this->mAction = $path[0];
		}

		if ( empty($this->mAction) ) {
			$wgOut->redirect( $this->mTitle->getFullURL("action={$this->defaultAction}") );
		}
				
		$m = array();
		$this->toYear 		= date('Y');
		$this->toMonth 		= date('m');
		$this->fromYear 	= WIKISTATS_MIN_STATS_YEAR;
		$this->fromMonth 	= WIKISTATS_MIN_STATS_MONTH;
		
		if ( preg_match("/^([0-9]{4})([0-9]{1,2})/", $this->mFromDate, $m) ) {
			list (, $this->fromYear, $this->fromMonth) = $m; 
		}

		if ( preg_match("/^([0-9]{4})([0-9]{1,2})/", $this->mToDate, $m) ) {
			list (, $this->toYear, $this->toMonth) = $m; 
		}
		
		if ( $domain == 'all' || $all == 1 ) {
        	$this->mCityId = 0;
        	$this->mCityDBName = WIKISTATS_CENTRAL_ID;
        	$this->mCityDomain = 'all';
        	$this->mAllWikis = 1;
		} elseif ( !empty($domain) && $this->userIsSpecial == 1 ) {
        	$this->mCityId = WikiFactory::DomainToId($domain);
        	$this->mCityDBName = WikiFactory::IDToDB($this->mCityId);
        	$this->mCityDomain = $domain;
		} else {
        	$this->mCityDomain = WikiFactory::DBToDomain($this->mCityDBName);
		}

        #--- WikiaGenericStats instance
        $this->mStats = WikiStats::newFromId($this->mCityId);        

        $this->mStats->setStatsDate( array( 
        	'fromMonth' => $this->fromMonth,
        	'fromYear' 	=> $this->fromYear,
        	'toMonth'	=> $this->toMonth,
        	'toYear'	=> $this->toYear
        ));
        
        $this->mStats->setHub($this->mHub);
        $this->mStats->setLang($this->mLang);
        
        #---
        $this->mSkin = $wgUser->getSkin();
        if ( is_object ($this->mSkin) ) {
            $skinname = get_class( $this->mSkin );
            $skinname = strtolower(str_replace("Skin","", $skinname));
            $this->mSkinName = $skinname;
        }     

		$this->setHeaders();
		$this->showForm();	
		
		if ( $this->mAction ) {
			$func = sprintf("show%s", ucfirst(strtolower($this->mAction)));
			if ( method_exists($this, $func) ) {
				$this->$func($subpage);
			}
		} 
    }
    
	function showForm ($error = "") {
		global $wgOut, $wgContLang, $wgExtensionsPath, $wgStyleVersion, $wgJsMimeType, $wgStylePath ;
        wfProfileIn( __METHOD__ );

		# css
		#$wgOut->addScript("<link rel=\"stylesheet\" type=\"text/css\" href=\"{$wgExtensionsPath}/wikia/WikiStats/css/jquery.tabs.css?{$wgStyleVersion}\" />\n");
		#$wgOut->addScript("<!--[if lte IE 7]><link rel=\"stylesheet\" href=\"{$wgExtensionsPath}/wikia/WikiStats/css/jquery.tabs-ie.css?{$wgStyleVersion}\" type=\"text/css\"><![endif]-->");
		$wgOut->addExtensionStyle("{$wgExtensionsPath}/wikia/WikiStats/css/wikistats.css?{$wgStyleVersion}");
		$wgOut->addExtensionStyle("{$wgStylePath}/common/wikia_ui/tabs.css?{$wgStyleVersion}");

		# script
		#$wgOut->addScript("<script type=\"{$wgJsMimeType}\" src=\"{$wgExtensionsPath}/wikia/WikiStats/js/visualize.jQuery.js?{$wgStyleVersion}\"></script>\n");
		#$wgOut->addScript("<script type=\"{$wgJsMimeType}\" src=\"{$wgExtensionsPath}/wikia/WikiStats/js/jquery.tabs.min.js?{$wgStyleVersion}\"></script>\n");
		$wgOut->addScript("<script type=\"{$wgJsMimeType}\" src=\"{$wgExtensionsPath}/wikia/WikiStats/js/wikistats.js?{$wgStyleVersion}\"></script>\n");

		# main page
        $oTmpl = new EasyTemplate( dirname( __FILE__ ) . "/templates/" );

		$wgOut->setSubtitle( $oTmpl->execute("subtitle") );

        $oTmpl->set_vars( array(
        	"mTitle"			=> $this->mTitle,
        	"wgContLang"		=> $wgContLang,
        	"wgExtensionsPath" 	=> $wgExtensionsPath, 
        	"wgStylePath"		=> $wgStylePath,
        	"wgCityId"			=> $this->mCityId,
        	"oUser"				=> $this->mUser,
        	"mAction"			=> $this->mAction,
        	"userIsSpecial"		=> $this->userIsSpecial,
        	"domain"			=> $this->mCityDomain,
        	"dateRange"			=> $this->mStats->getRangeDate(),
        	"updateDate"		=> $this->mStats->getUpdateDate(),
        	"fromMonth"			=> $this->fromMonth,
        	"fromYear"			=> $this->fromYear,
        	"curMonth"			=> intval($this->toMonth),
        	"curYear"			=> intval($this->toYear),
			"mHub"				=> $this->mHub,
			"mLang"				=> $this->mLang,
			"mAllWikis"			=> $this->mAllWikis        	
        ));
        $wgOut->addHTML( $oTmpl->execute("main-form") );
        
        wfProfileOut( __METHOD__ );
        return 1;
	}
	
	private function showMenu($subpage = '', $namespaces = false) {
		global $wgOut, $wgDBname;
        wfProfileIn( __METHOD__ );

		$aTopLanguages = explode(',', wfMsg('wikistats_language_toplist'));
		$aLanguages = wfGetFixedLanguageNames();
		asort($aLanguages);
		#-
		$hubs = WikiFactoryHub::getInstance();
		$_cats = $hubs->getCategories();
		$aCategories = array();
		if ( !empty($_cats) ) {
			foreach ( $_cats as $id => $cat ) {
				if ( !isset($aCategories[$id]) ) {
					$aCategories[$id] = $cat['name'];
				}
			}
		};

		# main page
        $oTmpl = new EasyTemplate( dirname( __FILE__ ) . "/templates/" );
        $params = array(
        	"mTitle"			=> $this->mTitle,
        	"wgCityId"			=> $this->mCityId,
        	"domain"			=> $this->mCityDomain,
        	"dateRange"			=> $this->mStats->getRangeDate(),
        	"updateDate"		=> $this->mStats->getUpdateDate(),
        	"fromMonth"			=> $this->fromMonth,
        	"fromYear"			=> $this->fromYear,
        	"curMonth"			=> intval($this->toMonth),
        	"topLanguages"		=> $aTopLanguages,
        	"aLanguages"		=> $aLanguages,
        	"categories"		=> $aCategories,
        	"curYear"			=> intval($this->toYear),
			"mHub"				=> $this->mHub,
			"mLang"				=> $this->mLang,
			"mAllWikis"			=> $this->mAllWikis,
			"mAction"			=> $this->mAction
        );
		
		#- additional menu for namespaces;
		if ( $namespaces ) {
			$params['mNS'] = $this->mNS;
						
			$params['namespaces'] = $this->mNamespaces;
			$params['definedNamespaces'] = $this->mPredefinedNamespaces;
			$params['mNS'] = $this->mNS;
		}
        
        $oTmpl->set_vars( $params );
        
        if ( $this->userIsSpecial == 1 && $wgDBname == WIKISTATS_CENTRAL_ID ) {
			$res = $oTmpl->execute("select");
		} else {
			$res = $oTmpl->execute("select_user");
		}

        wfProfileOut( __METHOD__ );
        return $res;
	}
	
	private function showMain($subpage = '') {
        global $wgUser, $wgContLang, $wgLang, $wgStatsExcludedNonSpecialGroup, $wgOut;
		#---
		if ( empty($this->mXLS) ) {
			wfProfileIn( __METHOD__ );
			$oTmpl = new EasyTemplate( dirname( __FILE__ ) . "/templates/" );
			$oTmpl->set_vars( array(
				"data"			=> $this->mStats->loadStatsFromDB(),
				"today" 		=> date("Ym"),
				"today_day"     => $this->mStats->getLatestStats(),
				"user"			=> $wgUser,
				"diffData"		=> $this->mStats->loadMonthlyDiffs(),
				"cityId"		=> $this->mCityId,
				"wgContLang" 	=> $wgContLang,
				"wgLang"		=> $wgLang,
				"mStats"		=> $this->mStats,
				"userIsSpecial" => $this->userIsSpecial,
				"wgStatsExcludedNonSpecialGroup" => $wgStatsExcludedNonSpecialGroup
			) );
			$wgOut->addHTML( $this->showMenu() );
			if  ( $this->mFromDate <= $this->mToDate ) {
				$wgOut->addHTML( $this->mStats->getBasicInformation() );
				$wgOut->addHTML( $oTmpl->execute("main-table-stats") ); 
				
				$oTmpl->set_vars( array(
					"columns" 		=> $this->mStats->getRangeColumns(),
					"userIsSpecial"	=> $this->userIsSpecial,
					"wgStatsExcludedNonSpecialGroup" => $wgStatsExcludedNonSpecialGroup
				));
				$wgOut->addHTML( $oTmpl->execute("main-stats-definitions") );
			}
			wfProfileOut( __METHOD__ );
		} else {
			$data = $this->mStats->loadStatsFromDB();
			$columns = $this->mStats->getRangeColumns();
			$XLSObj = new WikiStatsXLS( $this->mStats, $data, wfMsg('wikistats_filename_mainstats', $this->mCityDBName));
			$XLSObj->makeMainStats($columns);
		}
        #---
        return 1; 
	}
	
	private function showBreakdown($subpage = '') {
		$this->__showBreakdown(0);
        return 1; 
	}
	
	private function showAnonbreakdown($subpage = '') {
		$this->__showBreakdown(1);
        return 1; 
	}	
	
	private function __showBreakdown($anons = 0) {
        global $wgUser, $wgContLang, $wgLang, $wgOut;
		#---
		$out = $this->mStats->userBreakdown($this->mMonth, $this->mLimit, $anons);
					
		if ( empty($this->mXLS) ) {
			wfProfileIn( __METHOD__ );
			$oTmpl = new EasyTemplate( dirname( __FILE__ ) . "/templates/" );
			$oTmpl->set_vars( array(
				"mTitle"		=> $this->mTitle,
				"mMonth"		=> $this->mMonth,
				"mLimit"		=> $this->mLimit,
				"user"			=> $wgUser,
				"cityId"		=> $this->mCityId,
				"wgContLang" 	=> $wgContLang,
				"mAction"		=> $this->mAction,
				"wgLang"		=> $wgLang,
				"anons"			=> $anons,
				"data"			=> $out
			) );
			$wgOut->addHTML( $oTmpl->execute("activity") ); 
			wfProfileOut( __METHOD__ );
		} else {
/*			$data = $this->mStats->loadStatsFromDB();
			$columns = $this->mStats->getRangeColumns();
			$XLSObj = new WikiStatsXLS( $this->mStats, $data, wfMsg('wikistats_filename_mainstats', $this->mCityDBName));
			$XLSObj->makeMainStats($columns);
*/
		}
		#---
		return 1; 
	}
	
	private function showLatestview($subpage = '') {
		global $wgUser, $wgContLang, $wgLang, $wgOut;
		
		wfProfileIn( __METHOD__ );
		$rows = $this->mStats->latestViewPages();
		$oTmpl = new EasyTemplate( dirname( __FILE__ ) . "/templates/" );
		$oTmpl->set_vars( array(
			"user"			=> $wgUser,
			"cityId"		=> $this->mCityId,
			"wgContLang" 	=> $wgContLang,
			"wgLang"		=> $wgLang,
			"data"			=> $rows,
		) );
		$wgOut->addHTML( $oTmpl->execute("latestview") ); 
		wfProfileOut( __METHOD__ );
	}
	
	private function showUserview($subpage = '') {
		global $wgUser, $wgContLang, $wgLang, $wgOut;
		
		wfProfileIn( __METHOD__ );
		$rows = $this->mStats->userViewPages(1);
		$oTmpl = new EasyTemplate( dirname( __FILE__ ) . "/templates/" );
		$oTmpl->set_vars( array(
			"user"			=> $wgUser,
			"cityId"		=> $this->mCityId,
			"wgContLang" 	=> $wgContLang,
			"wgLang"		=> $wgLang,
			"data"			=> $rows,
		) );
		$wgOut->addHTML( $oTmpl->execute("user_activity") ); 
		wfProfileOut( __METHOD__ );
	}
		
	private function showActivity($subpage = '') {
		global $wgUser, $wgContLang, $wgLang, $wgOut, $wgExtensionsPath, $wgStylePath, $wgStyleVersion, $wgJsMimeType;
		
		wfProfileIn( __METHOD__ );
		$wgOut->addScript("<script type=\"{$wgJsMimeType}\" src=\"{$wgStylePath}/common/jquery/jquery.dataTables.min.js?{$wgStyleVersion}\"></script>\n");
		
		@list (, $pyear, $pmonth, $plang, $pcat) = explode("/", $subpage);
		
		$aTopLanguages = explode(',', wfMsg('wikistats_language_toplist'));
		$aLanguages = wfGetFixedLanguageNames();
		asort($aLanguages);
		#-
		$hubs = WikiFactoryHub::getInstance();
		$_cats = $hubs->getCategories();
		$aCategories = array();
		if ( !empty($_cats) ) {
			foreach ( $_cats as $id => $cat ) {
				if ( !isset($aCategories[$id]) ) {
					$aCategories[$id] = $cat['name'];
					if ( $pcat == $cat['name'] ) {
						$pcat = intval($id);
					}
				}
			}
		};
		
		if ( !is_numeric($pcat) ) {
			$pcat = 0;
		}
		
		if ( empty($pyear) ) {
			$pyear = date('Y');
		}
		
		if ( empty($pmonth) ) {
			$pmonth = date('m');
		}
		
		#$rows = $this->mStats->userEdits(1);
		$oTmpl = new EasyTemplate( dirname( __FILE__ ) . "/templates/" );
		$oTmpl->set_vars( array(
			"user"			=> $wgUser,
			"cityId"		=> $this->mCityId,
			"wgContLang" 	=> $wgContLang,
			"wgLang"		=> $wgLang,
        	"topLanguages"	=> $aTopLanguages,
        	"aLanguages"	=> $aLanguages,
        	"categories"	=> $aCategories,	
        	"pyear"			=> $pyear,
        	"pmonth"		=> $pmonth,
        	"plang"			=> ( !empty($plang) ) ? $plang : $wgLang->getCode(),
        	"pcat"			=> $pcat
		) );
		$wgOut->addHTML( $oTmpl->execute("wiki_activity") ); 
		wfProfileOut( __METHOD__ );
	}
			
	private function showNamespaces() {
        global $wgUser, $wgContLang, $wgLang, $wgStatsExcludedNonSpecialGroup, $wgOut;
		#---
		$selectedNamespace = array();
		if ( isset($this->mNS) && isset($this->mNamespaces) && isset($this->mPredefinedNamespaces) ) {
			foreach ( $this->mNS as $ns ) {
				$selectedNamespace[$ns] = @$this->mNamespaces[$ns];
				if ( empty($selectedNamespace[$ns]) ) {
					$selectedNamespace[$ns] = @$this->mPredefinedNamespaces[$ns]['name'];				
				}
			}
		}
		
		$this->mStats->setPageNS($this->mNS);
			
		if ( empty($this->mXLS) ) {
			wfProfileIn( __METHOD__ );
			$menu = $this->showMenu('', 1);
			$oTmpl = new EasyTemplate( dirname( __FILE__ ) . "/templates/" );
			$oTmpl->set_vars( array(
				"data"			=> $this->mStats->namespaceStatsFromDB(),
				"today" 		=> date("Ym"),
				"today_day"     => $this->mStats->getLatestNSStats(),
				"user"			=> $wgUser,
				"cityId"		=> $this->mCityId,
				"wgContLang" 	=> $wgContLang,
				"wgLang"		=> $wgLang,
				"mStats"		=> $this->mStats,
				"userIsSpecial" => $this->userIsSpecial,
				"tableTitle"	=> $selectedNamespace
			) );
			$wgOut->addHTML( $menu );
			if  ( $this->mFromDate <= $this->mToDate ) {
				$wgOut->addHTML( $oTmpl->execute("ns-table-stats") ); 
			}
			wfProfileOut( __METHOD__ );
		} else {
			$data = $this->mStats->namespaceStatsFromDB();
			$XLSObj = new WikiStatsXLS( $this->mStats, $data, wfMsg('wikistats_ns_statistics_legend'));
			$XLSObj->makeNamespaceStats($selectedNamespace);
		}
        #---
        return 1; 
	}

	private function showCurrent() {
        wfProfileIn( __METHOD__ );
        echo __METHOD__ ;
        wfProfileOut( __METHOD__ );
	}

	private function showCompare() {
        wfProfileIn( __METHOD__ );
        echo __METHOD__ ;
        wfProfileOut( __METHOD__ );
	}
}

?>

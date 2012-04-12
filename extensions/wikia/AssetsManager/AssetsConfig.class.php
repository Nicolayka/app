<?php
/**
 * AssetsConfig
 *
 * In this class word 'item' stands for single entry in configuration array while 'asset' stand for specific path or url
 *
 * @author Inez Korczyński <korczynski@gmail.com>
 */

class AssetsConfig {
	private /* array */ $mConfig;

	public static function getSiteCSS( $combine, $minify = null, $params = null, $skinname = 'oasis', $articleName = 'Wikia.css') {
		$srcs = array();
		global $wgSquidMaxage;
		$siteargs = array(
			'action' => 'raw',
			'maxage' => $wgSquidMaxage,
		);
		// BugId:20929 tell (or trick) varnish to store the latest revisions of Wikia.css and Common.css.
		$oTitleCommonCss	= Title::newFromText( 'Common.css', NS_MEDIAWIKI );
		$oTitleWikiaCss		= Title::newFromText( 'Wikia.css',  NS_MEDIAWIKI );
		$siteargs['maxrev'] = max( (int) $oTitleWikiaCss->getLatestRevID(), (int) $oTitleCommonCss->getLatestRevID() );
		unset( $oTitleWikiaCss, $oTitleCommonCss );

		$query = wfArrayToCGI( array(
			'usemsgcache' => 'yes',
			'ctype' => 'text/css',
			'smaxage' => $wgSquidMaxage
		) + $siteargs );
		$siteargs['gen'] = 'css';
		$siteargs['useskin'] = $skinname;

		$srcs[] = Title::newFromText( $articleName, NS_MEDIAWIKI)->getFullURL( $query );
		$srcs[] = Title::newFromText( '-' )->getFullURL( wfArrayToCGI( $siteargs ) );
		return $srcs;
	}

	public static function getSiteJS( $combine ) {
		return array(Title::newFromText('-')->getFullURL('action=raw&smaxage=0&gen=js&useskin=oasis'));
	}

	/**
	 * Generates the URL for the Weinre inspector script
	 *
	 * @author Federico "Lox" Lucignano <federico(at)wikia-inc.com>
	 * @see http://phonegap.github.com/weinre/
	 * @param bool $combine
	 *
	 * @return array an array containing the asset url
	 */
	public static function getWeinreJS( $combine ) {
		$app = F::app();
		$server = '';
		$ret = array();

		//this asset request is generated only by the wiki and not served by AssetsManagerServer, so it's safe to rely on conf
		if ( !empty( $app->wg->enableWeinre ) ) {
			$weinre = F::build( 'Weinre' );

			if ( $weinre->isEnabled() ) {
				$host = $weinre->getRequestedHost();

				//allow testing from non-owned test environment or production/staging
				if ( !empty( $host ) ) {
					$server = $host;
				} else if ( !empty( $app->wg->develEnvironment ) ) {
					$server = "{$_SERVER['SERVER_ADDR']}:{$app->wg->weinrePort}";
				}
			}
		}

		if ( !empty( $server ) ) {
			$ret[] = "http://{$server}/target/target-script-min.js";
		}

		return $ret;
	}

	public static function getRTEAssets( $combine ) {
		global $IP;
		$path = "extensions/wikia/RTE";
		$files = array(
			// CK core entry point
			$path . '/ckeditor/_source/core/ckeditor_base.js',
		);

		$input = file_get_contents( $IP . '/' . $path . '/ckeditor/ckeditor.wikia.pack' );
		$input = substr( $input, strpos($input, 'files :') + 7 );
		$input = trim( $input, " \n\t[]{}" );

		// get all *.js files from ckeditor.wikia.pack file
		if ( preg_match_all( '%[^/]\'([^\']+).js%', $input, $matches, PREG_SET_ORDER ) ) {
			foreach( $matches as $match ) {
				$name = $match[1] . '.js';
				$files[] = $path . '/ckeditor/' . $name;
			}
		}

		return $files;
	}

	public static function getEPLAssets( $combine ) {
		// This class always exists at the moment, this is just in case it goes away at some point
		if (class_exists('EditPageLayoutHelper')) {
			return EditPageLayoutHelper::getAssets();
		} else {
			return array();
		}
	}

	public static function getJQueryUrl( $combine, $minify, $params ) {
		global $wgUseJQueryFromCDN;

		if (!empty($wgUseJQueryFromCDN)) {
			$url = $minify
				? '#external_http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js'
				: '#external_http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.js';
		} else {
			$url = 'skins/common/jquery/jquery-1.7.2.js';
		}

		return array($url);
	}

	/**
	 * Loads packages definitions from config.php
	 *
	 * @author Federico "Lox" Lucignano <federico(at)wikia-inc.com>
	 */
	private function load(){
		wfProfileIn( __METHOD__ );

		if( empty( $this->mConfig ) ) {
			include( 'config.php' );
			$this->mConfig = $config;
		}

		wfProfileOut( __METHOD__ );
	}

	/**
	 * Returns the skin(s) which a package is registered for
	 *
	 * @author Federico "Lox" Lucignano <federico(at)wikia-inc.com>
	 */
	public function getGroupSkin( $groupName ) {
		$this->load();

		if ( isset( $this->mConfig[$groupName] ) ) {
			return ( isset( $this->mConfig[$groupName]['skin'] ) ) ? $this->mConfig[$groupName]['skin'] : null;
		} else {
			//this is being called on non-defined groups programmatically, so no need to log failure
			return null;
		}
	}

	/**
	 * Returns type of particular group. If group does not exists then return null
	 *
	 * @author Inez Korczyński <korczynski@gmail.com>
	 */
	public function getGroupType( $groupName ) {
		$this->load();

		if ( isset( $this->mConfig[$groupName] ) ) {
			return $this->mConfig[$groupName]['type'];
		} else {
			//this is being called on non-defined groups programmatically, so no need to log failure
			return null;
		}
	}

	/**
	 * Returns assets array for particular group. If group does not exists in config then returns empty array
	 *
	 * @author Inez Korczyński <korczynski@gmail.com>
	 */
	protected function getGroupAssets( $groupName ) {
		$this->load();

		if (isset( $this->mConfig[$groupName] ) ) {
			return $this->mConfig[$groupName]['assets'];
		} else {
			$requestDetails = AssetsManager::getRequestDetails();
			Wikia::log(__METHOD__, false, "group '{$groupName}' doesn't exist ({$requestDetails})", true /* $always */);
			return array();
		}
	}

	/**
	 * Based on the group name get items assigned to it and pass to resolveItemsToAssets mathod for resolving into particular assets
	 *
	 * @author Inez Korczyński <korczynski@gmail.com>
	 */
	public function resolve( /* string */ $groupName, /* boolean */ $combine = true, /* boolean */ $minify = true, /* array */ $params = array() ) {
		return $this->resolveItemsToAssets( $this->getGroupAssets( $groupName ), $combine, $minify, $params );
	}

	/**
	 * Based on the array of items resolves it into array of assets
	 * Parameters $combine, $minify and $params are eventually passed to custom function (look at #function_) which may deliver different set of assets based on them
	 *
	 * @author Inez Korczyński <korczynski@gmail.com>
	 */
	private function resolveItemsToAssets( /* array */ $items, /* boolean */ $combine, /* boolean */ $minify, /* array */ $params ) {
		$assets = array();

		foreach ( $items as $item ) {
			if ( substr( $item, 0, 2 ) == '//' ) {
				// filepath - most typical case
				$assets[] = substr( $item, 2 );
			} elseif ( substr( $item, 0, 7 ) == '#group_' ) {
				// reference to another group
				$assets = array_merge( $assets, $this->resolve( substr( $item, 7 ), $combine, $minify, $params ) );
			} elseif ( substr ($item, 0, 10 ) == '#function_' ) {
				// reference to a function that returns array of URIs
				$assets = array_merge( $assets, call_user_func( substr( $item, 10 ), $combine, $minify, $params ) );
			} elseif ( substr ($item, 0, 10 ) == '#external_' ) {
				// reference to a file to be fetched by the browser from external server (BugId:9522)
				$assets[] = $item;
			} elseif ( Http::isValidURI( $item ) ) {
				// reference to remote file (http and https)
				$assets[] = $item;
			}
		}

		return $assets;
	}
}
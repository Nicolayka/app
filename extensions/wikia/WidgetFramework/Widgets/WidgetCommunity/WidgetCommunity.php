<?php
/**
 * @author Inez Korczynski <inez@wikia.com>
 * @author Maciej Brencz
 * */
if(!defined('MEDIAWIKI')) {
	die(1);
}

global $wgWidgets;
$wgWidgets['WidgetCommunity'] = array(
	'callback' => 'WidgetCommunity',
	'title' => array(
		'en' => 'Community'
	),
	'desc' => array(
		'en' => 'Community'
   	),
	'closeable' => false,
	'editable' => false,
	'listable' => false
);

function WidgetCommunity($id, $params) {
	if($params['skinname'] != 'monaco') {
		return '';
	}

	wfProfileIn(__METHOD__);

	global $wgUser, $wgLang, $wgStylePath;
	$total = SiteStats::articles();
	$total = $wgLang->formatNum($total);

	$avatar = $wgStylePath.'/monaco/images/community_avatar.gif';
	if( class_exists("BlogAvatar") ) {
		$avatar = BlogAvatar::newFromUser( $wgUser )->display( 29, 29, false, false, "community_avatar" );
	}
	elseif(class_exists("WikiaAvatar")) {
		$userAvatar = new WikiaAvatar($wgUser->getId());
		$image = $userAvatar->getAvatarImage("m");
		$avatar = '<a rel="nofollow" href="/index.php?title=Special:AvatarUpload"><img src="'.$image.'" id="community_avatar" /></a>';
	}

	// WhosOnline
	$online = array();
	global $wgEnableWhosOnlineExt;
	if( !empty( $wgEnableWhosOnlineExt ) ) {
		$aResult = WidgetFrameworkCallAPI(array('action' => 'query', 'list' => 'whosonline', 'wklimit' => 5));
		if(!empty($aResult['query']['whosonline'])) {
			$online = $aResult['query']['whosonline'];
		}
	}

	// template stuff
	$tmpl = new EasyTemplate(dirname( __FILE__ ));
	$tmpl->set_vars(array(
		'widgetId' => $id,
		'total' => $total,
		'recentlyEditedHTML' => WidgetCommunityGetRecentlyEditedHTML(),
		'username' => $wgUser->getName(),
		'userpageurl' => $wgUser->getUserPage()->getLocalURL(),
		'talkpageurl' => $wgUser->getTalkPage()->getLocalURL(),
		'users' => $online,
		'avatarLink' => $avatar));

	$output = $tmpl->execute('WidgetCommunity');

	wfProfileOut(__METHOD__);
	return $output;
}

function WidgetCommunityGetRecentlyEditedHTML() {
	global $wgMemc;
	$ret = $wgMemc->get( wfMemcKey( 'WidgetCommunity', 'recentlyEditedHTML' ) );
	if( $ret ) return $ret;

	$recentlyEdited = array();
	global $wgHideRCinCommunityWidget;
	if ( empty( $wgHideRCinCommunityWidget ) ) {
		global $wgContentNamespaces;
		$aResult = WidgetFrameworkCallAPI(array(
			"action" => "query",
			"list" => "recentchanges",
			"rclimit" => 2,
			"rctype" => "edit|new",
			"rcshow" => "!anon|!bot",
			"rcnamespace" => "0|1|2|3|6|7" . '|' . implode('|', $wgContentNamespaces),
			"rcprop" => "title|timestamp|user"));

		$recentlyEdited = $aResult['query']['recentchanges'];
	}

	$ret = '';
	foreach($recentlyEdited as $key => $val) {
		$ret .= "<li>\n";
	        $ret .= "\t\t\t" . wfMsg('monaco-latest-item',
					'<a rel="nofollow" href="'.Title::newFromText($val['title'])->escapeLocalURL().'">'.$val['title'].'</a><br />',
					'<a rel="nofollow" href="'.Title::newFromText($val['user'], NS_USER)->escapeLocalURL().'">'.$val['user'].'</a>' . WidgetCommunityFormatTime( $val['timestamp'] ) 
				) . "\n";
		$ret .= "\t\t</li>\n";
	}
	$wgMemc->set( wfMemcKey( 'WidgetCommunity', 'recentlyEditedHTML' ), $ret );

	return $ret;
}

$wgHooks['RecentChange_save'][] = 'WidgetCommunityPurgeRecentlyEditedHTML';
function WidgetCommunityPurgeRecentlyEditedHTML( $rc ) {
	global $wgMemc;
	$wgMemc->delete( wfMemcKey( 'WidgetCommunity', 'recentlyEditedHTML' ) );
}

function WidgetCommunityFormatTime($time) {
	$diff = time() - strtotime($time);
	if ($diff < 60) { //less than a minute
		return wfMsgExt( 'widget-community-secondsago', array( 'parsemag' ), $diff );
	} else if ($diff < (60 * 60)) { //less than an hour
		$minutes = floor($diff/60);
		return wfMsgExt('widget-community-minutesago', array( 'parsemag' ), $minutes);
	} else if ($diff < (60 * 60 * 24)) { //less than a day
		$hours = floor($diff/(60*60));
		return wfMsgExt('widget-community-hoursago', array( 'parsemag' ), $hours);
	} else if ($diff < (60 * 60 * 24 * 2)) { //less than 2 days
		return wfMsg('widget-community-yesterday');
	}
	return '';
}

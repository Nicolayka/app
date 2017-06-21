!function e(n,t,r){function i(o,l){if(!t[o]){if(!n[o]){var u="function"==typeof require&&require;if(!l&&u)return u(o,!0);if(a)return a(o,!0);var c=new Error("Cannot find module '"+o+"'");throw c.code="MODULE_NOT_FOUND",c}var s=t[o]={exports:{}};n[o][0].call(s.exports,function(e){var t=n[o][1][e];return i(t?t:e)},s,s.exports,e,n,t,r)}return t[o].exports}for(var a="function"==typeof require&&require,o=0;o<r.length;o++)i(r[o]);return i}({1:[function(){OO||(OO={})},{}],2:[function(e){e("./InitOOUnderscore.js");var n={};window&&!window.debugHazmat&&(n={warn:function(){}}),OO.HM||"undefined"!=typeof window&&"undefined"!=typeof window._?window.Hazmat||e("hazmat"):OO.HM=e("hazmat").create(n),OO.HM||(OO.HM=window.Hazmat.noConflict().create(n))},{"./InitOOUnderscore.js":3,hazmat:5}],3:[function(e){e("./InitOO.js"),window._||(window._=e("underscore")),OO._||(OO._=window._.noConflict())},{"./InitOO.js":1,underscore:6}],4:[function(){!function(e,n){e.STATE={LOADING:"loading",READY:"ready",PLAYING:"playing",PAUSED:"paused",BUFFERING:"buffering",ERROR:"error",DESTROYED:"destroyed",__end_marker:!0},e.EVENTS={PLAYER_CREATED:"playerCreated",PLAYER_EMBEDDED:"playerEmbedded",SET_EMBED_CODE:"setEmbedCode",EMBED_CODE_CHANGED:"embedCodeChanged",SET_ASSET:"setAsset",ASSET_CHANGED:"assetChanged",UPDATE_ASSET:"updateAsset",ASSET_UPDATED:"assetUpdated",AUTH_TOKEN_CHANGED:"authTokenChanged",GUID_SET:"guidSet",WILL_FETCH_PLAYER_XML:"willFetchPlayerXml",PLAYER_XML_FETCHED:"playerXmlFetched",WILL_FETCH_CONTENT_TREE:"willFetchContentTree",SAVE_PLAYER_SETTINGS:"savePlayerSettings",CONTENT_TREE_FETCHED:"contentTreeFetched",WILL_FETCH_METADATA:"willFetchMetadata",METADATA_FETCHED:"metadataFetched",THUMBNAILS_FETCHED:"thumbnailsFetched",WILL_FETCH_AUTHORIZATION:"willFetchAuthorization",AUTHORIZATION_FETCHED:"authorizationFetched",WILL_FETCH_AD_AUTHORIZATION:"willFetchAdAuthorization",AD_AUTHORIZATION_FETCHED:"adAuthorizationFetched",CAN_SEEK:"canSeek",WILL_RESUME_MAIN_VIDEO:"willResumeMainVideo",PLAYBACK_READY:"playbackReady",INITIAL_PLAY:"initialPlay",WILL_PLAY:"willPlay",REPLAY:"replay",PLAYHEAD_TIME_CHANGED:"playheadTimeChanged",BUFFERING:"buffering",BUFFERED:"buffered",DOWNLOADING:"downloading",BITRATE_INFO_AVAILABLE:"bitrateInfoAvailable",SET_TARGET_BITRATE:"setTargetBitrate",BITRATE_CHANGED:"bitrateChanged",CLOSED_CAPTIONS_INFO_AVAILABLE:"closedCaptionsInfoAvailable",SET_CLOSED_CAPTIONS_LANGUAGE:"setClosedCaptionsLanguage",CLOSED_CAPTION_CUE_CHANGED:"closedCaptionCueChanged",ASSET_DIMENSION:"assetDimension",SCRUBBING:"scrubbing",SCRUBBED:"scrubbed",SEEK:"seek",SEEKED:"seeked",PLAY:"play",PLAYING:"playing",PLAY_FAILED:"playFailed",PAUSE:"pause",PAUSED:"paused",PLAYED:"played",DISPLAY_CUE_POINTS:"displayCuePoints",INSERT_CUE_POINT:"insertCuePoint",RESET_CUE_POINTS:"resetCuePoints",WILL_CHANGE_FULLSCREEN:"willChangeFullscreen",FULLSCREEN_CHANGED:"fullscreenChanged",SIZE_CHANGED:"sizeChanged",CHANGE_VOLUME:"changeVolume",VOLUME_CHANGED:"volumeChanged",CONTROLS_SHOWN:"controlsShown",CONTROLS_HIDDEN:"controlsHidden",END_SCREEN_SHOWN:"endScreenShown",ERROR:"error",DESTROY:"destroy",WILL_PLAY_FROM_BEGINNING:"willPlayFromBeginning",DISABLE_PLAYBACK_CONTROLS:"disablePlaybackControls",ENABLE_PLAYBACK_CONTROLS:"enablePlaybackControls",VC_READY:"videoControllerReady",VC_CREATE_VIDEO_ELEMENT:"videoControllerCreateVideoElement",VC_UPDATE_ELEMENT_STREAM:"videoControllerUpdateElementStream",VC_VIDEO_ELEMENT_CREATED:"videoControllerVideoElementCreated",VC_FOCUS_VIDEO_ELEMENT:"videoControllerFocusVideoElement",VC_VIDEO_ELEMENT_IN_FOCUS:"videoControllerVideoElementInFocus",VC_VIDEO_ELEMENT_LOST_FOCUS:"videoControllerVideoElementLostFocus",VC_DISPOSE_VIDEO_ELEMENT:"videoControllerDisposeVideoElement",VC_VIDEO_ELEMENT_DISPOSED:"videoControllerVideoElementDisposed",VC_SET_VIDEO_STREAMS:"videoControllerSetVideoStreams",VC_ERROR:"videoControllerError",VC_SET_INITIAL_TIME:"videoSetInitialTime",VC_PLAY:"videoPlay",VC_WILL_PLAY:"videoWillPlay",VC_PLAYING:"videoPlaying",VC_PLAYED:"videoPlayed",VC_PLAY_FAILED:"videoPlayFailed",VC_PAUSE:"videoPause",VC_PAUSED:"videoPaused",VC_SEEK:"videoSeek",VC_SEEKING:"videoSeeking",VC_SEEKED:"videoSeeked",VC_PRELOAD:"videoPreload",VC_RELOAD:"videoReload",VC_PRIME_VIDEOS:"videoPrimeVideos",VC_TAG_FOUND:"videoTagFound",WILL_FETCH_ADS:"willFetchAds",DISABLE_SEEKING:"disableSeeking",ENABLE_SEEKING:"enableSeeking",WILL_PLAY_ADS:"willPlayAds",WILL_PLAY_SINGLE_AD:"willPlaySingleAd",WILL_PAUSE_ADS:"willPauseAds",WILL_RESUME_ADS:"willResumeAds",WILL_PLAY_NONLINEAR_AD:"willPlayNonlinearAd",PLAY_NONLINEAR_AD:"playNonlinearAd",NONLINEAR_AD_DISPLAYED:"nonlinearAdDisplayed",ADS_PLAYED:"adsPlayed",SINGLE_AD_PLAYED:"singleAdPlayed",ADS_ERROR:"adsError",ADS_CLICKED:"adsClicked",FIRST_AD_FETCHED:"firstAdFetched",AD_CONFIG_READY:"adConfigReady",WILL_SHOW_COMPANION_ADS:"willShowCompanionAds",AD_FETCH_FAILED:"adFetchFailed",MIDROLL_PLAY_FAILED:"midrollPlayFailed",SKIP_AD:"skipAd",UPDATE_AD_COUNTDOWN:"updateAdCountdown",REPORT_EXPERIMENT_VARIATIONS:"reportExperimentVariations",FETCH_STYLE:"fetchStyle",STYLE_FETCHED:"styleFetched",SET_STYLE:"setStyle",USE_SERVER_SIDE_HLS_ADS:"useServerSideHlsAds",LOAD_ALL_VAST_ADS:"loadAllVastAds",ADS_FILTERED:"adsFiltered",ADS_MANAGER_HANDLING_ADS:"adsManagerHandlingAds",ADS_MANAGER_FINISHED_ADS:"adsManagerFinishedAds",OVERLAY_RENDERING:"overlayRendering",SHOW_AD_CONTROLS:"showAdControls",SHOW_AD_MARQUEE:"showAdMarquee",PAGE_UNLOAD_REQUESTED:"pageUnloadRequested",PAGE_PROBABLY_UNLOADING:"pageProbablyUnloading",REPORT_DISCOVERY_IMPRESSION:"reportDiscoveryImpression",REPORT_DISCOVERY_CLICK:"reportDiscoveryClick",PLAYLISTS_READY:"playlistReady",UI_READY:"uiReady",__end_marker:!0},e.ERROR={API:{NETWORK:"network",SAS:{GENERIC:"sas",GEO:"geo",DOMAIN:"domain",FUTURE:"future",PAST:"past",DEVICE:"device",PROXY:"proxy",CONCURRENT_STREAMS:"concurrent_streams",INVALID_HEARTBEAT:"invalid_heartbeat",ERROR_DEVICE_INVALID_AUTH_TOKEN:"device_invalid_auth_token",ERROR_DEVICE_LIMIT_REACHED:"device_limit_reached",ERROR_DEVICE_BINDING_FAILED:"device_binding_failed",ERROR_DEVICE_ID_TOO_LONG:"device_id_too_long",ERROR_DRM_RIGHTS_SERVER_ERROR:"drm_server_error",ERROR_DRM_GENERAL_FAILURE:"drm_general_failure",ERROR_INVALID_ENTITLEMENTS:"invalid_entitlements"},CONTENT_TREE:"content_tree",METADATA:"metadata"},PLAYBACK:{GENERIC:"playback",STREAM:"stream",LIVESTREAM:"livestream",NETWORK:"network_error"},CHROMECAST:{MANIFEST:"chromecast_manifest",MEDIAKEYS:"chromecast_mediakeys",NETWORK:"chromecast_network",PLAYBACK:"chromecast_playback"},UNPLAYABLE_CONTENT:"unplayable_content",INVALID_EXTERNAL_ID:"invalid_external_id",EMPTY_CHANNEL:"empty_channel",EMPTY_CHANNEL_SET:"empty_channel_set",CHANNEL_CONTENT:"channel_content",VC:{UNSUPPORTED_ENCODING:"unsupported_encoding",UNABLE_TO_CREATE_VIDEO_ELEMENT:"unable_to_create_video_element"}},e.URLS={VAST_PROXY:n.template("http://player.ooyala.com/nuplayer/mobile_vast_ads_proxy?callback=<%=cb%>&embed_code=<%=embedCode%>&expires=<%=expires%>&tag_url=<%=tagUrl%>"),EXTERNAL_ID:n.template("<%=server%>/player_api/v1/content_tree/external_id/<%=pcode%>/<%=externalId%>"),CONTENT_TREE:n.template("<%=server%>/player_api/v1/content_tree/embed_code/<%=pcode%>/<%=embedCode%>"),METADATA:n.template("<%=server%>/player_api/v1/metadata/embed_code/<%=playerBrandingId%>/<%=embedCode%>?videoPcode=<%=pcode%>"),SAS:n.template("<%=server%>/player_api/v1/authorization/embed_code/<%=pcode%>/<%=embedCode%>"),ANALYTICS:n.template("<%=server%>/reporter.js"),THUMBNAILS:n.template("<%=server%>/api/v1/thumbnail_images/<%=embedCode%>"),__end_marker:!0},e.VIDEO={MAIN:"main",ADS:"ads",ENCODING:{DRM:{HLS:"hls_drm",DASH:"dash_drm"},AUDIO:"audio",DASH:"dash",HDS:"hds",HLS:"hls",IMA:"ima",PULSE:"pulse",MP4:"mp4",YOUTUBE:"youtube",RTMP:"rtmp",SMOOTH:"smooth",WEBM:"webm",AKAMAI_HD_VOD:"akamai_hd_vod",AKAMAI_HD2_VOD_HLS:"akamai_hd2_vod_hls",AKAMAI_HD2_VOD_HDS:"akamai_hd2_vod_hds",AKAMAI_HD2_HDS:"akamai_hd2_hds",AKAMAI_HD2_HLS:"akamai_hd2_hls",FAXS_HLS:"faxs_hls",WIDEVINE_HLS:"wv_hls",WIDEVINE_MP4:"wv_mp4",WIDEVINE_WVM:"wv_wvm",UNKNOWN:"unknown"},FEATURE:{CLOSED_CAPTIONS:"closedCaptions",VIDEO_OBJECT_SHARING_GIVE:"videoObjectSharingGive",VIDEO_OBJECT_SHARING_TAKE:"videoObjectSharingTake",BITRATE_CONTROL:"bitrateControl"},TECHNOLOGY:{FLASH:"flash",HTML5:"html5",MIXED:"mixed",OTHER:"other"}},e.CSS={VISIBLE_POSITION:"0px",INVISIBLE_POSITION:"-100000px",VISIBLE_DISPLAY:"block",INVISIBLE_DISPLAY:"none",VIDEO_Z_INDEX:1e4,SUPER_Z_INDEX:2e4,ALICE_SKIN_Z_INDEX:11e3,OVERLAY_Z_INDEX:10500,TRANSPARENT_COLOR:"rgba(255, 255, 255, 0)",__end_marker:!0},e.TEMPLATES={RANDOM_PLACE_HOLDER:["[place_random_number_here]","<now>","[timestamp]","<rand-num>","[cache_buster]","[random]"],REFERAK_PLACE_HOLDER:["[referrer_url]","[LR_URL]"],EMBED_CODE_PLACE_HOLDER:["[oo_embedcode]"],MESSAGE:'                  <table width="100%" height="100%" bgcolor="black" style="padding-left:55px; padding-right:55px;                   background-color:black; color: white;">                  <tbody>                  <tr valign="middle">                  <td align="right"><span style="font-family:Arial; font-size:20px">                  <%= message %>                  </span></td></tr></tbody></table>                  ',__end_marker:!0},e.CONSTANTS={AD_PLAY_COUNT_KEY:"oo_ad_play_count",AD_ID_TO_PLAY_COUNT_DIVIDER:":",AD_PLAY_COUNT_DIVIDER:"|",MAX_AD_PLAY_COUNT_HISTORY_LENGTH:20,CONTROLS_BOTTOM_PADDING:10,SEEK_TO_END_LIMIT:4,CLOSED_CAPTIONS:{SHOWING:"showing",HIDDEN:"hidden",DISABLED:"disabled"},OOYALA_PLAYER_SETTINGS_KEY:"ooyala_player_settings",__end_marker:!0}}(OO,OO._)},{}],5:[function(e,n,t){var r=function(e,n){var t=function(n){if(this.config=n||{},!e.isObject(this.config))throw new Error("Hazmat is not initialized properly");this.fail=e.isFunction(this.config.fail)?this.config.fail:t.fail,this.warn=e.isFunction(this.config.warn)?this.config.warn:t.warn,this.log=e.isFunction(this.config.log)?this.config.log:t.log};return e.extend(t,{ID_REGEX:/^[\_A-Za-z0-9]+$/,create:function(e){return new t(e)},noConflict:function(){return n.Hazmat=t.original,t},log:function(){console&&e.isFunction(console.log)&&console.log.apply(console,arguments)},fail:function(e,n){var r=e||"",i=n||{};throw t.log("Hazmat Failure::",r,i),new Error("Hazmat Failure "+r.toString())},warn:function(e,n){var r=e||"",i=n||{};t.log("Hazmat Warning::",r,i)},fixDomId:function(n){return e.isString(n)&&n.length>0?n.replace(/[^A-Za-z0-9\_]/g,""):null},isDomId:function(n){return e.isString(n)&&n.match(t.ID_REGEX)},__placeholder:!0}),e.extend(t.prototype,{_safeValue:function(n,t,r,i){var a=r;return e.isFunction(r)&&(r=e.once(function(){try{return a.apply(this,arguments)}catch(e){}})),i.checker(t)?t:i.evalFallback&&e.isFunction(r)&&i.checker(r(t))?(this.warn("Expected valid "+i.name+" for "+n+" but was able to sanitize it:",[t,r(t)]),r(t)):i.checker(a)?(this.warn("Expected valid "+i.name+" for "+n+" but was able to fallback to default value:",[t,a]),a):void this.fail("Expected valid "+i.name+" for "+n+" but received:",t)},safeString:function(n,t,r){return this._safeValue(n,t,r,{name:"String",checker:e.isString,evalFallback:!0})},safeStringOrNull:function(n,t,r){return null==t?t:this._safeValue(n,t,r,{name:"String",checker:e.isString,evalFallback:!0})},safeDomId:function(e,n,r){return this._safeValue(e,n,r,{name:"DOM ID",checker:t.isDomId,evalFallback:!0})},safeFunction:function(n,t,r){return this._safeValue(n,t,r,{name:"Function",checker:e.isFunction,evalFallback:!1})},safeFunctionOrNull:function(n,t,r){return null==t?t:this._safeValue(n,t,r,{name:"Function",checker:e.isFunction,evalFallback:!1})},safeObject:function(n,t,r){return this._safeValue(n,t,r,{name:"Object",checker:e.isObject,evalFallback:!1})},safeObjectOrNull:function(n,t,r){return null==t?t:this._safeValue(n,t,r,{name:"Object",checker:e.isObject,evalFallback:!1})},safeArray:function(n,t,r){return this._safeValue(n,t,r,{name:"Array",checker:e.isArray,evalFallback:!1})},safeArrayOfElements:function(n,t,r,i){var a=this._safeValue(n,t,i,{name:"Array",checker:e.isArray,evalFallback:!1});return e.map(a,r)},__placeholder:!0}),t};if("undefined"!=typeof window&&"undefined"!=typeof window._){var i=r(window._,window);i.original=window.Hazmat,window.Hazmat=i}else{var a=e("underscore"),i=r(a);a.extend(t,i)}},{underscore:6}],6:[function(e,n,t){(function(){function e(n,t,r){if(n===t)return 0!==n||1/n==1/t;if(null==n||null==t)return n===t;if(n._chain&&(n=n._wrapped),t._chain&&(t=t._wrapped),n.isEqual&&g.isFunction(n.isEqual))return n.isEqual(t);if(t.isEqual&&g.isFunction(t.isEqual))return t.isEqual(n);var i=E.call(n);if(i!=E.call(t))return!1;switch(i){case"[object String]":return n==String(t);case"[object Number]":return n!=+n?t!=+t:0==n?1/n==1/t:n==+t;case"[object Date]":case"[object Boolean]":return+n==+t;case"[object RegExp]":return n.source==t.source&&n.global==t.global&&n.multiline==t.multiline&&n.ignoreCase==t.ignoreCase}if("object"!=typeof n||"object"!=typeof t)return!1;for(var a=r.length;a--;)if(r[a]==n)return!0;r.push(n);var o=0,l=!0;if("[object Array]"==i){if(o=n.length,l=o==t.length)for(;o--&&(l=o in n==o in t&&e(n[o],t[o],r)););}else{if("constructor"in n!="constructor"in t||n.constructor!=t.constructor)return!1;for(var u in n)if(g.has(n,u)&&(o++,!(l=g.has(t,u)&&e(n[u],t[u],r))))break;if(l){for(u in t)if(g.has(t,u)&&!o--)break;l=!o}}return r.pop(),l}var r=this,i=r._,a={},o=Array.prototype,l=Object.prototype,u=Function.prototype,c=o.slice,s=o.unshift,E=l.toString,d=l.hasOwnProperty,_=o.forEach,f=o.map,A=o.reduce,h=o.reduceRight,O=o.filter,p=o.every,I=o.some,m=o.indexOf,T=o.lastIndexOf,v=Array.isArray,S=Object.keys,D=u.bind,g=function(e){return new H(e)};"undefined"!=typeof t?("undefined"!=typeof n&&n.exports&&(t=n.exports=g),t._=g):r._=g,g.VERSION="1.3.3";var N=g.each=g.forEach=function(e,n,t){if(null!=e)if(_&&e.forEach===_)e.forEach(n,t);else if(e.length===+e.length){for(var r=0,i=e.length;i>r;r++)if(r in e&&n.call(t,e[r],r,e)===a)return}else for(var o in e)if(g.has(e,o)&&n.call(t,e[o],o,e)===a)return};g.map=g.collect=function(e,n,t){var r=[];return null==e?r:f&&e.map===f?e.map(n,t):(N(e,function(e,i,a){r[r.length]=n.call(t,e,i,a)}),e.length===+e.length&&(r.length=e.length),r)},g.reduce=g.foldl=g.inject=function(e,n,t,r){var i=arguments.length>2;if(null==e&&(e=[]),A&&e.reduce===A)return r&&(n=g.bind(n,r)),i?e.reduce(n,t):e.reduce(n);if(N(e,function(e,a,o){i?t=n.call(r,t,e,a,o):(t=e,i=!0)}),!i)throw new TypeError("Reduce of empty array with no initial value");return t},g.reduceRight=g.foldr=function(e,n,t,r){var i=arguments.length>2;if(null==e&&(e=[]),h&&e.reduceRight===h)return r&&(n=g.bind(n,r)),i?e.reduceRight(n,t):e.reduceRight(n);var a=g.toArray(e).reverse();return r&&!i&&(n=g.bind(n,r)),i?g.reduce(a,n,t,r):g.reduce(a,n)},g.find=g.detect=function(e,n,t){var r;return y(e,function(e,i,a){return n.call(t,e,i,a)?(r=e,!0):void 0}),r},g.filter=g.select=function(e,n,t){var r=[];return null==e?r:O&&e.filter===O?e.filter(n,t):(N(e,function(e,i,a){n.call(t,e,i,a)&&(r[r.length]=e)}),r)},g.reject=function(e,n,t){var r=[];return null==e?r:(N(e,function(e,i,a){n.call(t,e,i,a)||(r[r.length]=e)}),r)},g.every=g.all=function(e,n,t){var r=!0;return null==e?r:p&&e.every===p?e.every(n,t):(N(e,function(e,i,o){return(r=r&&n.call(t,e,i,o))?void 0:a}),!!r)};var y=g.some=g.any=function(e,n,t){n||(n=g.identity);var r=!1;return null==e?r:I&&e.some===I?e.some(n,t):(N(e,function(e,i,o){return r||(r=n.call(t,e,i,o))?a:void 0}),!!r)};g.include=g.contains=function(e,n){var t=!1;return null==e?t:m&&e.indexOf===m?-1!=e.indexOf(n):t=y(e,function(e){return e===n})},g.invoke=function(e,n){var t=c.call(arguments,2);return g.map(e,function(e){return(g.isFunction(n)?n||e:e[n]).apply(e,t)})},g.pluck=function(e,n){return g.map(e,function(e){return e[n]})},g.max=function(e,n,t){if(!n&&g.isArray(e)&&e[0]===+e[0])return Math.max.apply(Math,e);if(!n&&g.isEmpty(e))return-1/0;var r={computed:-1/0};return N(e,function(e,i,a){var o=n?n.call(t,e,i,a):e;o>=r.computed&&(r={value:e,computed:o})}),r.value},g.min=function(e,n,t){if(!n&&g.isArray(e)&&e[0]===+e[0])return Math.min.apply(Math,e);if(!n&&g.isEmpty(e))return 1/0;var r={computed:1/0};return N(e,function(e,i,a){var o=n?n.call(t,e,i,a):e;o<r.computed&&(r={value:e,computed:o})}),r.value},g.shuffle=function(e){var n,t=[];return N(e,function(e,r){n=Math.floor(Math.random()*(r+1)),t[r]=t[n],t[n]=e}),t},g.sortBy=function(e,n,t){var r=g.isFunction(n)?n:function(e){return e[n]};return g.pluck(g.map(e,function(e,n,i){return{value:e,criteria:r.call(t,e,n,i)}}).sort(function(e,n){var t=e.criteria,r=n.criteria;return void 0===t?1:void 0===r?-1:r>t?-1:t>r?1:0}),"value")},g.groupBy=function(e,n){var t={},r=g.isFunction(n)?n:function(e){return e[n]};return N(e,function(e,n){var i=r(e,n);(t[i]||(t[i]=[])).push(e)}),t},g.sortedIndex=function(e,n,t){t||(t=g.identity);for(var r=0,i=e.length;i>r;){var a=r+i>>1;t(e[a])<t(n)?r=a+1:i=a}return r},g.toArray=function(e){return e?g.isArray(e)?c.call(e):g.isArguments(e)?c.call(e):e.toArray&&g.isFunction(e.toArray)?e.toArray():g.values(e):[]},g.size=function(e){return g.isArray(e)?e.length:g.keys(e).length},g.first=g.head=g.take=function(e,n,t){return null==n||t?e[0]:c.call(e,0,n)},g.initial=function(e,n,t){return c.call(e,0,e.length-(null==n||t?1:n))},g.last=function(e,n,t){return null==n||t?e[e.length-1]:c.call(e,Math.max(e.length-n,0))},g.rest=g.tail=function(e,n,t){return c.call(e,null==n||t?1:n)},g.compact=function(e){return g.filter(e,function(e){return!!e})},g.flatten=function(e,n){return g.reduce(e,function(e,t){return g.isArray(t)?e.concat(n?t:g.flatten(t)):(e[e.length]=t,e)},[])},g.without=function(e){return g.difference(e,c.call(arguments,1))},g.uniq=g.unique=function(e,n,t){var r=t?g.map(e,t):e,i=[];return e.length<3&&(n=!0),g.reduce(r,function(t,r,a){return(n?g.last(t)===r&&t.length:g.include(t,r))||(t.push(r),i.push(e[a])),t},[]),i},g.union=function(){return g.uniq(g.flatten(arguments,!0))},g.intersection=g.intersect=function(e){var n=c.call(arguments,1);return g.filter(g.uniq(e),function(e){return g.every(n,function(n){return g.indexOf(n,e)>=0})})},g.difference=function(e){var n=g.flatten(c.call(arguments,1),!0);return g.filter(e,function(e){return!g.include(n,e)})},g.zip=function(){for(var e=c.call(arguments),n=g.max(g.pluck(e,"length")),t=new Array(n),r=0;n>r;r++)t[r]=g.pluck(e,""+r);return t},g.indexOf=function(e,n,t){if(null==e)return-1;var r,i;if(t)return r=g.sortedIndex(e,n),e[r]===n?r:-1;if(m&&e.indexOf===m)return e.indexOf(n);for(r=0,i=e.length;i>r;r++)if(r in e&&e[r]===n)return r;return-1},g.lastIndexOf=function(e,n){if(null==e)return-1;if(T&&e.lastIndexOf===T)return e.lastIndexOf(n);for(var t=e.length;t--;)if(t in e&&e[t]===n)return t;return-1},g.range=function(e,n,t){arguments.length<=1&&(n=e||0,e=0),t=arguments[2]||1;for(var r=Math.max(Math.ceil((n-e)/t),0),i=0,a=new Array(r);r>i;)a[i++]=e,e+=t;return a};var R=function(){};g.bind=function(e,n){var t,r;if(e.bind===D&&D)return D.apply(e,c.call(arguments,1));if(!g.isFunction(e))throw new TypeError;return r=c.call(arguments,2),t=function(){if(!(this instanceof t))return e.apply(n,r.concat(c.call(arguments)));R.prototype=e.prototype;var i=new R,a=e.apply(i,r.concat(c.call(arguments)));return Object(a)===a?a:i}},g.bindAll=function(e){var n=c.call(arguments,1);return 0==n.length&&(n=g.functions(e)),N(n,function(n){e[n]=g.bind(e[n],e)}),e},g.memoize=function(e,n){var t={};return n||(n=g.identity),function(){var r=n.apply(this,arguments);return g.has(t,r)?t[r]:t[r]=e.apply(this,arguments)}},g.delay=function(e,n){var t=c.call(arguments,2);return setTimeout(function(){return e.apply(null,t)},n)},g.defer=function(e){return g.delay.apply(g,[e,1].concat(c.call(arguments,1)))},g.throttle=function(e,n){var t,r,i,a,o,l,u=g.debounce(function(){o=a=!1},n);return function(){t=this,r=arguments;var c=function(){i=null,o&&e.apply(t,r),u()};return i||(i=setTimeout(c,n)),a?o=!0:l=e.apply(t,r),u(),a=!0,l}},g.debounce=function(e,n,t){var r;return function(){var i=this,a=arguments,o=function(){r=null,t||e.apply(i,a)};t&&!r&&e.apply(i,a),clearTimeout(r),r=setTimeout(o,n)}},g.once=function(e){var n,t=!1;return function(){return t?n:(t=!0,n=e.apply(this,arguments))}},g.wrap=function(e,n){return function(){var t=[e].concat(c.call(arguments,0));return n.apply(this,t)}},g.compose=function(){var e=arguments;return function(){for(var n=arguments,t=e.length-1;t>=0;t--)n=[e[t].apply(this,n)];return n[0]}},g.after=function(e,n){return 0>=e?n():function(){return--e<1?n.apply(this,arguments):void 0}},g.keys=S||function(e){if(e!==Object(e))throw new TypeError("Invalid object");var n=[];for(var t in e)g.has(e,t)&&(n[n.length]=t);return n},g.values=function(e){return g.map(e,g.identity)},g.functions=g.methods=function(e){var n=[];for(var t in e)g.isFunction(e[t])&&n.push(t);return n.sort()},g.extend=function(e){return N(c.call(arguments,1),function(n){for(var t in n)e[t]=n[t]}),e},g.pick=function(e){var n={};return N(g.flatten(c.call(arguments,1)),function(t){t in e&&(n[t]=e[t])}),n},g.defaults=function(e){return N(c.call(arguments,1),function(n){for(var t in n)null==e[t]&&(e[t]=n[t])}),e},g.clone=function(e){return g.isObject(e)?g.isArray(e)?e.slice():g.extend({},e):e},g.tap=function(e,n){return n(e),e},g.isEqual=function(n,t){return e(n,t,[])},g.isEmpty=function(e){if(null==e)return!0;if(g.isArray(e)||g.isString(e))return 0===e.length;for(var n in e)if(g.has(e,n))return!1;return!0},g.isElement=function(e){return!(!e||1!=e.nodeType)},g.isArray=v||function(e){return"[object Array]"==E.call(e)},g.isObject=function(e){return e===Object(e)},g.isArguments=function(e){return"[object Arguments]"==E.call(e)},g.isArguments(arguments)||(g.isArguments=function(e){return!(!e||!g.has(e,"callee"))}),g.isFunction=function(e){return"[object Function]"==E.call(e)},g.isString=function(e){return"[object String]"==E.call(e)},g.isNumber=function(e){return"[object Number]"==E.call(e)},g.isFinite=function(e){return g.isNumber(e)&&isFinite(e)},g.isNaN=function(e){return e!==e},g.isBoolean=function(e){return e===!0||e===!1||"[object Boolean]"==E.call(e)},g.isDate=function(e){return"[object Date]"==E.call(e)},g.isRegExp=function(e){return"[object RegExp]"==E.call(e)},g.isNull=function(e){return null===e},g.isUndefined=function(e){return void 0===e},g.has=function(e,n){return d.call(e,n)},g.noConflict=function(){return r._=i,this},g.identity=function(e){return e},g.times=function(e,n,t){for(var r=0;e>r;r++)n.call(t,r)},g.escape=function(e){return(""+e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/\//g,"&#x2F;")},g.result=function(e,n){if(null==e)return null;var t=e[n];return g.isFunction(t)?t.call(e):t},g.mixin=function(e){N(g.functions(e),function(n){k(n,g[n]=e[n])})};var L=0;g.uniqueId=function(e){var n=L++;return e?e+n:n},g.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var C=/.^/,b={"\\":"\\","'":"'",r:"\r",n:"\n",t:"	",u2028:"\u2028",u2029:"\u2029"};for(var V in b)b[b[V]]=V;var P=/\\|'|\r|\n|\t|\u2028|\u2029/g,w=/\\(\\|'|r|n|t|u2028|u2029)/g,F=function(e){return e.replace(w,function(e,n){return b[n]})};g.template=function(e,n,t){t=g.defaults(t||{},g.templateSettings);var r="__p+='"+e.replace(P,function(e){return"\\"+b[e]}).replace(t.escape||C,function(e,n){return"'+\n_.escape("+F(n)+")+\n'"}).replace(t.interpolate||C,function(e,n){return"'+\n("+F(n)+")+\n'"}).replace(t.evaluate||C,function(e,n){return"';\n"+F(n)+"\n;__p+='"})+"';\n";t.variable||(r="with(obj||{}){\n"+r+"}\n"),r="var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};\n"+r+"return __p;\n";var i=new Function(t.variable||"obj","_",r);if(n)return i(n,g);var a=function(e){return i.call(this,e,g)};return a.source="function("+(t.variable||"obj")+"){\n"+r+"}",a},g.chain=function(e){return g(e).chain()};var H=function(e){this._wrapped=e};g.prototype=H.prototype;var M=function(e,n){return n?g(e).chain():e},k=function(e,n){H.prototype[e]=function(){var e=c.call(arguments);return s.call(e,this._wrapped),M(n.apply(g,e),this._chain)}};g.mixin(g),N(["pop","push","reverse","shift","sort","splice","unshift"],function(e){var n=o[e];H.prototype[e]=function(){var t=this._wrapped;n.apply(t,arguments);var r=t.length;return"shift"!=e&&"splice"!=e||0!==r||delete t[0],M(t,this._chain)}}),N(["concat","join","slice"],function(e){var n=o[e];H.prototype[e]=function(){return M(n.apply(this._wrapped,arguments),this._chain)}}),H.prototype.chain=function(){return this._chain=!0,this},H.prototype.value=function(){return this._wrapped}}).call(this)},{}],7:[function(e){e("../../../html5-common/js/utils/InitModules/InitOO.js"),e("../../../html5-common/js/utils/InitModules/InitOOUnderscore.js"),e("../../../html5-common/js/utils/InitModules/InitOOHazmat.js"),e("../../../html5-common/js/utils/constants.js"),function(e,n){function t(){return""===d||u?void OO.log("Youtube: youtubeID "+d+" not defined / youtubePlayer already exists"):(u=new YT.Player("player",{videoId:d,height:"100%",width:"100%",playerVars:{autoplay:0,controls:0,rel:0,showinfo:0,modestbranding:1},events:{onReady:r,onPlaybackQualityChange:i,onStateChange:a,onError:o}}),void(u||s.controller.notify(s.controller.EVENTS.ERROR,{errorcode:-1})))}function r(){if(_=!0,!(A.length<1))for(var e=0;e<A.length;e++)switch(A[e][0]){case OO.EVENTS.PLAY:s.play(),hasPlayed=!0;break;case OO.EVENTS.SEEK:A[e].length>1&&s.seek(A[e][1]);break;case OO.EVENTS.VOLUME_CHANGE:A[e].length>1&&s.setVolume(A[e][1])}}function i(e){var n={id:e.data,width:0,height:0,bitrate:e.data};s.controller.notify(s.controller.EVENTS.BITRATE_CHANGED,n)}function a(e){if(null!=e.data)switch(e.data){case-1:OO.log("Youtube: Unstarted event received");break;case 0:OO.log("Youtube: Ended event received"),s.controller.notify(s.controller.EVENTS.ENDED);break;case 1:if(OO.log("Youtube: Playing event received"),f){if(!u)return;h=u.getAvailableQualityLevels(),s.raiseBitratesAvailable(),f=!1}break;case 2:OO.log("Youtube: Pause event received"),s.controller.notify(s.controller.EVENTS.PAUSED);break;case 3:OO.log("Youtube: Buffering event received");break;case 5:OO.log("Youtube: Cued event received")}}function o(e){if(null!=e.data){var n=-1;switch(e.data){case 2:OO.log("Youtube: invalid video id"),s.controller.notify(s.controller.EVENTS.ERROR,{errorcode:n});break;case 5:OO.log("Youtube: The requested content cannot be played in an HTML5 player "),s.controller.notify(s.controller.EVENTS.ERROR,{errorcode:n});break;case 100:OO.log("Youtube: The video requested was not found."),s.controller.notify(s.controller.EVENTS.ERROR,{errorcode:n});break;case 101:OO.log("Youtube: The owner of the requested video does not allow it to be played in embedded players."),s.controller.notify(s.controller.EVENTS.ERROR,{errorcode:n});break;case 150:OO.log("Youtube: invalid video id"),s.controller.notify(s.controller.EVENTS.ERROR,{errorcode:n})}}}var l,u,c,s,E="ooyalaYoutubeVideoTech",d="",_=!1,f=!0,A=[],h=[],O=function(){this.name=E,this.features=[OO.VIDEO.FEATURE.VIDEO_OBJECT_SHARING_GIVE,OO.VIDEO.FEATURE.BITRATE_CONTROL],this.technology=OO.VIDEO.TECHNOLOGY.HTML5,this.encodings=[OO.VIDEO.ENCODING.YOUTUBE],this.create=function(e,r,i){return l='<div id="player"  style="position:absolute;top:0px;left:0px;"></div>',null==l||null==e||null==i?void console.warn("Youtube: Failed to create the player"):(c=e,n("head").append("<script type = 'text/javascript' src = '//www.youtube.com/iframe_api'></script>"),window.onYouTubePlayerAPIReady=function(){t()},s=new p,null!=s?(s.controller=i,i.notify(i.EVENTS.CAN_PLAY),c.append(l),s):void 0)},this.destroy=function(){this.encodings=[],this.create=function(){}},this.maxSupportedElements=-1},p=function(){this.controller={},this.disableNativeSeek=!1;var n=null,r=!1;this.play=function(){return u?void(_?(u.playVideo(),this.controller.notify(this.controller.EVENTS.PLAY,{url:d}),this.controller.notify(s.controller.EVENTS.PLAYING),i(),r=!0):A.push(["play",null])):(A.push(["play",null]),void t())},this.pause=function(){u&&(u.pauseVideo(),n&&(clearInterval(n),n=null))},this.seek=function(e){u&&(_?(u.seekTo(e,!0),this.controller.notify(this.controller.EVENTS.SEEKED)):(OO.log("Youtube: Adding setInitialTime to queue has the youtube player is not yet ready"),A.push(["seek",e])))},this.setVolume=function(e){return u?(u.setVolume(100*e),void this.controller.notify(this.controller.EVENTS.VOLUME_CHANGE,{volume:e})):void A.push([OO.EVENTS.VOLUME_CHANGE,e])},this.setInitialTime=function(e){r||this.seek(e)},this.setVideoUrl=function(e){return e?(d=e,!0):!1},this.setBitrate=function(e){u&&u.setPlaybackQuality(e)},this.destroy=function(){OO.isEdge?d="":this.setVideoUrl(""),l=null,u&&(u.destroy(),u=null),_=!1,n&&(clearInterval(n),n=null)};var i=function(){u&&_&&(n&&clearInterval(n),n=setInterval(function(){i()},255),a())},a=e.bind(function(){if(u){var e={currentTime:u.getCurrentTime(),duration:u.getDuration(),seekRange:{begin:0,end:u.getDuration()}};this.controller.notify(this.controller.EVENTS.TIME_UPDATE,e)}},this);this.raiseBitratesAvailable=function(){if(h){for(var e=[{id:"auto",width:0,height:0,bitrate:"auto"}],n=0;n<h.length;n++)if("auto"!=h[n]){var t={id:h[n],width:0,height:0,bitrate:h[n]};e.push(t)}this.controller.notify(this.controller.EVENTS.BITRATES_AVAILABLE,e)}}};OO.Video.plugin(new O)}(OO._,OO.$)},{"../../../html5-common/js/utils/InitModules/InitOO.js":1,"../../../html5-common/js/utils/InitModules/InitOOHazmat.js":2,"../../../html5-common/js/utils/InitModules/InitOOUnderscore.js":3,"../../../html5-common/js/utils/constants.js":4}]},{},[7]);
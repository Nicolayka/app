<?php

class WidgetTagRenderer extends WidgetFramework {

	private $count = 1;
	private $markers = array();

	protected static $instanceTagRenderer = false;

	public static function getInstance() {
		if( !(self::$instanceTagRenderer instanceof WidgetTagRenderer) ) {
	        self::$instanceTagRenderer = new WidgetTagRenderer();
        }
        return self::$instanceTagRenderer;
	}

	public function renderTag( $input, $args, Parser $parser ) {
		wfProfileIn(__METHOD__);

		// there must be something between tags
		if ( empty($input) ) {
			wfProfileOut(__METHOD__);
			return '';
		}

		// we support only quartz & monaco skin in this feature
		if (!Wikia::isOasis()) {
			wfProfileOut(__METHOD__);
			return '';
		}

		$widgetType = 'Widget' . Sanitizer::escapeId($input, 0);

		// try to load widget
		if ( $this->load($widgetType) == false ) {
			wfProfileOut(__METHOD__);
			return '';
		}

		// seek for style attribute (RT #19092)
		if (isset($args['style'])) {
			$style = ' style="' . htmlspecialchars($args['style']) . '"';
			unset($args['style']);
		}
		else {
			$style = '';
		}

		// create array for getParams method of widget framework
		$id = 'widget_' . $this->count++;

		$widget = array(
			'type'  => $widgetType,
			'id'    => $id,
			'param' => $args,
			'widgetTag' => true
		);

		// configure widget
		$widgetParams = $this->getParams($widget);

		// set additional params
		$widgetParams['skinname'] = $this->skinname;

		// inform widget he's rendered by WidgetTag
		$widgetParams['_widgetTag'] = true;

		// try to display it using widget function
		$output = $widgetType($id, $widgetParams);

		// Add any required javascript for the widget
		#$output .= $this->getJavascript($widget); // we don't need <widget> to be interactive

		// wrap widget content
		$output = $this->wrap($widget, $output);

		// wrap widget HTML
		$output = "<div class=\"widgetTag reset\"{$style}>{$output}</div>";

		// use markers to avoid RT #20855 when widget' HTML is multiline
		$marker = $parser->uniqPrefix() . "-WIDGET-{$this->count}-\x7f";
		$this->markers[$marker] = $output;

		wfProfileOut(__METHOD__);
		return $marker;
	}

	function replaceMarkers($text) {
		return strtr($text, $this->markers);
	}
}

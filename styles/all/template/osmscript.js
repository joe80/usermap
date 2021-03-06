var usermap = {};
var click, map, layer_markers;

(function($) {

var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
var toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection

usermap.drawmap = function(lon, lat, zoom, controls) {
	var cntrposition = new OpenLayers.LonLat(lon, lat).transform( fromProjection, toProjection);

	if(controls === true) {
		map = new OpenLayers.Map('map', {
			controls: [
				new OpenLayers.Control.Navigation(),
				new OpenLayers.Control.PanZoomBar()],
			numZoomLevels: 18,
			maxResolution: 156543,
			units: 'meters'
		});
	} else {
		map = new OpenLayers.Map('map', {
			numZoomLevels: 18,
			maxResolution: 156543,
			units: 'meters'
		});
	}
	map.events.register("moveend", map, function(e) {
		usermap.reload();
	});

	var layer_mapnik = new OpenLayers.Layer.OSM.Mapnik("Mapnik");
	layer_markers = new OpenLayers.Layer.Markers("Address", { projection: new OpenLayers.Projection("EPSG:4326"), visibility: true});
	map.addLayers([layer_mapnik, layer_markers]);

	usermap.jumpTo(lon, lat, zoom);
};

// A control class for capturing click events...
OpenLayers.Control.Click = OpenLayers.Class(OpenLayers.Control, {
	defaultHandlerOptions: {
		'single': true,
		'double': false,
		'pixelTolerance': 0,
		'stopSingle': false,
		'stopDouble': false
	},
	handleRightClicks:true,
	initialize: function(options) {
		this.handlerOptions = OpenLayers.Util.extend(
			{}, this.defaultHandlerOptions
		);
		OpenLayers.Control.prototype.initialize.apply(
			this, arguments
		);
		this.handler = new OpenLayers.Handler.Click(
			this, this.eventMethods, this.handlerOptions
		);
	},
	CLASS_NAME: "OpenLayers.Control.Click"
});


// Add an instance of the Click control that listens to various click events:
click = new OpenLayers.Control.Click({eventMethods:{
	'rightclick': function(e) {
		var lonlat = map.getLonLatFromPixel(e.xy);
		pos= new OpenLayers.LonLat(lonlat.lon,lonlat.lat).transform(toProjection,fromProjection);
		usermap.display_menu(e, pos.lon,pos. lat);
	},
	'click': function(e) {
		usermap.hide_menu(true);
	}
}});



// Get control of the right-click event:
document.getElementById('map').oncontextmenu = function(e){
	e = e?e:window.event;
	if (e.preventDefault) e.preventDefault(); // For non-IE browsers.
	   else return false; // For IE browsers.
};

phpbb.addAjaxCallback('usermap.set_position', function(response) {
	usermap.reload();
});

usermap.reload = function() {
	var tlLonLat = map.getLonLatFromPixel(new OpenLayers.Pixel(1,1));
	var pos0= new OpenLayers.LonLat(tlLonLat.lon,tlLonLat.lat).transform(toProjection,fromProjection);

	var mapsize = map.getSize();
	var brLonLat = map.getLonLatFromPixel(new OpenLayers.Pixel(mapsize.w - 1, mapsize.h - 1));
	var pos1= new OpenLayers.LonLat(brLonLat.lon,brLonLat.lat).transform(toProjection,fromProjection);
	reload_marker(pos0.lon, pos0.lat, pos1.lon, pos1.lat);
};

usermap.display_menu=function(e, lon, lat) {
	usermap.hide_menu(true);
	$('#map_menu').css({'top':e.pageY,'left':e.pageX,'display':'block'});
	$('#map_menu').find('a').each(function() {
		var href = $(this).attr('href');
		$(this).attr('href', href.replace('LONLAT', 'lon='+lon+'&lat='+lat));
	});
};

usermap.hide_menu=function(full) {
	$('#map_menu').css('display','none');
	if(full) {
		$('#map_menu').find('a').each(function() {
			var href = $(this).attr('href');
			$(this).attr('href', href.replace(/&?lon=(.*)&lat=(.*)/gi, 'LONLAT'));
		});
	}
};

usermap.jumpTo=function(lon, lat, zoom) {
	var x = usermap.Lon2Merc(lon);
	var y = usermap.Lat2Merc(lat);
	map.setCenter(new OpenLayers.LonLat(x, y), zoom);
	return false;
};

usermap.Lon2Merc=function(lon) {
	return 20037508.34 * lon / 180;
};

usermap.Lat2Merc=function(lat) {
	var PI = 3.14159265358979323846;
	lat = Math.log(Math.tan( (90 + lat) * PI / 360)) / (PI / 180);
	return 20037508.34 * lat / 180;
};

usermap.generateMarker=function(image){
	var size = new OpenLayers.Size(26,26);
	var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
	var i = new OpenLayers.Icon(image, size, offset);
	return i;
};

usermap.addMarker=function(layer, lon, lat, popupContentHTML, marker) {
	var ll = new OpenLayers.LonLat(usermap.Lon2Merc(lon), usermap.Lat2Merc(lat));
	var feature = new OpenLayers.Feature(layer, ll);
	feature.closeBox = true;
	feature.popupClass = OpenLayers.Class(OpenLayers.Popup.FramedCloud, {minSize: new OpenLayers.Size(100, 10) } );
	feature.data.popupContentHTML = popupContentHTML;
	feature.data.overflow = "hidden";

	var marker = new OpenLayers.Marker(ll, marker);
	marker.feature = feature;
	var markerClick = function(evt) {
		if (this.popup == null) {
			this.popup = this.createPopup(this.closeBox);
			map.addPopup(this.popup);
			this.popup.show();
		} else {
			this.popup.toggle();
		}
		OpenLayers.Event.stop(evt);
	};
	marker.events.register("mousedown", feature, markerClick);
	marker.events.register("touchstart", feature, markerClick);
	layer.addMarker(marker);
};
})(jQuery);
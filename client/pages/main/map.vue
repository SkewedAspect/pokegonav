<template>
    <div id="map"></div>
</template>

<style rel="stylesheet/scss" lang="sass">
	#map {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
</style>

<script type="text/babel">
    import _ from 'lodash';
    import $http from 'axios';
	import ol from 'openlayers';
	import { toastService as toastSvc } from 'vueboot';

	// Layers
	import CaptureLayer from '../../layers/capture';
	import PortalLayer from '../../layers/portal';

	// Services
	import mapSvc from '../../services/map';
    import stateSvc from '../../services/state';
	import geoSvc from '../../services/geolocation';
	import urlSvc from '../../services/url';


    export default {
        data: function()
        {
            return {
                state: stateSvc.state,
				map: undefined,
            };
        },
		ready()
		{
			mapSvc.setTarget('map');

			setTimeout(() =>
			{
				if(urlSvc.queryParams.filter)
				{
					// TODO: Once we support multiple filters, remove the `[0]`!
					this.state.filter = urlSvc.queryParams.filter[0];
					CaptureLayer.redraw();
				} // end if

				if(urlSvc.queryParams.layers)
				{
					this.state.layers.captured = _.includes(urlSvc.queryParams.layers, 'capture');
					this.state.layers.gyms = _.includes(urlSvc.queryParams.layers, 'gyms');
					this.state.layers.stops = _.includes(urlSvc.queryParams.layers, 'stops');

					CaptureLayer.setVisible(this.state.layers.captured);
					PortalLayer.setGymsVisible(this.state.layers.gyms);
					PortalLayer.setStopsVisible(this.state.layers.stops);
				} // end if

				if(urlSvc.queryParams.location)
				{
					mapSvc.map.getView().setCenter(ol.proj.fromLonLat(urlSvc.queryParams.location));
					mapSvc.map.getView().setZoom(urlSvc.queryParams.zoom);
				}
				else
				{
					geoSvc.updateLocation();
					geoSvc.zoomToLocation();
				} // end if
			}, 2000);
		}
    }
</script>

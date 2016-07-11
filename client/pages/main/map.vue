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
	import { toastService as toastSvc } from 'vueboot';

	// Services
	import mapSvc from '../../services/map';
    import stateSvc from '../../services/state';
	import geoSvc from '../../services/geolocation';

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
				geoSvc.updateLocation();
                geoSvc.zoomToLocation();
			}, 2000);
		}
    }
</script>

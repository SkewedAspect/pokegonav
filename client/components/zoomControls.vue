<template>
	<div id="zoom-btns" class="btn-toolbar-vertical">
		<div class="btn-group-vertical">
			<button type="button" class="btn btn-secondary" title="Zoom In" @click="zoomIn()">
				<i class="fa fa-plus"></i>
			</button>
			<button type="button" class="btn btn-secondary" title="Zoom Out" @click="zoomOut()">
				<i class="fa fa-minus"></i>
			</button>
		</div>
		<div class="btn-group-vertical">
			<button type="button" class="btn"  :class="{ 'btn-primary': watchPos, 'btn-secondary': !watchPos }" title="Follow location" @click="toggleWatchPos()">
				<i class="fa fa-crosshairs"></i>
			</button>
		</div>
	</div>
</template>

<style rel="stylesheet/scss" lang="sass">
	#zoom-btns {
		position: absolute;
		top: 10px;
		left: 10px;
		opacity: 0.85;
		z-index: 9001;

		&:hover {
			opacity: 1.0;
		}
	}
</style>

<script type="text/babel">
	import mapSvc from '../services/map';
	import geoSvc from '../services/geolocation';

    export default {
		data()
		{
			return {
				watchPos: false
			}
		},
		methods: {
			zoomIn()
			{
				var view = mapSvc.map.getView();
				var zoom = view.getZoom();
				view.setZoom(zoom++);
			},
			zoomOut()
			{
				var view = mapSvc.map.getView();
				var zoom = view.getZoom();
				view.setZoom(zoom--);
			},
			toggleWatchPos()
			{
				this.watchPos = !this.watchPos;

				if(this.watchPos)
				{
					mapSvc.disablePan();
					geoSvc.updateLocation()
						.then(() =>
						{
							geoSvc.zoomToLocation();
							geoSvc.autoUpdateView = true;
						});
				}
				else
				{
					mapSvc.enablePan();
					geoSvc.autoUpdateView = false;
				} // end if
			}
		}
    }
</script>

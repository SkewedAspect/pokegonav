<template>
	<div id="layer-controls">
		<div id="layer-list" class="collapse" aria-expanded="false">
			<div class="layer">
				<button class="btn btn-sm" :class="{ 'btn-primary': layers.gyms, 'btn-secondary': !layers.gyms }" type="button" @click="toggleVisible('gyms')">
					<i class="fa" :class="{ 'fa-eye': layers.gyms, 'fa-eye-slash': !layers.gyms }"></i>
				</button>
				Gyms
			</div>
			<div class="layer">
				<button class="btn btn-sm" :class="{ 'btn-primary': layers.stops, 'btn-secondary': !layers.stops }" type="button" @click="toggleVisible('stops')">
					<i class="fa" :class="{ 'fa-eye': layers.stops, 'fa-eye-slash': !layers.stops }"></i>
				</button>
				Pokestops
			</div>
			<div class="layer">
				<button class="btn btn-sm" :class="{ 'btn-primary': layers.captured, 'btn-secondary': !layers.captured }" type="button" @click="toggleVisible('captured')">
					<i class="fa" :class="{ 'fa-eye': layers.captured, 'fa-eye-slash': !layers.captured }"></i>
				</button>
				Captured Pokemon
			</div>
			<hr>
		</div>
        <div class="input-group">
            <span class="input-group-btn">
                <button class="btn btn-secondary" :class="{ 'active': showLayers }" type="button" title="Show Layer Options" @click="toggleLayers()">
					<i class="fa fa-bars"></i>
				</button>
            </span>
			<select class="form-control c-select" :disabled="!layers.captured" v-model="filter">
				<option value="">All Pokemon</option>
				<option :value="id" v-for="(id, name) in pokemon | orderBy 'id'">{{ getDisplayName(id) }}</option>
			</select>
        </div>
		<div class="text-right" style="margin-top: 3px;">
			<small><a :href="permalink">Permalink</a></small>
		</div>
	</div>
</template>

<style rel="stylesheet/scss" lang="sass">
	#layer-controls {
		position: absolute;
		top: 10px;
		right: 10px;
		width: calc(100% - 77px);
		max-width: 400px;
		z-index: 9001;

		padding: 8px;
		background-color: rgba(250, 250, 250, 0.9);
		border: 1px solid #ddd;
		border-radius: 4px;

		.layer {
			margin-bottom: 5px;
		}
	}
</style>

<script type="text/babel">
	import ol from 'openlayers';

	import stateSvc from '../services/state';
	import mapSvc from '../services/map';
	import pokeSvc from '../services/pokemon';
	import urlSvc from '../services/url';

	var CaptureLayer;
	var PortalLayer;

	export default {
        data: function()
        {
            return {
				filter: "",
				showLayers: false,
				state: stateSvc.state
			};
		},
		methods: {
			getDisplayName(id){ return pokeSvc.getDisplayName(id); },
			toggleVisible(layer)
			{
				this.layers[layer] = !this.layers[layer];

                PortalLayer.setGymsVisible(this.layers.gyms);
				PortalLayer.setStopsVisible(this.layers.stops);
				CaptureLayer.setVisible(this.layers.captured);
			},
			toggleLayers()
			{
				this.showLayers = !this.showLayers;
				if(this.showLayers)
				{
					$('#layer-list').collapse('show');
				}
				else
				{
					$('#layer-list').collapse('hide');
				} // end if
			}
		},
		computed: {
			pokemon(){ return this.state.pokemon; },
			layers(){ return this.state.layers; },
			filter: {
				get: function()
				{
					return this.state.filter;
				},
				set: function(val)
				{
					this.state.filter = val;
					CaptureLayer.redraw();
				}
			},
			center(){ return this.state.center; },
			zoom(){ return this.state.zoom; },
			permalink()
			{
				var layers = [];
                if(this.layers.captured)
                {
                    layers.push('capture');
                } // end if

                if(this.layers.gyms)
                {
                    layers.push('gyms');
                } // end if

                if(this.layers.stops)
                {
                    layers.push('stops');
                } // end if

				var queryString = urlSvc.buildQueryString({
					location: _.map(this.center, (coord) => coord.toFixed(5)),
					zoom: this.zoom,
					filter: this.state.filter,
					layers: layers
				});

				return `${ location.protocol }//${ location.host }?${ queryString }`;
			}
		},
		ready()
		{
			$('#layer-list').collapse({
				toggle: false
			});

			CaptureLayer = require('../layers/capture').default;
			PortalLayer = require('../layers/portal').default;
		}
    }
</script>

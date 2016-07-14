<template>
	<div id="layer-controls">
        <div class="input-group">
            <span class="input-group-btn">
                <button class="btn" :class="{ 'btn-primary': visible, 'btn-secondary': !visible }" type="button" @click="toggleVisible()">
					<i class="fa" :class="{ 'fa-eye': visible, 'fa-eye-slash': !visible }"></i>
				</button>
            </span>
			<select class="form-control c-select" :disabled="!visible" v-model="filter">
				<option value="">Show All</option>
				<option :value="name" v-for="(id, name) in pokemon | orderBy 'id'">{{ getDisplayName(id) }}</option>
			</select>
        </div>
	</div>
</template>

<style rel="stylesheet/scss" lang="sass">
	#layer-controls {
		position: absolute;
		top: 10px;
		right: 10px;
		margin-left: 67px;
		max-width: 400px;
		z-index: 9001;
	}
</style>

<script type="text/babel">
	import stateSvc from '../services/state';
	import pokeSvc from '../services/pokemon';

	var CaptureLayer;

	export default {
        data: function()
        {
            return {
				filter: "",
				visible: true,
				state: stateSvc.state,
			};
		},
		methods: {
			getDisplayName(id){ return pokeSvc.getDisplayName(id); },
			toggleVisible()
			{
				this.visible = !this.visible;
				CaptureLayer.setVisible(this.visible);
			} // end toggleVisible
		},
		computed: {
			pokemon(){ return this.state.pokemon; },
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
			}
		},
		ready()
		{
			CaptureLayer = require('../layers/capture').default;
		}
    }
</script>

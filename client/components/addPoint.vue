<template>
	<div id="add-btn">
		<button class="btn btn-info" @click="showModal()">
			<i class="fa fa-plus"></i>
			Capture Point
		</button>
		<modal v-ref:add-modal>
			<div class="modal-header" slot="header">
				<h4 class="modal-title">
					<i class="fa fa-plus"></i>
					Add Capture Location
				</h4>
			</div>
			<div class="modal-body" slot="body">
				<form>
					<div class="form-group row">
						<label for="pokemon" class="col-sm-3 form-control-label">Pokemon</label>
						<div class="col-sm-9">
							<select id="pokemon" class="form-control c-select" v-model="newPoint.pokemon">
								<option value="" selected>Select a Pokemon...</option>
								<option :value="name" v-for="(id, name) in pokemon | orderBy 'id'">{{ getDisplayName(id) }}</option>
							</select>
						</div>
					</div>
					<div class="form-group row">
						<label for="level" class="col-sm-3 form-control-label">Trainer Level</label>
						<div class="col-sm-9">
							<input type="number" class="form-control" id="level" placeholder="5" min="1" v-model="newPoint.level">
						</div>
					</div>
					<div class="form-group row">
						<label class="col-sm-3">Incense</label>
						<div class="col-sm-9">
							<label class="c-input c-checkbox">
								<input type="checkbox" v-model="newPoint.incense">
								<span class="c-indicator"></span>
								Pokemon was spawned by incense
							</label>
						</div>
					</div>
				</form>
			</div>
			<div class="modal-footer" slot="footer">
				<button type="button"
						class="btn btn-primary"
						@click="save()">
					<i class="fa fa-plus"></i>
					Add
				</button>
				<button type="button"
						class="btn btn-secondary"
						@click="cancel()">
					<i class="fa fa-times"></i>
					Cancel
				</button>
			</div>
        </modal>
	</div>
</template>

<style rel="stylesheet/scss" lang="sass">
	#add-btn {
		position: absolute;
		bottom: 10px;
		right: 10px;
		opacity: 0.85;
		z-index: 9001;

		&:hover {
			opacity: 1.0;
		}
	}
</style>

<script type="text/babel">
	import $http from 'axios';
	import ol from 'openlayers';
	import pokeSvc from '../services/pokemon';
	import { toastService as toastSvc, modal } from 'vueboot'

	// Services
	import geoSvc from '../services/geolocation';
	import stateSvc from '../services/state';

	// Layers
	import CaptureLayer from '../layers/capture';

    export default {
		components: {
			modal
		},
        data: function()
        {
            return {
				state: stateSvc.state,
				newPoint: {
					pokemon: "",
					point: [],
					incense: false,
					level: null
				},
				pokemon: pokeSvc.pokemon
			};
		},
		computed: {
			pokemon()
			{
				return this.state.pokemon;
			}
        },
		methods: {
			getDisplayName(id){ return pokeSvc.getDisplayName(id); },
			showModal(){ this.$refs.addModal.showModal(); },
			hideModal(){ this.$refs.addModal.hideModal(); },

			save()
			{
				this.hideModal();
				this.newPoint.point = ol.proj.toLonLat(geoSvc.currentPos.getGeometry().getCoordinates());

				$http.put('/capture', this.newPoint)
					.then((response) =>
					{
						CaptureLayer.addCapture(response.data);
					})
					.catch((error) =>
					{
						console.log('Failed to save point.', error);

						toastSvc.create({
							type: 'danger',
							dismissible: true,
							content: 'Unable to save point.',
							timeout: false
						});
					})
					.finally(() =>
					{
						this.clearForm()
					});

			},
			cancel()
			{
				this.clearForm();
				this.hideModal();
			},
			clearForm()
			{
				this.newPoint.pokemon = "";
                this.newPoint.point = [];
                this.newPoint.incense = false;
                this.newPoint.level = null;
			}
		}
    }
</script>

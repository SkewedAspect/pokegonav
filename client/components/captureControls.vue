<template>
	<div id="capture-controls">
		<h5 class="text-center">Capture Location</h5>
		<div class="buttons-row">
			<div class="col-xs-6">
                <button id="select-loc"  class="btn btn-primary-outline btn-block" :class="{ active: select }" @click="selectLocation()">
                    <i class="fa fa-plus"></i>
                    Select
                </button>
			</div>
			<div class="col-xs-6">
                <button class="btn btn-primary-outline btn-block" :disabled="captureDisabled" @click="currentLocation()">
                    <i class="fa fa-plus"></i>
                    Current
                </button>
			</div>
		</div>
		<modal v-ref:add-modal>
			<div class="modal-header" slot="header">
				<h4 class="modal-title">
					<i class="fa fa-plus"></i>
					Add Capture Point
				</h4>
			</div>
			<div class="modal-body" slot="body">
				<form>
					<div class="form-group row">
						<label for="pokemon" class="col-sm-3 form-control-label">Pokemon</label>
						<div class="col-sm-9">
							<select id="pokemon" class="form-control c-select" v-model="newPoint.pokemonID">
								<option value="" selected>Select a Pokemon...</option>
								<option :value="id" v-for="(id, name) in pokemon | orderBy 'id'">{{ getDisplayName(id) }}</option>
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
						<label class="col-sm-3">Incense/Lure</label>
						<div class="col-sm-9">
							<label class="c-input c-checkbox">
								<input type="checkbox" v-model="newPoint.incense">
								<span class="c-indicator"></span>
								Pokemon was spawned by an incense or lure
							</label>
						</div>
					</div>
				</form>
			</div>
			<div class="modal-footer" slot="footer">
				<button type="button"
						class="btn btn-primary"
						:disabled="isAddDisabled"
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
	#capture-controls {
		position: absolute;
		bottom: 10px;
		right: 10px;
		width: 400px;
		z-index: 9011;

		padding: 5px 8px;
		background-color: rgba(250, 250, 250, 0.9);
		border: 1px solid #ddd;
		border-radius: 4px;

		@media(max-width: 450px)
		{
			width: auto;
			left: 0;
			right: 0;
			bottom: 0;
			border-left: none;
			border-right: none;
			border-bottom: none;
			border-radius: 0;
		}

		.buttons-row {
			width: 100%;

			.col-xs-6 {
				padding: 0;

				&:first-child {
					padding-right: 5px;
				}

				&:last-child {
					padding-left: 5px;
				}
			}
		}

		.if-room {
			display: inline;

			@media(max-width: 320px)
			{
				display: none;
			}
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
				select: false,
				newPoint: {
					pokemonID: -1,
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
			},
			captureDisabled()
			{
				return !this.state.geoEnabled;
			},
			isAddDisabled()
			{
				var id = this.newPoint.pokemonID;
				return id == "" || parseInt(id) < 0;
			}
        },
		methods: {
			getDisplayName(id){ return pokeSvc.getDisplayName(id); },
			showModal(){ this.$refs.addModal.showModal(); },
			hideModal(){ this.$refs.addModal.hideModal(); },

			currentLocation()
			{
				CaptureLayer.disableDraw();

				// Do this the moment the button is tapped, not on save, in case the user moves.
				this.newPoint.point = ol.proj.toLonLat(geoSvc.currentPos.getGeometry().getCoordinates());
				this.showModal();
			},

			selectLocation()
			{
				this.select = !this.select;

				if(this.select)
				{
					CaptureLayer.enableDraw((coords) =>
					{
						this.newPoint.point = coords;
						this.showModal();
					});
				}
				else
				{
					$('#select-loc').blur();
					CaptureLayer.disableDraw();
				} // end if
			},

			save()
			{
				this.hideModal();

				// Convert to an integer
				this.newPoint.pokemonID = parseInt(this.newPoint.pokemonID);

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
				this.newPoint.pokemonID = -1;
                this.newPoint.point = [];
                this.newPoint.incense = false;
                this.newPoint.level = null;
			}
		}
    }
</script>

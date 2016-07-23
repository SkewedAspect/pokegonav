<template>
    <div id="links">
		<a href="#" class="btn btn-primary-outline btn-sm pull-left" @click="showModal()">
			<i class="fa fa-info-circle"></i>
			About
		</a>
		<a target="_blank" href="https://github.com/SkewedAspect/pokegonav/issues/new" class="btn btn-primary-outline btn-sm pull-right">
			<i class="fa fa-bug"></i>
			Report a bug
		</a>
		<modal v-ref:about-modal>
			<div class="modal-header" slot="header">
				<h4 class="modal-title">
					<i class="fa fa-info-circle"></i>
					About PokeGoNav
				</h4>
			</div>
			<div class="modal-body" slot="body">
				<div class="text-muted">
					<div class="col-xs-6">
                        <small>build v{{ package.version }} (<a target="_blank" href="https://github.com/SkewedAspect/pokegonav/releases/tag/v{{ package.version }}">Details</a>)</small>
					</div>
                    <div class="col-xs-6 text-right">
                        <a target="_blank" href="https://github.com/SkewedAspect/pokegonav" style="white-space: nowrap; margin-right: 10px;">
							<i class="fa fa-github"></i> GitHub Project
						</a>
                        <a target="_blank" href="https://www.paypal.me/morgul" style="white-space: nowrap">
							<i class="fa fa-paypal"></i> Donate
						</a>
                    </div>
				</div>
				<p>
					PokeGoNav is an open source project to map Pokémon spawn locations, Gyms and Pokéstops. Its
					intention is to help Trainers see where certain types of Pokémon spawn, and provide useful tools
					for Trainers in their search for specific Pokémon.
				</p>
				<p>
					PokeGoNav is made with <i class="fa fa-heart"></i>, and is hosted personally, by an individual, at their expense. Please be respectful and conscientious.
				</p>
				<p>
					If you would like to show your appreciation, please, send a <a target="_blank" href="https://www.paypal.me/morgul">donation</a>.
				</p>
				<p class="text-center text-muted">
					<small>PokeGoNav is <b>NOT</b> associated with Niantic, The Pokémon Company, or Nintendo.</small>
				</p>
			</div>
			<div class="modal-footer" slot="footer">
				<button type="button"
						class="btn btn-secondary"
						@click="hideModal()">
					<i class="fa fa-times"></i>
					Close
				</button>
			</div>
		</modal>
	</div>
</template>

<style rel="stylesheet/scss" lang="sass">
	#links {
		position: absolute;
		bottom: 10px;
		width: 210px;
		left: 10px;
		z-index: 9301;

		a.btn {
			background-color: rgba(250, 250, 250, 0.9);

			&:hover {
				background-color: #bb381e;
			}
		}

		@media(max-width: 450px)
		{
			left: 5px;
			right: 5px;
			width: auto;
			bottom: 84px;
		}
	}
</style>

<script type="text/babel">
	import pkg from '../../package.json';
	import { modal } from 'vueboot'

    export default {
		components: {
			modal
		},
        data()
        {
            return {
				package: pkg
			};
        },
		methods: {
			showModal(){ this.$refs.aboutModal.showModal(); },
			hideModal(){ this.$refs.aboutModal.hideModal(); }
		}
    }
</script>

<template>
    <div id="links">
		<a href="#" class="text-muted pull-left" @click="showModal()">
			<i class="fa fa-info-circle"></i>
			About
		</a>
		<a target="_blank" href="https://gitlab.com/skewed-aspect/pokegonav/issues/new" class="text-muted pull-right">
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
				<p class="text-muted">
					<div class="pull-right">
						<a target="_blank" href="https://gitlab.com/skewed-aspect/pokegonav"><i class="fa fa-gitlab"></i> GitLab Project</a>
					</div>
					<small>
						build v{{ package.version }} (<a target="_blank" href="https://gitlab.com/skewed-aspect/pokegonav/tags/v{{ package.version }}">Details</a>)
					</small>
				</p>
				<p>
					PokeGoNav is an open source project to map Pokémon spawn locations, Gyms and Pokéstops. Its
					intention is to help Trainers see where certain types of Pokémon spawn, and provide useful tools
					for Trainers in their search for specific Pokémon.
				</p>
				<p>
					PokeGoNav is made with <i class="fa fa-heart"></i>, and is hosted personally, by an individual, at their expense. Please be respectful and conscientious.
				</p>
				<p>
					If you would like to show your appreciation, please, send a <a href="https://www.paypal.me/morgul">donation</a>.
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
		width: 200px;
		left: 10px;
		z-index: 9001;

		@media(max-width: 450px)
		{
			right: 10px;
			width: auto;
			bottom: 80px;
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

<template>
	<div id="add-btn">
		<button class="btn btn-info">
			<i class="fa fa-plus"></i>
			Add
		</button>
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
    export default {
        data: function()
        {
            return {};
        }
    }
</script>

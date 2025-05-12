<script lang="ts">
	let { title } = $props<{ title: string }>();
</script>

<div class="title-container">
	<h2 class="section-title text-sm">{title}</h2>
</div>

<style>
	.title-container {
		display: flex;
		flex: none;
	}
	.section-title {
		margin-bottom: 2rem;
		background-color: var(--color-black);
		color: var(--color-white);
		padding: 0.4rem 0.5rem;
		margin-right: auto;
		text-transform: uppercase;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.section-title::before,
	.section-title::after {
		content: "";
		display: block;
		width: 0.35rem;
		height: 1rem;
		border-top: 1px solid var(--color-white);
		border-bottom: 1px solid var(--color-white);
		mix-blend-mode: difference;
	}
	.section-title::before {
		border-left: 1px solid var(--color-white);
		margin-right: 0.5rem;
	}
	.section-title::after {
		border-right: 1px solid var(--color-white);
		margin-left: 0.5rem;
	}
</style>

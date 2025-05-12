<script lang="ts">
	const keywords = ["3D", "Accessibilité", "Performance", "Modularité", "Intéractivité"];
</script>

<ul class="keywords-list">
	{#each keywords as keyword, index (index)}
		<li class="keyword-item">
			<span class="interactive-btn-font">
				{keyword}
			</span>
		</li>
	{/each}
</ul>

<style>
	.keywords-list {
		display: flex;
		flex-wrap: wrap;
		font-weight: 800;
		text-transform: uppercase;
		border-top: 2px solid var(--color-black);
		border-left: 2px solid var(--color-black);
	}
	.keyword-item {
		padding: 0.8rem 1rem;
		flex: auto;
		display: flex;
		align-items: center;
		justify-content: center;
		border-bottom: 2px solid var(--color-black);
		border-right: 2px solid var(--color-black);
		position: relative;
		line-height: normal;
	}
</style>

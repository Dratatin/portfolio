<script lang="ts">
	const keywords = ["3D", "accessibilité", "performance", "modularité", "intéractivité"];
</script>

<ul class="keywords-list">
	{#each keywords as keyword, index (index)}
		<li class="keyword-item">
			<span class="btn-decorated">
				{keyword}
			</span>
		</li>
	{/each}
</ul>

<style>
	.keywords-list {
		display: flex;
		flex-wrap: wrap;
		font-weight: 900;
		border-top: var(--border-weight) solid var(--color-black);
		border-left: var(--border-weight) solid var(--color-black);
		background-color: var(--color-black);
	}
	.keyword-item {
		flex: auto;
		display: flex;
		align-items: center;
		justify-content: center;
		border-bottom: var(--border-weight) solid var(--color-black);
		border-right: var(--border-weight) solid var(--color-black);
		position: relative;
		line-height: normal;
		background-color: var(--color-white);
	}
</style>

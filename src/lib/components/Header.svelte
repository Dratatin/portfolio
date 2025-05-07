<script lang="ts">
	const menuItems = [
		{ text: "à propos", link: "#" },
		{ text: "liste des projets", link: "#" },
		{ text: "savoir faire", link: "#" }
	];
</script>

<header class="header">
	<nav class="nav">
		<ul class="nav-list text-sm">
			{#each menuItems as item, index (index)}
				<li>
					<a href={item.link} class="nav-link">
						<div class="nav-link-hook-wrapper">
							<span class="nav-link-hook"></span>
						</div>
						<span class="nav-link-text">{item.text}</span>
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</header>

<style>
	.header {
		position: absolute;
		top: 0;
	}
	.nav {
		padding: 3rem;
	}
	.nav-list {
		display: flex;
		text-transform: uppercase;
		gap: 3rem;
	}
	.nav-link {
		display: flex;
		gap: 0.5rem;
		padding: 0.4rem 0.5rem;
		align-items: center;
		background: linear-gradient(
			var(--color-white),
			var(--color-white) 50%,
			var(--color-black) 50%,
			var(--color-black)
		);
		background-size: 100% 200%;
		/*trasition effect for background*/
		transition: background 0.3s cubic-bezier(0, 0.99, 0.67, 1);
	}
	.nav-link-hook-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.nav-link-hook-wrapper::before,
	.nav-link-hook-wrapper::after {
		content: "";
		display: block;
		width: 0.35rem;
		height: 1rem;
		border-top: 1px solid var(--color-white);
		border-bottom: 1px solid var(--color-white);
		mix-blend-mode: difference;
	}
	.nav-link-hook-wrapper::before {
		border-left: 1px solid var(--color-white);
	}
	.nav-link-hook-wrapper::after {
		border-right: 1px solid var(--color-white);
	}
	.nav-link-hook {
		visibility: hidden;
		width: 0.5rem;
		height: 0.5rem;
		margin: 0 0.4rem;
		/* border-radius: .5rem; */
		background-color: var(--color-white);
		mix-blend-mode: difference;
	}
	.nav-link:hover {
		background-position: 100% 100%;
		color: var(--color-white);
	}
	.nav-link:hover .nav-link-hook {
		visibility: visible;
	}
</style>

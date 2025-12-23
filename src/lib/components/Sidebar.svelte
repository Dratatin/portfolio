<script>
	import {
		firstPageLoadTimeline,
		hoverFormat,
		largeScreen,
		mobileMenuOpen
	} from "$lib/stores/store";
	import { LinkHandler } from "$lib/utils/linkHandler";
	import { onMount } from "svelte";
	import Avatar from "./Avatar.svelte";

	const sidebarItems = [];
	let sidebar;
	let menuOpen = $state(false);

	function handleMouseEnter() {
		hoverFormat.set("interactive");
	}

	function handleMouseLeave() {
		hoverFormat.set(null);
	}

	function toggleMobileMenu() {
		mobileMenuOpen.set(!menuOpen);
	}

	onMount(() => {
		const unsubscribePageLoadTimeline = firstPageLoadTimeline.subscribe((timeline) => {
			if (timeline && sidebar && sidebarItems.length) {
				if (largeScreen) {
					timeline.from(
						sidebar,
						{
							yPercent: 100,
							duration: 0.8,
							delay: 0.2,
							ease: "power3.out"
						},
						0
					);

					timeline.from(
						sidebarItems,
						{
							xPercent: 150,
							stagger: 0.1,
							duration: 0.6,
							ease: "back.out(1)"
						},
						0.7
					);
				} else {
					timeline.from(
						sidebar,
						{
							xPercent: -100,
							duration: 0.8,
							delay: 0.2,
							ease: "power3.out"
						},
						0
					);

					timeline.from(
						sidebarItems,
						{
							yPercent: -100,
							stagger: 0.1,
							duration: 0.6,
							ease: "back.out(1)"
						},
						0.7
					);
				}
			}
		});

		const unsubscribeMobileMenu = mobileMenuOpen.subscribe((value) => {
			menuOpen = value;
		});

		return () => {
			unsubscribePageLoadTimeline();
			unsubscribeMobileMenu();
		};
	});
</script>

<div class="sidebar" bind:this={sidebar}>
	<ul class="link-list">
		<li class="sidebar-item-wrapper" bind:this={sidebarItems[0]}>
			<div class="sidebar-item item-first">
				<Avatar reversed={!largeScreen ? true : false} />
			</div>
		</li>
		<li class="sidebar-item-wrapper" bind:this={sidebarItems[1]}>
			<a
				href={LinkHandler("/CV.pdf")}
				download
				class="sidebar-item btn-decorated"
				onmouseenter={handleMouseEnter}
				onmouseleave={handleMouseLeave}
			>
				cv
			</a>
		</li>
		<li class="sidebar-item-wrapper" bind:this={sidebarItems[2]}>
			<a
				href="https://github.com/Dratatin"
				title="Mon github"
				class="sidebar-item btn-decorated"
				aria-label="Mon github"
				target="_blank"
				onmouseenter={handleMouseEnter}
				onmouseleave={handleMouseLeave}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="37"
					height="36"
					viewBox="0 0 37 36"
					fill="none"
				>
					<g clip-path="url(#clip0_1477_625)">
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M18.4449 0C8.24534 0 0 8.25 0 18.4564C0 26.6149 5.28307 33.5209 12.6121 35.9651C13.5284 36.1489 13.8641 35.568 13.8641 35.0794C13.8641 34.6515 13.8338 33.1849 13.8338 31.6567C8.70293 32.757 7.63446 29.4566 7.63446 29.4566C6.80989 27.3176 5.58813 26.7679 5.58813 26.7679C3.90879 25.6372 5.71046 25.6372 5.71046 25.6372C7.5733 25.7595 8.55078 27.5317 8.55078 27.5317C10.1995 30.3427 12.8564 29.5485 13.9252 29.0595C14.0777 27.8677 14.5667 27.0427 15.0858 26.5845C10.9935 26.1566 6.68794 24.5678 6.68794 17.4784C6.68794 15.4616 7.42039 13.8116 8.58098 12.5284C8.39787 12.0701 7.75641 10.1753 8.76447 7.63913C8.76447 7.63913 10.3219 7.15013 13.8335 9.53363C15.3369 9.12962 16.8874 8.92411 18.4449 8.92237C20.0023 8.92237 21.5899 9.1365 23.0559 9.53363C26.5679 7.15013 28.1253 7.63913 28.1253 7.63913C29.1333 10.1753 28.4915 12.0701 28.3084 12.5284C29.4996 13.8116 30.2018 15.4616 30.2018 17.4784C30.2018 24.5678 25.8962 26.1259 21.7734 26.5845C22.4454 27.165 23.0253 28.2649 23.0253 30.0067C23.0253 32.4817 22.9951 34.4681 22.9951 35.079C22.9951 35.568 23.3311 36.1489 24.2471 35.9655C31.5761 33.5205 36.8592 26.6149 36.8592 18.4564C36.8894 8.25 28.6138 0 18.4449 0Z"
							fill="#1A1A1A"
						/>
					</g>
					<defs>
						<clipPath id="clip0_1477_625">
							<rect width="37" height="36" fill="white" />
						</clipPath>
					</defs>
				</svg>
			</a>
		</li>
		<li class="sidebar-item-wrapper" bind:this={sidebarItems[3]}>
			<a
				href="https://www.linkedin.com/in/mathys-chirouze/"
				title="Mon linkedin"
				class="sidebar-item btn-decorated linkedin"
				aria-label="Mon linkedin"
				target="_blank"
				onmouseenter={handleMouseEnter}
				onmouseleave={handleMouseLeave}
			>
				IN
			</a>
		</li>
	</ul>
	{#if !largeScreen}
		<button
			class="mobile-menu"
			class:open={menuOpen}
			onclick={toggleMobileMenu}
			aria-label="Ouvrir la navigation mobile"
			bind:this={sidebarItems[4]}
			onmouseenter={handleMouseEnter}
			onmouseleave={handleMouseLeave}
		>
			<div class="menu-line"></div>
			<div class="menu-line"></div>
		</button>
	{/if}
</div>

<style>
	.sidebar {
		background-color: var(--color-black);
		border-top: var(--border-weight) solid var(--color-black);
		width: var(--side-content-size);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		position: fixed;
		top: 0;
		right: 0;
		height: 100vh;
		z-index: 15;
	}
	.sidebar-item {
		background-color: var(--color-white);
		border-bottom: var(--border-weight) solid var(--color-black);
		border-right: var(--border-weight) solid var(--color-black);
		border-left: var(--border-weight) solid var(--color-black);
		width: var(--side-content-size);
		height: var(--side-content-size);
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		padding: var(--btn-padding);
		position: relative;
		top: calc(var(--border-weight) * -1);
	}
	.sidebar-item-wrapper:first-child .sidebar-item {
		padding: 0.8rem;
	}
	.link-list {
		display: flex;
		flex-direction: column;
	}
	.mobile-menu {
		width: var(--side-content-size);
		height: var(--side-content-size);
		background-color: var(--color-white);
		border: var(--border-weight) solid var(--color-black);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		cursor: pointer;
	}
	.menu-line {
		width: 60%;
		height: 3px;
		background-color: var(--color-black);
		transition: all 0.4s cubic-bezier(0.77, 0, 0.175, 1);
	}
	.mobile-menu.open .menu-line:first-child {
		transform: translateY(calc(0.25rem + 50%)) rotate(45deg);
	}
	.mobile-menu.open .menu-line:last-child {
		transform: translateY(calc(-0.25rem - 50%)) rotate(-45deg);
	}
	@media screen and (max-width: 992px) {
		.sidebar {
			height: auto;
			width: 100%;
			left: 0;
			flex-direction: row;
			justify-content: space-between;
			border-top: 0;
		}
		.sidebar-item {
			top: 0;
			border-right: 0;
			border-top: var(--border-weight) solid var(--color-black);
		}
		.sidebar-item-wrapper:first-child .sidebar-item {
			padding: 0.5rem;
		}
		.link-list {
			flex-direction: row;
		}
	}
</style>

<script lang="ts">
	import { firstPageLoadTimeline } from "$lib/stores/store";
	import { hoveredElement, hoverFormat } from "$lib/stores/store";
	import { onMount } from "svelte";

	const sidebarItem: HTMLElement[] = [];
	let sidebar: HTMLElement;

	function handleLinkMouseEnter(linkElm: HTMLElement) {
		hoveredElement.set(linkElm);
		hoverFormat.set("interactive");
	}

	function handleLinkMouseLeave() {
		hoveredElement.set(null);
		hoverFormat.set(null);
	}

	onMount(() => {
		firstPageLoadTimeline.subscribe((pageTimeline) => {
			if (pageTimeline) {
				pageTimeline.from(
					sidebar,
					{
						yPercent: 100,
						duration: 0.8,
						delay: 0.1,
						ease: "power3.out"
					},
					0
				);

				pageTimeline.from(
					sidebarItem,
					{
						xPercent: 150,
						stagger: 0.1,
						duration: 0.6,
						ease: "back.out(1)"
					},
					0.8
				);
			}
		});
	});
</script>

<div class="sidebar" bind:this={sidebar}>
	<ul class="link-list">
		<li bind:this={sidebarItem[0]}>
			<svg
				class="sidebar-item item-first"
				xmlns="http://www.w3.org/2000/svg"
				width="49"
				height="48"
				viewBox="0 0 49 48"
				fill="none"
			>
				<rect
					x="2.76399"
					y="16.5687"
					width="23.8851"
					height="29.6754"
					rx="11.9425"
					fill="#FDFBF7"
					stroke="black"
					stroke-width="2.89516"
				/>
				<rect
					x="2.18683"
					y="5.93973"
					width="18.0947"
					height="6.54323"
					rx="3.27162"
					transform="rotate(-10.4366 2.18683 5.93973)"
					fill="#FDFBF7"
					stroke="black"
					stroke-width="2.89516"
				/>
				<rect
					x="29.0678"
					y="2.7364"
					width="18.0947"
					height="6.24575"
					rx="3.12288"
					transform="rotate(13.0153 29.0678 2.7364)"
					fill="#FDFBF7"
					stroke="black"
					stroke-width="2.89516"
				/>
				<path
					d="M9.27734 21.6348C13.6743 21.6348 17.2391 26.009 17.2393 31.4053C17.2393 32.7939 17.0007 34.1144 16.5752 35.3105L11.0879 33.9385L14.1836 39.0967C12.8311 40.3981 11.1292 41.1768 9.27734 41.1768C4.88038 41.1765 1.31641 36.8016 1.31641 31.4053C1.31659 26.0091 4.8805 21.635 9.27734 21.6348Z"
					fill="black"
				/>
				<rect
					x="22.306"
					y="16.5687"
					width="23.8851"
					height="29.6754"
					rx="11.9425"
					fill="#FDFBF7"
					stroke="black"
					stroke-width="2.89516"
				/>
				<path
					d="M28.8203 21.6348C33.2173 21.6348 36.782 26.009 36.7822 31.4053C36.7822 32.7939 36.5436 34.1144 36.1182 35.3105L30.6299 33.9385L33.7256 39.0986C32.3733 40.3993 30.6716 41.1768 28.8203 41.1768C24.4232 41.1767 20.8584 36.8017 20.8584 31.4053C20.8586 26.009 24.4233 21.6348 28.8203 21.6348Z"
					fill="black"
				/>
			</svg>
		</li>
		<li bind:this={sidebarItem[1]}>
			<a
				href="/"
				download=""
				class="sidebar-item btn-decorated"
				onmouseenter={() => handleLinkMouseEnter(sidebarItem[1])}
				onmouseleave={handleLinkMouseLeave}
			>
				cv
			</a>
		</li>
		<li bind:this={sidebarItem[2]}>
			<a
				href="/"
				download=""
				class="sidebar-item btn-decorated"
				aria-label="Mon github"
				onmouseenter={() => handleLinkMouseEnter(sidebarItem[2])}
				onmouseleave={handleLinkMouseLeave}
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
		<li bind:this={sidebarItem[3]}>
			<a
				href="/"
				download=""
				class="sidebar-item btn-decorated linkedin"
				onmouseenter={() => handleLinkMouseEnter(sidebarItem[3])}
				onmouseleave={handleLinkMouseLeave}
			>
				in
			</a>
		</li>
	</ul>
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
	.sidebar-item.item-first {
		border-top: var(--border-weight) solid var(--color-black);
	}
	.link-list {
		display: flex;
		flex-direction: column;
	}
	.linkedin {
		text-transform: lowercase;
		font-size: 24px;
	}
</style>

<script lang="ts">
	import gsap from "gsap";
	import { ScrollTrigger } from "gsap/ScrollTrigger";
	import { onMount } from "svelte";

	let svgLetters: SVGElement[] = [];
	let FooterElement: HTMLElement;

	function linkFocusIn() {
		if (svgLetters[12]) {
			gsap.set(svgLetters[12], { transformOrigin: "center center" });
			gsap.to(svgLetters[12], { rotate: -40, duration: 0.3, ease: "power2.out" });
		}
	}

	function linkFocusOut() {
		if (svgLetters[12]) {
			gsap.set(svgLetters[12], { transformOrigin: "center center" });
			gsap.to(svgLetters[12], { rotate: 0, duration: 0.3, ease: "power2.out" });
		}
	}

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		gsap.from(svgLetters, {
			yPercent: -100,
			ease: "power2.out",
			stagger: 0.08,
			scrollTrigger: {
				trigger: FooterElement,
				start: "top bottom",
				end: "bottom bottom",
				scrub: true
			}
		});
	});
</script>

<div bind:this={FooterElement} class="footer-content container-padding">
	<div class="footer-top">
		<a
			class="footer-link"
			href="/"
			download=""
			aria-label="Me recruter"
			on:mouseover={linkFocusIn}
			on:focus={linkFocusIn}
			on:mouseleave={linkFocusOut}
			on:blur={linkFocusOut}
		>
			<svg
				class="svg"
				viewBox="0 0 1320 140"
				width="100%"
				height="100%"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g id="letter0" bind:this={svgLetters[0]}
					><text x="0" y="135" font-size="170" font-family="StroyMono" font-weight="800">M</text></g
				>
				<g id="letter1" bind:this={svgLetters[1]}
					><text x="100" y="135" font-size="170" font-family="StroyMono" font-weight="800">E</text
					></g
				>
				<g id="letter2" bind:this={svgLetters[2]}
					><text x="200" y="135" font-size="170" font-family="StroyMono" font-weight="800">
					</text></g
				>
				<g id="letter3" bind:this={svgLetters[3]}
					><text x="300" y="135" font-size="170" font-family="StroyMono" font-weight="800">R</text
					></g
				>
				<g id="letter4" bind:this={svgLetters[4]}
					><text x="400" y="135" font-size="170" font-family="StroyMono" font-weight="800">E</text
					></g
				>
				<g id="letter5" bind:this={svgLetters[5]}
					><text x="500" y="135" font-size="170" font-family="StroyMono" font-weight="800">C</text
					></g
				>
				<g id="letter6" bind:this={svgLetters[6]}
					><text x="600" y="135" font-size="170" font-family="StroyMono" font-weight="800">R</text
					></g
				>
				<g id="letter7" bind:this={svgLetters[7]}
					><text x="700" y="135" font-size="170" font-family="StroyMono" font-weight="800">U</text
					></g
				>
				<g id="letter8" bind:this={svgLetters[8]}
					><text x="800" y="135" font-size="170" font-family="StroyMono" font-weight="800">T</text
					></g
				>
				<g id="letter9" bind:this={svgLetters[9]}
					><text x="900" y="135" font-size="170" font-family="StroyMono" font-weight="800">E</text
					></g
				>
				<g id="letter10" bind:this={svgLetters[10]}
					><text x="1000" y="135" font-size="170" font-family="StroyMono" font-weight="800">R</text
					></g
				>
				<g id="letter11" bind:this={svgLetters[11]}
					><text x="1100" y="135" font-size="170" font-family="StroyMono" font-weight="800">
					</text></g
				>
				<g id="arrow" bind:this={svgLetters[12]}
					><text x="1200" y="135" font-size="200" font-family="StroyMono" font-weight="800"
						>&#8594;</text
					></g
				>
			</svg>
		</a>
	</div>
	<div class="footer-bottom">
		<div class="footer-contact">
			<div class="footer-links">
				<a
					class="footer-btn"
					href="https://www.linkedin.com/in/mathys-chirouze/"
					aria-label="Lien vers mon profile linkedin"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="39"
						height="27"
						viewBox="0 0 39 27"
						fill="none"
					>
						<path
							d="M5.992 5.22V-2.14577e-06H12.076V5.22H5.992ZM0.0160001 27V22.572H6.172V12.42H0.0160001V7.992H12.076V22.572H17.692V27H0.0160001ZM22.1419 27V7.992H28.2259V10.836C29.4139 8.604 31.6099 7.632 33.8059 7.632C36.7579 7.632 38.6299 9.36 38.6299 12.816V27H32.5459V14.076C32.5459 12.456 32.0419 11.88 30.9619 11.88C29.7739 11.88 28.2259 12.816 28.2259 15.948V27H22.1419Z"
							fill="#1A1A1A"
						/>
					</svg>
				</a>
				<a
					class="footer-btn"
					href="https://github.com/Dratatin"
					aria-label="Lien vers mon profil github"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="40"
						height="39"
						viewBox="0 0 40 39"
						fill="none"
					>
						<g clip-path="url(#clip0_748_115)">
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M19.9404 0C8.91388 0 0 8.9375 0 19.9944C0 28.8328 5.71143 36.3143 13.6347 38.9622C14.6253 39.1613 14.9882 38.532 14.9882 38.0027C14.9882 37.5391 14.9555 35.9503 14.9555 34.2948C9.40857 35.4867 8.25347 31.9113 8.25347 31.9113C7.36204 29.5941 6.04122 28.9985 6.04122 28.9985C4.22571 27.7737 6.17347 27.7737 6.17347 27.7737C8.18735 27.9061 9.24408 29.8261 9.24408 29.8261C11.0265 32.8713 13.8988 32.0109 15.0543 31.4811C15.2192 30.1901 15.7478 29.2963 16.309 28.7999C11.8849 28.3363 7.2302 26.6151 7.2302 18.9349C7.2302 16.7501 8.02204 14.9626 9.27673 13.5724C9.07878 13.076 8.38531 11.0232 9.4751 8.27572C9.4751 8.27572 11.1588 7.74597 14.9551 10.3281C16.5804 9.89043 18.2566 9.66778 19.9404 9.66591C21.6241 9.66591 23.3404 9.89788 24.9253 10.3281C28.722 7.74597 30.4057 8.27572 30.4057 8.27572C31.4955 11.0232 30.8016 13.076 30.6037 13.5724C31.8914 14.9626 32.6506 16.7501 32.6506 18.9349C32.6506 26.6151 27.9959 28.303 23.5388 28.7999C24.2653 29.4287 24.8922 30.6203 24.8922 32.5073C24.8922 35.1886 24.8596 37.3405 24.8596 38.0022C24.8596 38.532 25.2229 39.1613 26.2131 38.9626C34.1363 36.3139 39.8478 28.8328 39.8478 19.9944C39.8804 8.9375 30.9339 0 19.9404 0Z"
								fill="#1A1A1A"
							/>
						</g>
						<defs>
							<clipPath id="clip0_748_115">
								<rect width="40" height="39" fill="white" />
							</clipPath>
						</defs>
					</svg>
				</a>
			</div>
			<div class="footer-coords">
				<span>matchirouze@gmail.com</span>
				<span class="italic">06 62 64 57 68</span>
			</div>
		</div>
		<p class="footer-credits">Mathys Chirouze © 2025, tout droit réservé</p>
	</div>
</div>

<style>
	.footer-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		background-color: var(--color-black);
		color: var(--color-white);
		flex: 1;
		gap: 5rem;
	}
	.footer-top {
		display: flex;
		align-items: center;
		gap: 5rem;
	}
	.footer-bottom {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
	}
	.footer-contact {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
	.footer-coords,
	.footer-links {
		display: flex;
		gap: 0.8rem;
	}
	.footer-coords {
		flex-direction: column;
	}
	.footer-btn {
		width: var(--square-btn-size);
		height: var(--square-btn-size);
		background-color: var(--color-white);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.footer-link {
		display: block;
		width: 100%;
		overflow: hidden;
		padding-block: 2rem;
		position: relative;
	}
	.footer-link .svg {
		fill: var(--color-white);
		overflow: visible;
	}
	.footer-link:before,
	.footer-link:after {
		content: "";
		display: block;
		position: absolute;
		background-color: var(--color-white);
		width: 100%;
		height: 2px;
		left: 0;
		transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
	}
	.footer-link:before {
		top: 0;
		transform: scaleX(1);
	}
	.footer-link:after {
		bottom: 0;
		transform: scaleX(0);
	}
	.footer-link:hover::after {
		transform: scaleX(1);
	}
	.footer-link::after {
		transform-origin: bottom right;
	}
	.footer-link:hover::after {
		transform-origin: bottom left;
	}

	.footer-link:hover::before {
		transform: scaleX(0);
	}
	.footer-link::before {
		transform-origin: bottom right;
	}
	.footer-link:hover::before {
		transform-origin: bottom left;
	}
</style>

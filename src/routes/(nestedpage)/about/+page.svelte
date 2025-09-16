<script lang="ts">
	import recruteur from "$assets/recruteur.png";
	import tous from "$assets/tous.png";
	import amis from "$assets/amis.png";
	import texture from "$assets/texture.jpg";
	import gsap from "gsap";
	import ShaderTransition, { type ShaderTransitionInstance } from "$lib/utils/shaderTransition";
	import { SplitText } from "gsap/SplitText";
	import { Flip } from "gsap/Flip";
	import type SplitTextType from "gsap/SplitText";
	import { ScrollTrigger } from "gsap/ScrollTrigger";
	import { onMount } from "svelte";
	import { hoverFormat } from "$lib/stores/store";

	let buttons: HTMLButtonElement[] = $state([]);
	let descriptions: HTMLElement[] = $state([]);
	let splitTexts: SplitTextType[] = [];
	let shaderContainer: HTMLElement;
	let myAnimation: ShaderTransitionInstance;
	let activeIndex = $state(0);

	const aboutContents = [
		{
			id: "all",
			type: "pour tous",
			description: `Bienvenue sur mon portfolio.
Je suis développeur front-end, passionné par le design d’interaction et les animations web. J’aime créer des interfaces fluides, vivantes et bien pensées.
Bonne visite !`
		},
		{
			id: "recruiters",
			type: "recruteurs",
			description: `Bonjour, et merci de votre visite.
Développeur front-end, je conçois des interfaces modernes, accessibles et centrées sur l’expérience utilisateur.
Si mon profil vous intéresse, n’hésitez pas à me contacter.`
		},
		{
			id: "friends",
			type: "amis",
			description: `Bienvenue à toi, ami(e) curieux(se).
Ce portfolio présente mon travail côté front-end. Des projets pros, un peu de R&D visuelle, et pas mal de soin dans les détails.
Tu connais la personne, voici le pro.`
		}
	];

	function animeText(text: Element[]) {
		gsap.from(text, {
			yPercent: 100,
			opacity: 0,
			duration: 0.4,
			stagger: 0.04,
			ease: "power.out(4)"
		});
	}

	function handleButtonClick(index: number) {
		if (myAnimation.isCurrentlyTransitioning() || activeIndex === index) {
			return;
		}

		myAnimation.swap(index);
		reorganizeButtons(index);
		updateActiveDescription(index);
		activeIndex = index;
	}

	function reorganizeButtons(clickedIndex: number) {
		const state = Flip.getState(buttons);
		buttons.forEach((button, index) => {
			button.classList.remove("active");
			if (index === clickedIndex) {
				gsap.set(button, { order: -1 });
			} else {
				gsap.set(button, { order: index });
			}
		});
		Flip.from(state, { duration: 0.6, ease: "power2.out" });
		buttons[clickedIndex].classList.add("active");
	}

	function updateActiveDescription(index: number) {
		const previousActiveIndex = descriptions.findIndex((description) =>
			description.classList.contains("active")
		);

		const previousDescription = descriptions[previousActiveIndex];
		const newDescription = descriptions[index];

		gsap.set(previousDescription, { clearProps: true });
		previousDescription.classList.remove("active");
		newDescription.classList.add("active");

		animeText(splitTexts[index].lines);
	}

	function handleButtonMouseEnter(index: number) {
		if (index !== activeIndex) {
			hoverFormat.set("interactive");
		}
	}

	function handleButtonMouseLeave() {
		hoverFormat.set(null);
	}

	onMount(async () => {
		await document.fonts.ready;
		gsap.registerPlugin(ScrollTrigger, SplitText, Flip);

		myAnimation = new ShaderTransition({
			parent: shaderContainer,
			intensity: 0.4,
			images: [recruteur, tous, amis],
			initialIndex: 0,
			displacementImage: texture,
			speed: 1.4,
			imagesRatio: 1200 / 800
		});

		descriptions.forEach((description, index) => {
			splitTexts[index] = SplitText.create(description, {
				type: "words, lines"
			});
		});

		if (splitTexts.length > 0) {
			animeText(splitTexts[0].lines);
		}
	});
</script>

<div class="about page">
	<div class="profile-wrapper">
		<div class="profile-picture-wrapper" bind:this={shaderContainer}></div>
	</div>
	<div class="about-content">
		<div class="about-btns">
			{#each aboutContents as content, index (index)}
				<button
					class="about-button btn-decorated {index === 0 ? 'active' : ''}"
					bind:this={buttons[index]}
					onclick={() => handleButtonClick(index)}
					onmouseenter={() => handleButtonMouseEnter(index)}
					onmouseleave={handleButtonMouseLeave}
				>
					{content.type}
				</button>
			{/each}
		</div>
		<div class="about-description-wrapper">
			{#each aboutContents as content, index (index)}
				<p class="about-description {index === 0 ? 'active' : ''}" bind:this={descriptions[index]}>
					{content.description}
				</p>
			{/each}
		</div>
	</div>
</div>

<style>
	.about {
		display: flex;
		border: var(--border-weight) solid var(--color-black);
		overflow: auto;
	}
	.profile-wrapper {
		position: relative;
		aspect-ratio: 4/6;
		border-right: var(--border-weight) solid var(--color-black);
	}
	.profile-picture-wrapper {
		width: 100%;
		height: 100%;
		display: flex;
	}
	.about-content {
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		position: relative;
		flex: 1;
	}
	.about-description-wrapper {
		overflow: hidden;
	}
	.about-description {
		max-width: 45rem;
		visibility: hidden;
		opacity: 0;
		position: absolute;
		top: 0;
		padding: 9rem;
		line-height: 1.6;
	}
	.about-description.active {
		display: block;
		visibility: visible;
		opacity: 1;
		position: static;
	}
	.about-btns {
		display: grid;
		grid-auto-flow: column;
		position: absolute;
		top: 10%;
		right: 100%;
		transform: translateX(calc((100% / 3) * 2));
		z-index: 2;
	}
	.about-button {
		text-orientation: mixed;
		writing-mode: vertical-rl;
		padding-inline: 4rem;
		outline: var(--border-weight) solid var(--color-black);
		text-align: center;
		text-transform: uppercase;
		position: relative;
		color: var(--color-black);
		background-color: var(--color-white);
		z-index: 1;
	}
	.about-button.active {
		background-color: var(--color-black);
		color: var(--color-white);
		z-index: 0;
	}
	.about-button:hover {
		cursor: pointer;
	}
	.about-button.active:hover {
		cursor: auto;
	}
	@media screen and (max-width: 1400px) {
		.profile-wrapper {
			aspect-ratio: 4/8;
		}
	}
	@media screen and (max-width: 1200px) {
		.about-button {
			text-orientation: initial;
			writing-mode: initial;
			padding-inline: var(--btn-padding);
		}
		.about-btns {
			transform: none;
			top: unset;
			width: 100%;
			bottom: 0;
			left: 0;
			position: fixed;
		}
		.about-description {
			padding: 4rem;
			max-width: none;
		}
	}
	@media screen and (max-width: 992px) {
		.about {
			padding: var(--container-padding);
			display: block;
		}
		.profile-wrapper {
			position: relative;
			aspect-ratio: 4/6;
			max-width: 400px;
			border: var(--border-weight) solid var(--color-black);
		}
		.about-description {
			padding: 0;
			margin-top: 1.3rem;
		}
		.about-description-wrapper {
			margin-bottom: auto;
		}
		.about-content {
			align-items: initial;
			margin-bottom: 3rem;
		}
	}
</style>

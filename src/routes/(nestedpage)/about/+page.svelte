<script lang="ts">
	import recruteur from "$assets/recruteur.png";
	import tous from "$assets/tous.png";
	import amis from "$assets/amis.png";
	import texture from "$assets/texture.jpg";
	import gsap from "gsap";
	import ShaderTransition, { type ShaderTransitionInstance } from "$lib/utils/shaderTransition";
	import { SplitText } from "gsap/SplitText";
	import type SplitTextType from "gsap/SplitText";
	import { ScrollTrigger } from "gsap/ScrollTrigger";
	import { onMount } from "svelte";
	import { hoverFormat } from "$lib/stores/store";

	let buttons: HTMLButtonElement[] = [];
	let buttonOrder: HTMLButtonElement[] = [];
	let descriptions: HTMLElement[] = [];
	let splitTexts: SplitTextType[] = [];
	let shaderContainer: HTMLElement;
	let myAnimation: ShaderTransitionInstance;

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

	function handleButtonClick(selectedButton: HTMLButtonElement, index: number) {
		if (myAnimation.isCurrentlyTransitioning()) {
			return;
		}
		myAnimation.swap(index);
		const clickedIndex = buttonOrder.indexOf(selectedButton);
		if (clickedIndex === 0) return;

		const newOrder = [...buttonOrder];

		const swap = <T,>(arr: T[], i: number, j: number) => {
			[arr[i], arr[j]] = [arr[j], arr[i]];
		};

		if (clickedIndex === 2) {
			const [lastButton] = newOrder.splice(2, 1);
			newOrder.unshift(lastButton);
		} else if (clickedIndex === 1) {
			swap(newOrder, 0, 1);
		}

		newOrder.forEach((button, i) => {
			button.classList.remove("active");

			gsap.to(button, {
				duration: 0.6,
				translateX: `${i * 100}%`,
				ease: "power2.out"
			});
		});

		newOrder[0].classList.add("active");
		buttonOrder = newOrder;

		const previousActiveIndex = descriptions.findIndex((d) => d.classList.contains("active"));
		const previousDescription = descriptions[previousActiveIndex];
		const newDescription = descriptions[index];

		gsap.set(previousDescription, { clearProps: true });
		newDescription.classList.add("active");
		previousDescription.classList.remove("active");
		animeText(splitTexts[index].lines);
	}

	function handleButtonMouseEnter() {
		hoverFormat.set("interactive");
	}

	function handleButtonMouseLeave() {
		hoverFormat.set(null);
	}

	onMount(async () => {
		await document.fonts.ready;
		gsap.registerPlugin(ScrollTrigger, SplitText);

		buttonOrder = [...buttons];

		myAnimation = new ShaderTransition({
			parent: shaderContainer,
			intensity: 0.3,
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
					style:transform="translateX({100 * index}%)"
					style:left="{-100 * index}%"
					bind:this={buttons[index]}
					onclick={() => handleButtonClick(buttons[index], index)}
					onmouseenter={handleButtonMouseEnter}
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
		overflow: hidden;
		border: var(--border-weight) solid var(--color-black);
	}
	.profile-wrapper {
		position: relative;
		aspect-ratio: 4/6;
		border-right: var(--border-weight) solid var(--color-black);
	}
	.profile-picture-wrapper {
		width: 100%;
		height: 100%;
	}
	.about-content {
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		position: relative;
	}
	.about-description {
		max-width: 45rem;
		visibility: hidden;
		opacity: 0;
		position: absolute;
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
</style>

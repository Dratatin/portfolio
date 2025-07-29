<script lang="ts">
	import relaxed from "$assets/relaxed.jpg";
	import pro from "$assets/pro.jpg";
	import cat from "$assets/cat.jpg";
	import texture from "$assets/textures/cloud.png";
	import gsap from "gsap";
	import ShaderTransition, { type ShaderTransitionInstance } from "$lib/utils/shaderTransition";
	import { SplitText } from "gsap/SplitText";
	import type SplitTextType from "gsap/SplitText";
	import { ScrollTrigger } from "gsap/ScrollTrigger";
	import { onMount } from "svelte";

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
			description: `Salut ! Bienvenue sur mon portfolio. Je suis développeur front-end, passionné par le design d’interaction et les animations web. J’aime créer des interfaces fluides, vivantes, et bien pensées.`,
			img: relaxed
		},
		{
			id: "recruiters",
			type: "recruteurs",
			description: `Je crée des expériences web innovantes qui captent l’attention. Avec 2 ans d’expérience en agence, mener plusieurs projets de front ne m’empêche jamais de le faire avec passion et précision.`,
			img: pro
		},
		{
			id: "friends",
			type: "amis",
			description: `Toujours partant pour des projets qui bougent ! J’apporte ma bonne humeur, ma rigueur et mon sens du détails pour créer des interfaces qui ont du peps.`,
			img: cat
		}
	];

	function animeText(text: Element[]) {
		gsap.from(text, {
			yPercent: 150,
			opacity: 0,
			duration: 0.5,
			ease: "cubic.out(1.5)",
			stagger: 0.03
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
	onMount(async () => {
		gsap.registerPlugin(ScrollTrigger, SplitText);
		await document.fonts.ready; //Need to fully load font before use splitText

		descriptions.forEach((description, index) => {
			splitTexts[index] = SplitText.create(description, {
				type: "words, lines"
			});
		});

		if (splitTexts.length > 0) {
			animeText(splitTexts[0].lines);
		}
	});

	onMount(() => {
		buttonOrder = [...buttons];

		myAnimation = new ShaderTransition({
			parent: shaderContainer,
			intensity: 0.3,
			images: [relaxed, cat, pro],
			initialIndex: 0,
			displacementImage: texture,
			imagesRatio: 1200 / 800
		});
	});
</script>

<div class="about page">
	<div class="profile-wrapper">
		<div class="profile-picture-wrapper" bind:this={shaderContainer}></div>
		<div class="profile-btns">
			{#each aboutContents as content, index (index)}
				<button
					class="about-button interactive-btn-font {index === 0 ? 'active' : ''}"
					style:transform="translateX({100 * index}%)"
					style:left="{-100 * index}%"
					bind:this={buttons[index]}
					onclick={() => handleButtonClick(buttons[index], index)}
				>
					{content.type}
				</button>
			{/each}
		</div>
	</div>
	<div class="about-content">
		{#each aboutContents as content, index (index)}
			<p
				class="about-description container-padding {index === 0 ? 'active' : ''}"
				bind:this={descriptions[index]}
			>
				{content.description}
			</p>
		{/each}
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
		width: 50%;
		max-width: 36rem;
		min-width: 22rem;
		visibility: hidden;
		opacity: 0;
		position: absolute;
	}
	.about-description.active {
		display: block;
		visibility: visible;
		opacity: 1;
		position: static;
	}
	.profile-btns {
		display: grid;
		grid-auto-flow: column;
		position: absolute;
		top: 10%;
		left: calc(100% + 1px);
		transform: translateX(calc(-100% / 3));
		z-index: 2;
	}
	.about-button {
		text-orientation: mixed;
		writing-mode: vertical-rl;
		padding: 3rem 0.75rem;
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

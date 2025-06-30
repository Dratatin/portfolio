<script lang="ts">
	import relaxed from "$assets/relaxed.jpg";
	import pro from "$assets/pro.jpg";
	import cat from "$assets/cat.jpg";
	import gsap from "gsap";
	import { SplitText } from "gsap/SplitText";
	import type SplitTextType from "gsap/SplitText";
	import { ScrollTrigger } from "gsap/ScrollTrigger";
	import { onMount } from "svelte";

	let buttons: HTMLButtonElement[] = [];
	let buttonOrder: HTMLButtonElement[] = [];
	let descriptions: HTMLElement[] = [];
	let profilePictures: HTMLElement[] = [];
	let profilePicturesOrder: HTMLElement[] = [];
	let splitTexts: SplitTextType[] = [];
	let isAnimating = false;
	let isHovering = false;

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

	function animeText(words: Element[]) {
		gsap.from(words, {
			yPercent: 20,
			rotate: 1,
			opacity: 0,
			duration: 0.5,
			ease: "power2.out",
			stagger: 0.06
		});
	}

	function animeProfilePicture(profilePicturesOrder: HTMLElement[], index: number) {
		gsap.to(profilePicturesOrder[index], {
			translateX: "50%",
			ease: "power2.out",
			duration: 0.3,
			onComplete: () => {
				const previousActiveElm = profilePicturesOrder.find((picture) =>
					picture.classList.contains("active")
				);
				if (previousActiveElm) {
					const previousActiveElmStyle = window.getComputedStyle(previousActiveElm);
					const previousZindex = parseInt(previousActiveElmStyle.zIndex);
					gsap.set(profilePicturesOrder[index], {
						zIndex: previousZindex + 1
					});
					gsap.to(profilePicturesOrder[index], {
						translateX: `0`,
						ease: "power2.out",
						duration: 0.3
					});

					profilePicturesOrder.forEach((picture) => {
						picture.classList.remove("active");
					});
					profilePicturesOrder[index].classList.add("active");
				}
			}
		});
	}

	function handleButtonMouseEnter() {
		buttonOrder.forEach((button, index) => {
			const translateValue =
				button.getBoundingClientRect().right - profilePicturesOrder[index].offsetWidth;
			gsap.to(profilePicturesOrder[index], {
				translateX: translateValue,
				duration: 0.3,
				ease: "power2.out"
			});
		});
		isHovering = true;
	}

	function resetPicturePosition() {
		buttonOrder.forEach((_, index) => {
			gsap.to(profilePicturesOrder[index], {
				translateX: 0,
				duration: 0.3,
				ease: "power2.out"
			});
		});
		isHovering = false;
	}

	function handleButtonClick(selectedButton: HTMLButtonElement, index: number) {
		const clickedIndex = buttonOrder.indexOf(selectedButton);
		if (clickedIndex === 0) return;

		const newOrder = [...buttonOrder];
		const newPictureOrder = [...profilePicturesOrder];

		resetPicturePosition();
		animeProfilePicture(profilePicturesOrder, clickedIndex);

		const swap = <T,>(arr: T[], i: number, j: number) => {
			[arr[i], arr[j]] = [arr[j], arr[i]];
		};

		if (clickedIndex === 2) {
			const [lastButton] = newOrder.splice(2, 1);
			const [lastPicture] = newPictureOrder.splice(2, 1);
			newOrder.unshift(lastButton);
			newPictureOrder.unshift(lastPicture);
		} else if (clickedIndex === 1) {
			swap(newOrder, 0, 1);
			swap(newPictureOrder, 0, 1);
		}

		newOrder.forEach((button, i) => {
			button.classList.remove("active");

			gsap.to(button, {
				duration: 0.6,
				translateX: `${i * 100}%`,
				ease: "power2.out",
				onStart: () => {
					isAnimating = true;
				},
				onComplete: () => {
					isAnimating = false;
				}
			});
		});

		newOrder[0].classList.add("active");
		buttonOrder = newOrder;
		profilePicturesOrder = newPictureOrder;

		const previousActiveIndex = descriptions.findIndex((d) => d.classList.contains("active"));
		const previousDescription = descriptions[previousActiveIndex];
		const newDescription = descriptions[index];

		gsap.to(previousDescription, {
			translateX: "60%",
			opacity: 0,
			duration: 0.3,
			ease: "power2.out",
			onComplete: () => {
				gsap.set(previousDescription, { clearProps: true });
				newDescription.classList.add("active");
				previousDescription.classList.remove("active");
				animeText(splitTexts[index].words);
			}
		});
	}

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger, SplitText);

		descriptions.forEach((description, index) => {
			splitTexts[index] = SplitText.create(description, {
				type: "words"
			});
		});

		if (splitTexts.length > 0) {
			gsap.timeline({
				scrollTrigger: {
					trigger: descriptions[0],
					once: true,
					start: "top bottom",
					toggleActions: "play none none none",
					onEnter: () => animeText(splitTexts[0].words)
				}
			});
		}

		buttonOrder = [...buttons];
		profilePicturesOrder = [...profilePictures];
	});
</script>

<div class="about-container">
	<div class="profile-wrapper">
		<div class="profile-picture-wrapper">
			{#each aboutContents as content, index (index)}
				<img
					class="profile-picture {index === 0 ? 'active' : ''}"
					src={content.img}
					alt="moi"
					loading="lazy"
					bind:this={profilePictures[index]}
					style="z-index:{aboutContents.length - index}"
				/>
			{/each}
		</div>

		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			class="profile-btns"
			onmouseleave={() => {
				if (!isAnimating) {
					resetPicturePosition();
				}
			}}
			onmouseenter={() => {
				if (!isAnimating && !isHovering) {
					handleButtonMouseEnter();
				}
			}}
		>
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
			<p class="about-description {index === 0 ? 'active' : ''}" bind:this={descriptions[index]}>
				{content.description}
			</p>
		{/each}
	</div>
</div>

<style>
	.about-container {
		height: 100svh;
		display: flex;
		overflow: hidden;
	}
	.profile-wrapper {
		width: 33%;
		height: 100%;
		min-width: 27rem;
		position: relative;
		flex: none;
	}
	.profile-picture-wrapper {
		width: 100%;
		height: 100%;
		position: relative;
		z-index: 1;
	}
	.profile-picture {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-right: 2px solid var(--color-black);
	}
	.about-content {
		max-width: 29rem;
		min-width: 22rem;
		width: 30%;
		margin: auto;
		display: flex;
		flex-direction: column;
		position: relative;
	}
	.about-description {
		display: none;
		width: 100%;
		opacity: 0;
		visibility: hidden;
	}
	.about-description.active {
		display: block;
		visibility: visible;
		opacity: 1;
	}
	.profile-btns {
		display: grid;
		grid-auto-flow: column;
		position: absolute;
		top: 10%;
		left: 100%;
		transform: translateX(calc(-100% / 3));
		z-index: 2;
	}
	.about-button {
		text-orientation: mixed;
		writing-mode: vertical-rl;
		padding: 3rem 0.75rem;
		outline: 2px solid var(--color-black);
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
	:global(.with-cursor) {
		position: relative;
	}

	:global(.with-cursor::after) {
		content: "|";
		position: absolute;
		right: -5px;
		top: 0;
		display: block;
		animation: blink 0.8s steps(1) infinite;
		color: currentColor;
	}

	@keyframes blink {
		0%,
		50% {
			opacity: 1;
		}
		51%,
		100% {
			opacity: 0;
		}
	}
</style>

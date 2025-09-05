<script lang="ts">
	import { onMount } from "svelte";
	import gsap from "gsap";
	import { avatarEmotion } from "$lib/stores/store";

	let avatarEl: HTMLDivElement;

	function handleMouseMove(e: MouseEvent) {
		let x = (e.clientX / window.innerWidth - 0.5) * 4;
		let y = (e.clientY / window.innerHeight - 0.5) * 4;
		gsap.to(".pupil", {
			x: x,
			y: y,
			duration: 0.2
		});
	}

	function handleMouseEnter() {
		avatarEmotion.set("angry");
	}

	function handleMouseLeave() {
		avatarEmotion.set("normal");
	}

	onMount(() => {
		gsap.defaults({ overwrite: "auto" });

		let unsubscribe: () => void;

		const context = gsap.context(() => {
			const floatingEyeBrowTimeline = gsap
				.timeline({ paused: true })
				.to(".eyebrow", { y: -2, repeat: -1, yoyo: true, duration: 1.5, ease: "sine.inOut" })
				.play();

			document.addEventListener("mousemove", handleMouseMove);

			unsubscribe = avatarEmotion.subscribe((emotion) => {
				switch (emotion) {
					case "normal":
						gsap.to(".top-eyelid", { yPercent: 0, duration: 0.3, ease: "back.out" });
						gsap.to(".bottom-eyelid", { yPercent: 0, duration: 0.3, ease: "back.out" });
						gsap.to(".avatar-right .eyebrow", {
							rotate: 10,
							yPercent: 0,
							duration: 0.2,
							ease: "power.out"
						});
						gsap.to(".avatar-left .eyebrow", {
							rotate: -10,
							yPercent: 0,
							duration: 0.2,
							ease: "power.out"
						});
						floatingEyeBrowTimeline.play();
						break;
					case "angry":
						gsap.to(".top-eyelid", { yPercent: 40, duration: 0.3, ease: "back.out" });
						gsap.to(".bottom-eyelid", { yPercent: -20, duration: 0.3, ease: "back.out" });
						gsap.to(".avatar-right .eyebrow", {
							rotate: -10,
							yPercent: 0,
							duration: 0.2,
							ease: "power.out"
						});
						gsap.to(".avatar-left .eyebrow", {
							rotate: 10,
							yPercent: 0,
							duration: 0.2,
							ease: "power.out"
						});
						floatingEyeBrowTimeline.pause();
						break;
					case "happy":
						gsap.to(".bottom-eyelid", { yPercent: -20, duration: 0.3, ease: "back.out" });
						gsap.to(".avatar-right .eyebrow", { rotate: 20, duration: 0.2, ease: "power.out" });
						gsap.to(".avatar-left .eyebrow", { rotate: -20, duration: 0.2, ease: "power.out" });
						floatingEyeBrowTimeline.pause();
						break;
					default:
						gsap.to(".top-eyelid", { yPercent: 0, duration: 0.3, ease: "back.out" });
						gsap.to(".bottom-eyelid", { yPercent: 0, duration: 0.3, ease: "back.out" });
						gsap.to(".avatar-right .eyebrow", {
							rotate: 10,
							yPercent: 0,
							duration: 0.2,
							ease: "power.out"
						});
						gsap.to(".avatar-left .eyebrow", {
							rotate: -10,
							yPercent: 0,
							duration: 0.2,
							ease: "power.out"
						});
						floatingEyeBrowTimeline.play();
				}
			});
		}, avatarEl);

		return () => {
			document.removeEventListener("mousemove", handleMouseMove);
			context.revert();
			if (unsubscribe) unsubscribe();
		};
	});
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	bind:this={avatarEl}
	class="avatar"
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}
>
	<div class="avatar-wrapper">
		<div class="avatar-left">
			<div class="eyebrow"></div>
			<div class="eye">
				<div class="top-eyelid"></div>
				<div class="pupil"></div>
				<div class="bottom-eyelid"></div>
			</div>
		</div>
		<div class="avatar-right">
			<div class="eyebrow"></div>
			<div class="eye">
				<div class="top-eyelid"></div>
				<div class="pupil"></div>
				<div class="bottom-eyelid"></div>
			</div>
		</div>
	</div>
</div>

<style>
	.avatar {
		background-color: var(--color-white);
		aspect-ratio: 1/1;
		width: 100%;
	}
	.avatar-wrapper {
		position: relative;
		height: 100%;
		width: 100%;
	}
	.avatar-right,
	.avatar-left {
		height: 100%;
		width: 60%;
		position: absolute;
		top: 0;
		display: flex;
		flex-direction: column;
		gap: 8%;
	}
	.avatar-left {
		left: 0;
		z-index: 5;
	}
	.avatar-right {
		right: 0;
		z-index: 10;
	}
	.eyebrow {
		height: 17%;
		width: 75%;
		background-color: var(--color-black);
		border-radius: 999px;
	}
	.avatar-right .eyebrow {
		margin-left: auto;
		transform: rotate(10deg);
	}
	.avatar-left .eyebrow {
		transform: rotate(-10deg);
	}
	.eye {
		height: 75%;
		background-color: var(--color-white);
		border: 3px solid var(--color-black);
		border-radius: 999px;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		overflow: hidden;
		position: relative;
	}
	.pupil {
		width: 72%;
		height: 70%;
		border-radius: 60%;
		background-color: var(--color-black);
		position: absolute;
		top: 25%;
	}
	.pupil::after {
		content: "";
		display: inline-block;
		height: 0;
		width: 0;
		border-top: 4px solid transparent;
		border-right: 7px solid var(--color-white);
		border-bottom: 4px solid transparent;
		position: absolute;
		bottom: 5%;
		right: 0;
		transform: rotate(35deg);
	}
	.top-eyelid {
		border: 3px solid var(--color-black);
		background-color: var(--color-white);
		position: absolute;
		top: -105%;
		left: -50%;
		width: 200%;
		height: 100%;
		z-index: 5;
	}
	.bottom-eyelid {
		border: 3px solid var(--color-black);
		background-color: var(--color-white);
		position: absolute;
		top: 105%;
		left: -50%;
		width: 200%;
		height: 150%;
		z-index: 5;
		border-radius: 100%;
	}
	.avatar-right .top-eyelid {
		transform: rotate(-8deg);
	}
	.avatar-left .top-eyelid {
		transform: rotate(12deg);
	}
</style>

<script lang="ts">
	import { onMount } from "svelte";
	import gsap from "gsap";
	import { ScrollTrigger } from "gsap/ScrollTrigger";
	import LazyImage from "$lib/components/LazyImage.svelte";
	import SectionTitle from "$lib/components/SectionTitle.svelte";
	import project1 from "../../assets/project-1.jpg";

	const projects = [
		{
			title: "Kerialis",
			intro:
				"Etiam euismod scelerisque lorem eu feugiat. Nulla vel felis a tortor luctus hendrerit at a metus. Nulla facilisi. Sed volutpat auctor varius. Curabitur sit amet lectus vel nibh viverra varius eget et lectus. Etiam vulputate arcu non nibh dignissim, eget varius odio consequat.",
			img: project1
		},
		{
			title: "Fidesio",
			intro:
				"Etiam euismod scelerisque lorem eu feugiat. Nulla vel felis a tortor luctus hendrerit at a metus. Nulla facilisi. Sed volutpat auctor varius. Curabitur sit amet lectus vel nibh viverra varius eget et lectus. Etiam vulputate arcu non nibh dignissim, eget varius odio consequat.",
			img: project1
		},
		{
			title: "blabla",
			intro:
				"Etiam euismod scelerisque lorem eu feugiat. Nulla vel felis a tortor luctus hendrerit at a metus. Nulla facilisi. Sed volutpat auctor varius. Curabitur sit amet lectus vel nibh viverra varius eget et lectus. Etiam vulputate arcu non nibh dignissim, eget varius odio consequat.",
			img: project1
		}
	];

	let projectContainerRef: HTMLElement;
	let projectListRefs: HTMLElement[] = [];
	let projectTitleRefs: HTMLElement[] = [];
	let projectDescriptionRefs: HTMLElement[] = [];

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		let scrollTween = gsap.to(projectListRefs, {
			x: -projectContainerRef.offsetWidth + projectListRefs[0].offsetWidth,
			ease: "none", // <-- IMPORTANT!
			scrollTrigger: {
				trigger: ".project-container",
				pin: true,
				scrub: 1,
				end: "+=3000"
			}
		});

		projectListRefs.forEach((item, index) => {
			let timeline = gsap.timeline({
				scrollTrigger: {
					trigger: item,
					containerAnimation: scrollTween,
					start: "left 30%",
					toggleActions: "play none none reverse"
				}
			});

			timeline.from(projectTitleRefs[index], { alpha: 0 }, 0);
			timeline.from(projectDescriptionRefs[index], { alpha: 0 }, 0);
		});
	});
</script>

<div class="project-container">
	<div class="wrapper-test">
		<div class="container-padding">
			<SectionTitle title="Liste des projets" />
		</div>
		<ul
			class="project-list"
			bind:this={projectContainerRef}
			style:width={`calc((${projects.length} * (100vw + 10vw)) + (50vw - 10vw))`}
		>
			{#each projects as project, index (index)}
				<li class="project-item" bind:this={projectListRefs[index]}>
					<LazyImage
						src={project.img}
						alt="My description"
						placeholder={project.img}
						width="980"
						height="749"
						fit="contain"
					/>
					<!-- <div class="project-img">
						<img src={project.img} />
					</div> -->
					<div class="project-description">
						<h3 class="project-title" bind:this={projectTitleRefs[index]}>
							{project.title}
						</h3>
						<p bind:this={projectDescriptionRefs[index]}>
							{project.intro}
						</p>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</div>

<style>
	.wrapper-test {
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.project-container {
		display: flex;
		flex-direction: column;
		height: 100vh;
	}
	.project-list {
		height: 100%;
		display: flex;
		flex-wrap: nowrap;
		overflow: hidden;
	}
	.project-item {
		padding: 4rem;
		width: 100vw;
		display: flex;
		flex-shrink: 0;
		gap: 2rem;
		margin-left: 10vw;
	}
	.project-item:first-child {
		margin-left: 50vw;
	}
	.project-description {
		min-width: 20rem;
		max-width: 30rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		flex: 1;
	}
	.project-title {
		text-transform: uppercase;
		font-size: 5rem;
		font-weight: 800;
		transform: translate(-50%);
		background-color: var(--color-black);
		color: var(--color-white);
		margin-bottom: 3rem;
		padding: 1rem;
		line-height: 1;
	}
</style>

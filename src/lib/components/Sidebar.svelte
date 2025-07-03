<script lang="ts">
	import { onMount } from "svelte";
	import * as THREE from "three";
	import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
	import gsap from "gsap";

	let canvasElement: HTMLCanvasElement | null = null;
	let morphMesh: THREE.Object3D<THREE.Object3DEventMap>;

	function animateMorph(number: number) {
		if (morphMesh instanceof THREE.Mesh && morphMesh.morphTargetInfluences) {
			const influences = morphMesh.morphTargetInfluences;
			gsap.to(influences, { [0]: 0, duration: 0.6, ease: "power2.out" });
			gsap.to(influences, { [1]: 0, duration: 0.6, ease: "power2.out" });
			gsap.to(influences, { [2]: 0, duration: 0.6, ease: "power2.out" });
			if (number !== -1) {
				gsap.to(influences, { [number]: 1, duration: 0.6, ease: "power2.out" });
			}
		}
	}

	onMount(() => {
		let scene: THREE.Scene;
		let camera: THREE.PerspectiveCamera;
		let renderer: THREE.WebGLRenderer;

		if (canvasElement) {
			const canvasWidth = canvasElement.offsetWidth;
			const canvasHeight = canvasElement.clientHeight;

			scene = new THREE.Scene();
			camera = new THREE.PerspectiveCamera(65, canvasWidth / canvasHeight, 1, 1000);
			camera.position.z = 5;

			renderer = new THREE.WebGLRenderer({
				canvas: canvasElement,
				antialias: true,
				alpha: true
			});
			renderer.setPixelRatio(window.devicePixelRatio);
			renderer.setSize(canvasWidth, canvasHeight);

			const loader = new GLTFLoader();
			loader.load("/shapes.glb", (gltf) => {
				gltf.scene.traverse((child) => {
					morphMesh = child;
					if (child instanceof THREE.Mesh) {
						child.material = new THREE.MeshBasicMaterial({
							color: 0x1a1a1a,
							wireframe: true
						});
						scene.add(child);
					}
				});
				renderer.render(scene, camera);
			});

			const renderLoop = () => {
				requestAnimationFrame(renderLoop);
				scene.rotation.y += 0.003;
				scene.rotation.x += 0.003;
				renderer.render(scene, camera);
			};

			window.addEventListener("resize", () => {
				if (!canvasElement) return;
				camera.aspect = canvasElement.clientWidth / canvasElement.clientHeight;
				camera.updateProjectionMatrix();
				renderer.setSize(canvasElement.clientWidth, canvasElement.clientHeight);
			});

			renderLoop();
			animateMorph(1);
		}
	});
</script>

<div class="sidebar">
	<ul class="link-list">
		<li class="link-item">
			<canvas class="sidebar-canvas" bind:this={canvasElement}></canvas>
		</li>
		<li class="link-item">
			<a href="/" download="" class="sidebar-link interactive-btn-font"> CV </a>
		</li>
		<li class="link-item">
			<a href="/" download="" class="sidebar-link interactive-btn-font" aria-label="Mon github">
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
		</li>
		<li class="link-item">
			<a href="/" download="" class="sidebar-link interactive-btn-font"> in </a>
		</li>
	</ul>
</div>

<style>
	.link-list {
		display: flex;
		flex-direction: column;
	}
	.sidebar {
		background-color: var(--color-black);
		border-top: 2px solid var(--color-black);
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
	.sidebar-canvas,
	.sidebar-link {
		background-color: var(--color-white);
		border-bottom: 2px solid var(--color-black);
		border-left: 2px solid var(--color-black);
		border-right: 2px solid var(--color-black);
		width: var(--side-content-size);
		height: var(--side-content-size);
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}
</style>

import * as THREE from "three";
import { gsap } from "gsap";

export interface ShaderTransitionOptions {
	parent: HTMLElement;
	displacementImage: string;
	images: string[];
	imagesRatio?: number;
	intensity?: number;
	intensity1?: number;
	intensity2?: number;
	angle?: number;
	angle1?: number;
	angle2?: number;
	speed?: number;
	speedIn?: number;
	speedOut?: number;
	easing?: string;
	video?: boolean;
	initialIndex?: number;
}

export interface ShaderTransitionMethods {
	swap(targetIndex: number): Promise<void>;
	next(): Promise<void>;
	previous(): Promise<void>;
	getCurrentIndex(): number;
	getTotalImages(): number;
	getImageSrc(index: number): string | null;
	isCurrentlyTransitioning(): boolean;
	destroy(): void;
}

export type ShaderTransitionInstance = ShaderTransitionMethods;

export class ShaderTransition {
	private scene!: THREE.Scene;
	private camera!: THREE.OrthographicCamera;
	private renderer!: THREE.WebGLRenderer;
	private material!: THREE.ShaderMaterial;
	private geometry!: THREE.PlaneGeometry;
	private mesh!: THREE.Mesh;
	private parent!: HTMLElement;
	private options!: Required<ShaderTransitionOptions>;
	private textures: THREE.Texture[] = [];
	private currentIndex: number = 0;
	private targetIndex: number = 0;
	private isTransitioning: boolean = false;

	constructor(options: ShaderTransitionOptions) {
		if (!options.parent) {
			console.warn("Parent missing");
			return;
		}

		if (!options.images || options.images.length < 2 || !options.displacementImage) {
			console.warn("At least 2 images and displacement image are required");
			return;
		}

		this.parent = options.parent;
		this.options = this.setDefaultOptions(options);
		this.currentIndex = this.options.initialIndex;
		this.targetIndex = this.currentIndex;

		console.log(this.parent.offsetWidth, this.parent.offsetHeight);

		this.init();
		this.setupEventListeners();
	}

	private setDefaultOptions(options: ShaderTransitionOptions): Required<ShaderTransitionOptions> {
		const defaultAngle = Math.PI / 4;

		return {
			parent: options.parent,
			displacementImage: options.displacementImage,
			images: options.images,
			imagesRatio: options.imagesRatio ?? 1,
			intensity: options.intensity ?? 1,
			intensity1: options.intensity1 ?? options.intensity ?? 1,
			intensity2: options.intensity2 ?? options.intensity ?? 1,
			angle: options.angle ?? defaultAngle,
			angle1: options.angle1 ?? options.angle ?? defaultAngle,
			angle2: options.angle2 ?? 3 * -(options.angle ?? defaultAngle),
			speed: options.speed ?? 1.6,
			speedIn: options.speedIn ?? options.speed ?? 1.6,
			speedOut: options.speedOut ?? options.speed ?? 1.2,
			easing: options.easing ?? "expo.out",
			video: options.video ?? false,
			initialIndex: Math.max(0, Math.min(options.initialIndex ?? 0, options.images.length - 1))
		};
	}

	private init(): void {
		this.createScene();
		this.createCamera();
		this.createRenderer();
		this.loadTextures();
	}

	private createScene(): void {
		this.scene = new THREE.Scene();
	}

	private createCamera(): void {
		const { offsetWidth, offsetHeight } = this.parent;

		this.camera = new THREE.OrthographicCamera(
			offsetWidth / -2,
			offsetWidth / 2,
			offsetHeight / 2,
			offsetHeight / -2,
			1,
			1000
		);

		this.camera.position.z = 1;
	}

	private createRenderer(): void {
		this.renderer = new THREE.WebGLRenderer({
			antialias: false,
			alpha: true
		});

		this.renderer.setPixelRatio(2);
		this.renderer.setClearColor(0xffffff, 0);
		const { width, height } = this.parent.getBoundingClientRect();
		this.renderer.setSize(width, height);

		this.parent.appendChild(this.renderer.domElement);
	}

	private render = (): void => {
		this.renderer.render(this.scene, this.camera);
	};

	private async loadTextures(): Promise<void> {
		const loader = new THREE.TextureLoader();
		loader.crossOrigin = "";

		try {
			const displacementTexture = await this.loadTexture(loader, this.options.displacementImage);
			displacementTexture.magFilter = displacementTexture.minFilter = THREE.LinearFilter;

			if (this.options.video) {
				this.textures = await this.loadVideoTextures();
				this.startVideoLoop();
			} else {
				const texturePromises = this.options.images.map((imageSrc) =>
					this.loadTexture(loader, imageSrc)
				);

				this.textures = await Promise.all(texturePromises);

				this.textures.forEach((texture) => {
					texture.magFilter = texture.minFilter = THREE.LinearFilter;
				});
			}

			this.createMaterial(displacementTexture);
			this.createMesh();
			this.render();
		} catch (error) {
			console.error("Error loading textures:", error);
		}
	}

	private loadTexture(loader: THREE.TextureLoader, url: string): Promise<THREE.Texture> {
		return new Promise((resolve, reject) => {
			loader.load(
				url,
				(texture) => {
					resolve(texture);
					this.render();
				},
				undefined,
				reject
			);
		});
	}

	private async loadVideoTextures(): Promise<THREE.VideoTexture[]> {
		const videos: HTMLVideoElement[] = [];
		const textures: THREE.VideoTexture[] = [];

		for (let i = 0; i < this.options.images.length; i++) {
			const video = document.createElement("video");
			video.autoplay = true;
			video.loop = true;
			video.muted = true;
			video.src = this.options.images[i];
			video.load();
			videos.push(video);
		}

		await Promise.all(videos.map((video) => this.waitForVideoLoad(video)));

		videos.forEach((video) => {
			const texture = new THREE.VideoTexture(video);
			texture.magFilter = texture.minFilter = THREE.LinearFilter;
			textures.push(texture);
		});

		return textures;
	}

	private waitForVideoLoad(video: HTMLVideoElement): Promise<void> {
		return new Promise((resolve) => {
			video.addEventListener(
				"loadeddata",
				() => {
					video.play();
					resolve();
				},
				false
			);
		});
	}

	private startVideoLoop(): void {
		const animate = (): void => {
			requestAnimationFrame(animate);
			this.renderer.render(this.scene, this.camera);
		};
		animate();
	}

	private createMaterial(displacementTexture: THREE.Texture): void {
		const { offsetWidth, offsetHeight } = this.parent;
		const ratio = this.options.imagesRatio;

		let scaleX: number, scaleY: number;

		if (offsetHeight / offsetWidth < ratio) {
			scaleX = 1;
			scaleY = offsetHeight / offsetWidth / ratio;
		} else {
			scaleX = (offsetWidth / offsetHeight) * ratio;
			scaleY = 1;
		}

		this.material = new THREE.ShaderMaterial({
			uniforms: {
				intensity1: { value: this.options.intensity1 },
				intensity2: { value: this.options.intensity2 },
				dispFactor: { value: 0 },
				angle1: { value: this.options.angle1 },
				angle2: { value: this.options.angle2 },
				texture1: { value: this.textures[this.currentIndex] || null },
				texture2: { value: this.textures[this.targetIndex] || null },
				disp: { value: displacementTexture },
				res: { value: new THREE.Vector4(offsetWidth, offsetHeight, scaleX, scaleY) },
				dpr: { value: window.devicePixelRatio }
			},
			vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
      `,
			fragmentShader: `
        varying vec2 vUv;

        uniform float dispFactor;
        uniform float dpr;
        uniform sampler2D disp;

        uniform sampler2D texture1;
        uniform sampler2D texture2;
        uniform float angle1;
        uniform float angle2;
        uniform float intensity1;
        uniform float intensity2;
        uniform vec4 res;
        uniform vec2 parent;

        mat2 getRotM(float angle) {
          float s = sin(angle);
          float c = cos(angle);
          return mat2(c, -s, s, c);
        }

        void main() {
          vec4 disp = texture2D(disp, vUv);
          vec2 dispVec = vec2(disp.r, disp.g);

          vec2 uv = 0.5 * gl_FragCoord.xy / (res.xy);
          vec2 myUV = (uv - vec2(0.5)) * res.zw + vec2(0.5);

          vec2 distortedPosition1 = myUV + getRotM(angle1) * dispVec * intensity1 * dispFactor;
          vec2 distortedPosition2 = myUV + getRotM(angle2) * dispVec * intensity2 * (1.0 - dispFactor);
          vec4 _texture1 = texture2D(texture1, distortedPosition1);
          vec4 _texture2 = texture2D(texture2, distortedPosition2);
          gl_FragColor = mix(_texture1, _texture2, dispFactor);
        }
      `,
			transparent: true,
			opacity: 1
		});
	}

	private createMesh(): void {
		this.geometry = new THREE.PlaneGeometry(this.parent.offsetWidth, this.parent.offsetHeight, 1);

		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.scene.add(this.mesh);
	}

	private setupEventListeners(): void {
		window.addEventListener("resize", this.handleResize);
	}

	private handleResize = (): void => {
		const { offsetWidth, offsetHeight } = this.parent;
		const ratio = this.options.imagesRatio;

		let scaleX: number, scaleY: number;

		if (offsetHeight / offsetWidth < ratio) {
			scaleX = 1;
			scaleY = offsetHeight / offsetWidth / ratio;
		} else {
			scaleX = (offsetWidth / offsetHeight) * ratio;
			scaleY = 1;
		}

		if (this.material) {
			this.material.uniforms.res.value = new THREE.Vector4(
				offsetWidth,
				offsetHeight,
				scaleX,
				scaleY
			);
		}

		this.renderer.setSize(offsetWidth, offsetHeight);
		this.render();
	};

	public swap = (targetIndex: number): Promise<void> => {
		return new Promise((resolve, reject) => {
			if (targetIndex < 0 || targetIndex >= this.textures.length) {
				reject(
					new Error(
						`Index ${targetIndex} is out of bounds. Valid range: 0-${this.textures.length - 1}`
					)
				);
				return;
			}

			if (targetIndex === this.currentIndex || this.isTransitioning) {
				resolve();
				return;
			}

			if (!this.material) {
				reject(new Error("Material not initialized"));
				return;
			}

			this.isTransitioning = true;
			this.targetIndex = targetIndex;

			this.material.uniforms.texture1.value = this.textures[this.currentIndex];
			this.material.uniforms.texture2.value = this.textures[this.targetIndex];

			this.material.uniforms.dispFactor.value = 0;

			gsap.to(this.material.uniforms.dispFactor, {
				duration: this.options.speedIn,
				value: 1,
				ease: this.options.easing,
				onUpdate: this.render,
				onComplete: () => {
					this.currentIndex = this.targetIndex;
					this.material.uniforms.dispFactor.value = 0;
					this.material.uniforms.texture1.value = this.textures[this.currentIndex];

					this.isTransitioning = false;
					this.render();
					resolve();
				}
			});
		});
	};

	public next = (): Promise<void> => {
		const nextIndex = (this.currentIndex + 1) % this.textures.length;
		return this.swap(nextIndex);
	};

	public previous = (): Promise<void> => {
		const prevIndex = (this.currentIndex - 1 + this.textures.length) % this.textures.length;
		return this.swap(prevIndex);
	};

	public getCurrentIndex(): number {
		return this.currentIndex;
	}

	public getTotalImages(): number {
		return this.textures.length;
	}

	public getImageSrc(index: number): string | null {
		if (index >= 0 && index < this.options.images.length) {
			return this.options.images[index];
		}
		return null;
	}

	public isCurrentlyTransitioning(): boolean {
		return this.isTransitioning;
	}

	public destroy(): void {
		window.removeEventListener("resize", this.handleResize);

		if (this.renderer) {
			this.renderer.dispose();
			if (this.renderer.domElement.parentNode) {
				this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
			}
		}

		if (this.material) {
			this.material.dispose();
		}

		if (this.geometry) {
			this.geometry.dispose();
		}

		this.textures.forEach((texture) => {
			if (texture.dispose) {
				texture.dispose();
			}
		});

		this.textures = [];
	}
}

export default ShaderTransition;

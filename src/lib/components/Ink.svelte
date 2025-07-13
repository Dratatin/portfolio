<script lang="ts">
    import gsap from "gsap";
    import { hoveredElement } from "$lib/stores/cursor";
    let { name, active = false } : { name: string, active?: boolean} = $props();

    let hookRef: HTMLElement;
    let inkElem: HTMLElement;

    function onMouseEnter() {
        hoveredElement.set(hookRef);
	}

	function onMouseLeave() {
		hoveredElement.set(null);
	}

</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div 
    class="ink"
    class:inkActive={active === true} 
    onmouseenter={onMouseEnter}
    onmouseleave={onMouseLeave}
    bind:this={inkElem}
>
    <div class="ink-hook-wrapper">
        <div class="left-bracket"></div>
        <span class="ink-hook" bind:this={hookRef}></span>
        <div class="right-bracket"></div>
    </div>
    <span class="ink-text text-sm">{name}</span>
</div>

<style>
    .ink {
		display: flex;
		gap: 0.5rem;
		padding: 0.4rem 0.5rem;
		align-items: center;
		background: linear-gradient(
			var(--color-white),
			var(--color-white) 50%,
			var(--color-black) 50%,
			var(--color-black)
		);
		background-size: 100% 200%;
		transition: background 0.3s cubic-bezier(0, 1, 0.65, 1);
	}
	.ink-hook-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.ink .left-bracket,
	.ink .right-bracket {
		content: "";
		display: block;
		width: 0.35rem;
		height: 1rem;
		border-top: var(--border-weight) solid var(--color-white);
		border-bottom: var(--border-weight) solid var(--color-white);
		mix-blend-mode: difference;
        transition: transform 0.2s cubic-bezier(0, 1, 0.65, 1);
	}
	.ink .left-bracket {
		border-left: var(--border-weight) solid var(--color-white);
	}
	.ink .right-bracket {
		border-right: var(--border-weight) solid var(--color-white);
	}
	.ink-hook {
		width: 0.5rem;
		height: 0.5rem;
		margin: 0 0.4rem;
		display: block;
	}
	.ink:hover {
		background-position: 100% 100%;
		color: var(--color-white);
	}
    .ink.inkActive .ink-hook {
        background-color: var(--color-black);
    }
    .ink.inkActive .left-bracket {
        transform: translateX(5px);
    }
    .ink.inkActive .right-bracket {
        transform: translateX(-5px);
    }
</style>
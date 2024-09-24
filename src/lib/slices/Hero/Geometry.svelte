<script lang="ts">
	import { T as Threlte } from '@threlte/core';
	import { Float, createTransition } from '@threlte/extras';
	import * as Three from 'three';
	import gsap from 'gsap';
	import { elasticOut } from 'svelte/easing';

	export let position: [number, number, number] = [0, 0, 0];
	export let geometry: Three.BufferGeometry = new Three.IcosahedronGeometry(3);
	export let rate = 0.5;

	const soundEffects = [new Audio('/sounds/switch-hi.ogg'), new Audio('/sounds/switch-lo.ogg')];
	let visible = false;

	const materialParams = [
		{ color: 0x2ecc71, roughness: 0 },
		{ color: 0xf1c40f, roughness: 0.4 },
		{ color: 0xe74c3c, roughness: 0.1 },
		{ color: 0x8e44ad, roughness: 0.1 },
		{ color: 0x1abc9c, roughness: 0.1 },
		{ color: 0x2980b9, roughness: 0, metalness: 0.5 },
		{ color: 0x2c3e50, roughness: 0.1, metalness: 0.5 }
	];

	function getRandomMaterial() {
		return new Three.MeshStandardMaterial(gsap.utils.random(materialParams));
	}

	function handleClick(event: MouseEvent) {
		gsap.utils.random(soundEffects).play();
		if ('object' in event && event.object instanceof Three.Mesh) {
			gsap.to(event.object.rotation, {
				x: `+=${gsap.utils.random(0, 2)}`,
				y: `+=${gsap.utils.random(0, 2)}`,
				z: `+=${gsap.utils.random(0, 2)}`,
				duration: 2,
				ease: 'elastic.out(1,0.3)',
				yoyo: true
			});
			event.object.material = getRandomMaterial();
		}
	}

	const bounce = createTransition((ref) => {
		return {
			tick(t) {
				if (t > 0) visible = true;
				ref.scale.set(t, t, t);
			},
			easing: elasticOut,
			duration: gsap.utils.random(800, 1200),
			delay: gsap.utils.random(0, 500)
		};
	});
</script>

<Threlte.Group position={position.map((p) => p * 2)}>
	<Float
		speed={5 * rate}
		rotationSpeed={5 * rate}
		rotationIntensity={6 * rate}
		floatIntensity={5 * rate}
	>
		<Threlte.Mesh
			{geometry}
			material={getRandomMaterial()}
			{visible}
			in={bounce}
			interactive
			on:click={handleClick}
		></Threlte.Mesh>
	</Float>
</Threlte.Group>

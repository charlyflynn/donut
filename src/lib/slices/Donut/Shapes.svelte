<script lang="ts">
	import { T as Threlte } from '@threlte/core';
	import * as Three from 'three';
	import Geometry from './Geometry.svelte';
	import { ContactShadows, Environment, interactivity, transitions } from '@threlte/extras';
	import DiscoNut2 from './DiscoNut2.svelte';

	interactivity();
	transitions();
</script>

<Threlte.PerspectiveCamera
	makeDefault
	position={[0, 0, 25]}
	aspect={1}
	fov={30}
	near={1}
	far={40}
/>
<Threlte.DirectionalLight position={[0, 10, 30]}></Threlte.DirectionalLight>
<Environment files="smallroom.hdr" path="/" format="hdr" />
<ContactShadows position={[0, -3.5, 0]} opacity={0.65} scale={40} blur={1} far={9} />

<!-- Gem -->
<!-- <Geometry position={[0, 0, 0]} rate={0.3} geometry={new Three.IcosahedronGeometry(3)} /> -->
<!-- Pill -->
<!-- <Geometry
	position={[1, -0.75, 4]}
	rate={0.4}
	geometry={new Three.CapsuleGeometry(0.5, 1.6, 2, 16)}
/> -->
<!-- PanelBall -->
<!-- <Geometry position={[-1.4, 2, -4]} rate={0.6} geometry={new Three.DodecahedronGeometry(1.5)} /> -->
<!-- Donut -->
<!-- <Geometry
	position={[-0.8, -0.75, 5]}
	rate={0.5}
	geometry={new Three.TorusGeometry(0.6, 0.25, 16, 32)}
/> -->
<!-- Diamond -->
<!-- <Geometry position={[1.6, 1.6, -4]} rate={0.7} geometry={new Three.OctahedronGeometry(1.5)} /> -->

<!-- Gem -->
<!-- <Geometry position={[0, 0, 0]} rate={0.3} geometry={new Three.TorusGeometry(1, 0.5, 16, 32)} /> -->
<!-- Pill -->
<Geometry
	position={[1, -0.75, 4]}
	rate={0.4}
	geometry={new Three.TorusGeometry(1.3, 0.5, 16, 32)}
/>
<!-- PanelBall -->
<Geometry
	position={[-1.4, 2, -4]}
	rate={0.6}
	geometry={new Three.TorusGeometry(0.6, 0.25, 16, 32)}
/>
<!-- Donut -->
<Geometry
	position={[-0.8, -0.75, 5]}
	rate={0.5}
	geometry={new Three.TorusGeometry(0.6, 0.25, 16, 32)}
/>
<!-- Diamond -->
<Geometry
	position={[1.6, 1.6, -4]}
	rate={0.7}
	geometry={new Three.TorusGeometry(0.3, 0.2, 16, 32)}
/>
<DiscoNut2 />

<script lang="ts">
	import { T as Threlte } from '@threlte/core';
	import * as THREE from 'three';
	import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
	import { Float } from '@threlte/extras';

	let texture: THREE.Texture;

	export let rate = 0.5;

	const throbject = {
		geometry: new THREE.TorusGeometry(0.8, 0.4, 10, 20).rotateX(-0.4),
		mirrorSize: 0.22
	};
	new THREE.TextureLoader().load('https://assets.codepen.io/959327/matcap-crystal.png', (t) => {
		texture = t;
	});

	function createDiscoBall({ geometry, mirrorSize }: typeof throbject) {
		const dummy = new THREE.Object3D();

		const mirrorMaterial = new THREE.MeshMatcapMaterial({
			matcap: texture
		});

		let geometryOriginal = geometry;
		geometryOriginal.deleteAttribute('normal');
		geometryOriginal.deleteAttribute('uv');
		geometryOriginal = BufferGeometryUtils.mergeVertices(geometryOriginal);
		geometryOriginal.computeVertexNormals();

		const mirrorGeometry = new THREE.PlaneGeometry(mirrorSize, mirrorSize);
		let instancedMirrorMesh = new THREE.InstancedMesh(
			mirrorGeometry,
			mirrorMaterial,
			geometryOriginal.attributes.position.count
		);

		const positions = geometryOriginal.attributes.position.array;
		const normals = geometryOriginal.attributes.normal.array;
		for (let i = 0; i < positions.length; i += 3) {
			dummy.position.set(positions[i], positions[i + 1], positions[i + 2]);
			dummy.lookAt(
				positions[i] + normals[i],
				positions[i + 1] + normals[i + 1],
				positions[i + 2] + normals[i + 2]
			);
			dummy.updateMatrix();
			instancedMirrorMesh.setMatrixAt(i / 3, dummy.matrix);
		}

		const obj = new THREE.Group();
		const innerGeometry = geometryOriginal.clone();
		const ballInnerMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
		const innerMesh = new THREE.Mesh(innerGeometry, ballInnerMaterial);
		obj.add(innerMesh, instancedMirrorMesh);

		return obj;
	}

	const objectIdx = createDiscoBall(throbject);
	console.log(typeof objectIdx, objectIdx);
</script>

<Threlte.Group position={[1, 2, 3]}>
	<Float
		speed={5 * rate}
		rotationSpeed={5 * rate}
		rotationIntensity={6 * rate}
		floatIntensity={5 * rate}
	>
		<Threlte.Mesh {...objectIdx} position={[1, 2, 3]} />
		<!-- <Threlte.Mesh
			geometry={new THREE.TorusGeometry(2, 1, 16, 20)}
			material={new THREE.MeshBasicMaterial(0x123456)}
		/> -->
	</Float>
</Threlte.Group>

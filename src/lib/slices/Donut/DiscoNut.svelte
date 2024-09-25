<script lang="ts">
	import { T as Threlte } from '@threlte/core';
	import * as Three from 'three';
	import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js'';

	let texture = [];

	const objects = [{ geometry: new Three.TorusGeometry(0.4, 0.4, 10, 20), mirrorSize: 0.11 }];

	new Three.TextureLoader().load('https://assets.codepen.io/959327/matcap-crystal.png', (t) => {
		texture = t;
		for (let i = 0; i < objects.length; i++) {
			scenes.push(createScene(i));
		}
		updateSceneSize();
		render();
	});

	function createDiscoBall(idx) {
		const dummy = new Three.Object3D();

		const mirrorMaterial = new Three.MeshMatcapMaterial({
			matcap: texture
		});

		let geometryOriginal = objects[idx].geometry;
		geometryOriginal.deleteAttribute('normal');
		geometryOriginal.deleteAttribute('uv');
		geometryOriginal = BufferGeometryUtils.mergeVertices(geometryOriginal);
		geometryOriginal.computeVertexNormals();

		const mirrorGeometry = new Three.PlaneGeometry(
			objects[idx].mirrorSize,
			objects[idx].mirrorSize
		);
		let instancedMirrorMesh = new Three.InstancedMesh(
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

		const obj = new Three.Group();
		const innerGeometry = geometryOriginal.clone();
		const ballInnerMaterial = new Three.MeshBasicMaterial({ color: 0x222222 });
		const innerMesh = new Three.Mesh(innerGeometry, ballInnerMaterial);
		obj.add(innerMesh, instancedMirrorMesh);

		return obj;
	}
</script>

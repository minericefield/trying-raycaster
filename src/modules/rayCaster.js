import { Raycaster, Vector3 } from 'three'
import { ref } from 'vue'

export const initializeRayCaster = (camera) => {
  const isTheMouseOnMeshs = ref(false)

  const checkWhetherTheMouseOnMeshs = (point, meshs) => {
    if (meshs.length === 0) return
    let vector3 =  new Vector3((point.x.value / window.innerWidth) * 2 - 1, -(point.y.value / window.innerHeight) * 2 + 1, .5)
    vector3 = vector3.unproject(camera.value)
    const rayCaster = new Raycaster(camera.value.position, vector3.sub(camera.value.position).normalize())
    const intersects = rayCaster.intersectObjects(meshs.map(mesh => mesh.children[1])) // more trusted way, but to slow => meshs.map(mesh => mesh.children).flat()
    if (intersects.length > 0) {
      isTheMouseOnMeshs.value = true
    } else {
      isTheMouseOnMeshs.value = false
    }
  }

  return {
    isTheMouseOnMeshs,
    checkWhetherTheMouseOnMeshs
  }
}

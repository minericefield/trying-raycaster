import { PerspectiveCamera, Vector3 } from 'three'
import { computed } from 'vue'

export const initializeCamera = (baseSize, fullZDistance) => {
  return computed(() => {
    const camera = new PerspectiveCamera(45, baseSize.horizontalRatio.value, 1, fullZDistance.value + 1)
    camera.position.z = Math.floor(fullZDistance.value / 2)
    camera.lookAt(new Vector3(0, 0, 0))

    return camera
  })
}

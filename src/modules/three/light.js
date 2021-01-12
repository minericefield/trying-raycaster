import { SpotLight } from 'three'
import { computed } from 'vue'

export const initializeLight = (fullFarWidth, fullFarHeight, fullZDistance) => {
  return computed(() => {
    const light = new SpotLight(0xFFFFFF)
    light.position.set(fullFarWidth.value / 4, fullFarHeight.value / 4, fullZDistance.value / 2 - 1)
    light.intensity = 1
    // light.decay = .1
    // light.target = new Vector3(0, 0, 0)
    // light.angle = 1
    // light.castShadow = true
    // light.shadow.bias = -0.0001
    // light.shadow.mapSize.set(light.shadow.mapSize.x * 2, light.shadow.mapSize.y * 2)

    return light
  })
}

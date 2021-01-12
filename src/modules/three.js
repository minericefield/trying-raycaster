import { Scene } from 'three'
import { reactive, toRefs } from 'vue'

import { initializeCamera } from '@/modules/three/camera'
import { initializeScale } from '@/modules/three/scale'

export const initializeThree = (baseSize) => {
  const { fullZDistance, fullFarWidth, fullFarHeight } = initializeScale(baseSize)

  const three = reactive({
    scene: null,
    camera: null
  })

  const execute = () => {
    three.scene = new Scene()

    three.camera = initializeCamera(baseSize, fullZDistance)
  }

  return {
    fullZDistance,
    fullFarWidth,
    fullFarHeight,

    ...toRefs(three),

    execute
  }
}
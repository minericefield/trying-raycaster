import { Scene } from 'three'
import { reactive, toRefs } from 'vue'

import { initializeCamera } from '@/modules/three/camera'
import { initializeRenderer } from '@/modules/three/renderer'
import { initializeScale } from '@/modules/three/scale'

export const initializeThree = (baseSize) => {
  const { fullZDistance, fullFarWidth, fullFarHeight } = initializeScale(baseSize)

  const three = reactive({
    scene: null,
    camera: null,
    renderer: null
  })

  const execute = (threeElm) => {
    three.scene = new Scene()

    three.camera = initializeCamera(baseSize, fullZDistance)

    three.renderer = initializeRenderer(threeElm, baseSize)
  }

  return {
    fullZDistance,
    fullFarWidth,
    fullFarHeight,

    ...toRefs(three),

    execute
  }
}
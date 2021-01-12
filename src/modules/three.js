import { Scene } from 'three'
import { reactive, toRefs } from 'vue'

import { initializeScale } from '@/modules/three/scale'

export const initializeThree = (baseSize) => {
  const { fullZDistance, fullFarWidth, fullFarHeight } = initializeScale(baseSize)

  const three = reactive({
    scene: null
  })

  const execute = () => {
    three.scene = new Scene()
  }

  return {
    fullZDistance,
    fullFarWidth,
    fullFarHeight,

    ...toRefs(three),

    execute
  }
}
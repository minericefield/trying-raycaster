import { Scene } from 'three'
import { reactive, toRefs } from 'vue'

import { initializeBackground } from '@/modules/three/background'
import { initializeCamera } from '@/modules/three/camera'
import { initializeRenderer } from '@/modules/three/renderer'
import { initializeScale } from '@/modules/three/scale'

export const initializeThree = (baseSize) => {
  const { fullZDistance, fullFarWidth, fullFarHeight } = initializeScale(baseSize)

  const three = reactive({
    scene: null,
    camera: null,
    renderer: null,
    background: null
  })

  const execute = (threeElm) => {
    three.scene = new Scene()

    three.camera = initializeCamera(baseSize, fullZDistance)

    three.renderer = initializeRenderer(threeElm, baseSize)

    three.background = initializeBackground(fullZDistance, fullFarWidth, fullFarHeight)
    three.scene.add(three.background)

    render()
  }

  const render = () => {
    requestAnimationFrame(render)

    three.renderer.render(three.scene, three.camera)
  }

  return {
    fullZDistance,
    fullFarWidth,
    fullFarHeight,

    ...toRefs(three),

    execute,
    render
  }
}
import { Scene } from 'three'
import { reactive, toRefs } from 'vue'

import { initializeBackground } from '@/modules/three/background'
import { initializeCamera } from '@/modules/three/camera'
import { initializeLight } from '@/modules/three/light'
import { initializeRenderer } from '@/modules/three/renderer'
import { initializeScale } from '@/modules/three/scale'

export const initializeThree = (baseSize) => {
  const { fullZDistance, fullFarWidth, fullFarHeight } = initializeScale(baseSize)

  const basis = reactive({
    camera: null,
    renderer: null,
    light: null
  })

  let scene = null
  let background = null

  const execute = (threeElm) => {
    scene = new Scene()

    basis.camera = initializeCamera(baseSize, fullZDistance)

    basis.light = initializeLight(fullZDistance, fullFarWidth, fullFarHeight)
    scene.add(basis.light)

    basis.renderer = initializeRenderer(threeElm, baseSize)

    background = initializeBackground(fullZDistance, fullFarWidth, fullFarHeight)
    scene.add(background)

    render()
  }

  const render = () => {
    requestAnimationFrame(render)

    basis.renderer.render(scene, basis.camera)
  }

  return {
    fullZDistance,
    fullFarWidth,
    fullFarHeight,

    ...toRefs(basis),

    execute,
    render
  }
}
import { Scene } from 'three'
import { reactive, toRefs } from 'vue'

import { initializeBackground } from '@/modules/three/background'
import { initializeCamera } from '@/modules/three/camera'
import { initializeLight } from '@/modules/three/light'
import { initializeRenderer } from '@/modules/three/renderer'
import { initializeRotationSpeed } from '@/modules/three/rotationSpeed'
import { initializeScale } from '@/modules/three/scale'
import { initializeTextGroup } from '@/modules/three/textGroup'

import { textInfos } from '@/modules/three/constants'

export const initializeThree = (baseSize) => {
  const { fullZDistance, fullFarWidth, fullFarHeight } = initializeScale(baseSize)

  const basis = reactive({
    camera: null,
    renderer: null,
    light: null
  })

  let scene = null

  let background = null
  let texts = null
  let rotationSpeed = null

  const execute = (threeElm) => {
    scene = new Scene()

    basis.camera = initializeCamera(baseSize, fullZDistance)

    basis.light = initializeLight(fullZDistance, fullFarWidth, fullFarHeight)
    scene.add(basis.light)

    basis.renderer = initializeRenderer(threeElm, baseSize)

    background = initializeBackground(fullZDistance, fullFarWidth, fullFarHeight)
    scene.add(background)

    texts = initializeTextGroup(textInfos, fullZDistance)
    scene.add(texts.textGroup)

    rotationSpeed = initializeRotationSpeed(fullZDistance)

    render()
  }

  const render = () => {
    requestAnimationFrame(render)

    texts.textGroup.rotateY(rotationSpeed.getSpeed(texts.textGroup.children))

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
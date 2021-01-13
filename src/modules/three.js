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

    texts = initializeTextGroup(textInfos, fullZDistance, fullFarHeight)
    textsToReactive()
    scene.add(texts.textGroup)

    rotationSpeed = initializeRotationSpeed(fullZDistance)

    render()
  }

  /**
   * wanted to use texts in setup so it need to be reactive but couldn't add reactive mesh with the following error
   * TypeError: 'get' on proxy: property 'modelViewMatrix' is a read-only and non-configurable data property on the proxy target but the proxy did not return its actual value (expected '#<Matrix4>' but got '[object Object]')
   * so defined another property for reactivity temporary
   */
  const reactiveTexts = reactive({
    helloText: {},
    worldText: {},
    awesomeText: {},
    threeText: {},
    textGroup: {}
  })
  const textsToReactive = () => {
    Object.keys(texts).forEach(key => {
      reactiveTexts[key] = texts[key]
    })
    
    return reactiveTexts
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
    ...toRefs(reactiveTexts),

    execute,
    render
  }
}
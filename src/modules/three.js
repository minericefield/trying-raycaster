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

export const initializeThree = (baseSize, additionalAnimationFrameMethod) => {
  const { fullZDistance, fullFarWidth, fullFarHeight } = initializeScale(baseSize)

  const basis = reactive({
    camera: {},
    renderer: {},
    light: {}
  })

  let scene = {}

  let background = {}
  let texts = {}
  let rotationSpeed = {}

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

  const render = () => {
    requestAnimationFrame(render)

    texts.textGroup.rotateY(rotationSpeed.getSpeed(texts.textGroup.children))

    basis.renderer.render(scene, basis.camera)

    if (additionalAnimationFrameMethod) {
      additionalAnimationFrameMethod()
    }
  }

  const onResized = () => {
    scene.remove(background)
    background = initializeBackground(fullZDistance, fullFarWidth, fullFarHeight)
    scene.add(background)
    // no texts mesh handling in order to change scale by window size

    basis.renderer.setSize(baseSize.width.value, baseSize.height.value)
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

  return {
    fullZDistance,
    fullFarWidth,
    fullFarHeight,

    ...toRefs(basis),
    ...toRefs(reactiveTexts),

    execute,
    onResized,
    render
  }
}

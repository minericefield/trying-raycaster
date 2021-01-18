import { Scene } from 'three'
import { reactive, ref, toRaw, toRefs } from 'vue'

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
    scene: {},
    camera: {},
    renderer: {},
    light: {},
  })

  let background = {}
  const texts = reactive({
    helloText: {},
    worldText: {},
    awesomeText: {},
    threeText: {},
    textGroup: {}
  })

  let rotationSpeed = {}
  const rotateY = ref(0)

  const execute = (threeElm) => {
    basis.scene = new Scene()

    basis.camera = initializeCamera(baseSize, fullZDistance)

    basis.light = initializeLight(fullZDistance, fullFarWidth, fullFarHeight)
    basis.scene.add(basis.light)

    basis.renderer = initializeRenderer(threeElm, baseSize)

    background = initializeBackground(fullZDistance, fullFarWidth, fullFarHeight)
    basis.scene.add(background)

    const textsResult = initializeTextGroup(textInfos, fullZDistance, fullFarHeight, baseSize)
    Object.keys(textsResult).forEach(textResultKey => {
      texts[textResultKey] = textsResult[textResultKey]
    })
    basis.scene.add(toRaw(texts.textGroup))

    rotationSpeed = initializeRotationSpeed(baseSize)

    render()
  }

  const render = () => {
    requestAnimationFrame(render)

    const speed = rotationSpeed.getSpeed(texts.textGroup.children)
    texts.textGroup.rotateY(speed)
    rotateY.value += speed

    basis.renderer.render(toRaw(basis.scene), basis.camera)
  }

  const onResized = () => {
    basis.scene.remove(background)
    background = initializeBackground(fullZDistance, fullFarWidth, fullFarHeight)
    basis.scene.add(background)
    // no texts mesh handling in order to change scale by window size

    basis.renderer.setSize(baseSize.width.value, baseSize.height.value)
  }

  return {
    fullZDistance,
    fullFarWidth,
    fullFarHeight,

    ...toRefs(basis),
    ...toRefs(texts),
    rotateY,

    execute,
    onResized,
    render
  }
}

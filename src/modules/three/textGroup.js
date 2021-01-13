import { Font, Group } from 'three'
import font from 'three/examples/fonts/helvetiker_regular.typeface.json'

import { initializeAText } from '@/modules/three/aText'

export const initializeTextGroup = (textInfos, fullZDistance, fullFarHeight, baseSize) => {
  const threeFont = new Font(font)

  const textGroup = new Group()
  const texts = {}
  Object.keys(textInfos).forEach(key => {
    const text = textInfos[key]
    texts[key] = initializeAText(threeFont, text.content, fullZDistance, text.position, baseSize)
    textGroup.add(texts[key])
  })
  textGroup.position.y = -fullFarHeight.value / 100
  textGroup.position.z = fullZDistance.value / 8
  textGroup.rotateZ(Math.PI / 8)
  return {
    ...texts,
    textGroup
  }
}

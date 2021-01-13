import { Font, Group } from 'three'
import font from 'three/examples/fonts/helvetiker_regular.typeface.json'

import { initializeAText } from '@/modules/three/aText'

export const initializeTextGroup = (textInfos, fullZDistance) => {
  const threeFont = new Font(font)

  const textGroup = new Group()
  const texts = {}
  Object.keys(textInfos).forEach(key => {
    const text = textInfos[key]
    texts[key] = initializeAText(threeFont, text.content, fullZDistance, text.position)
    textGroup.add(texts[key])
  })
  textGroup.position.z = fullZDistance.value / 8
  textGroup.rotateZ(Math.PI / 8)
  return {
    ...texts,
    textGroup
  }
}

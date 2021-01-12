import { Color, WebGLRenderer } from 'three'
import { computed } from 'vue'

export const initializeRenderer = (threeElm, baseSize) => {
  return computed(() => {
    const renderer = new WebGLRenderer({
      antialias: true,
      // alpha: true,
      canvas: threeElm.value
    })
    renderer.setClearColor(new Color(0xFFFFFF));
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(baseSize.width.value, baseSize.height.value);
    // renderer.shadowMap.enabled = true
  
    return renderer
  })
}

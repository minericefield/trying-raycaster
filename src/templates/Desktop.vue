<template>
  <div
    ref="desktopElm"
    class="desktop"
  >
    <canvas
      ref="threeElm"
      :width="threeBaseSize.width.value"
      :height="threeBaseSize.height.value"
    />
  </div>
</template>

<script>
import { nextTick, onMounted, ref } from 'vue'

import { initializeThree } from '@/modules/three'
import { initializeThreeBaseSize } from '@/modules/threeBaseSize'

export default {
  setup () {
    const desktopElm = ref(null)
    const threeElm = ref(null)

    const threeBaseSize = initializeThreeBaseSize()
    const three = initializeThree(threeBaseSize)

    onMounted(async () => {
      await nextTick()
      threeBaseSize.updateSize({ width: desktopElm.value.clientWidth, height: desktopElm.value.clientHeight })
      three.execute()
    })

    return {
      desktopElm,
      threeElm,

      threeBaseSize,
      three
    }
  }
}
</script>

<style lang="scss" scoped>
.desktop {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
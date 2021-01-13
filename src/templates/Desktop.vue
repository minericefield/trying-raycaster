<template>
  <div
    ref="desktopElm"
    class="desktop"
    @mousemove="onMouseMove"
  >
    <canvas
      ref="threeElm"
      :width="threeBaseSize.width.value"
      :height="threeBaseSize.height.value"
    />

    <ray-caster-checker
      :style="{ top: point.y.value + 'px', left: point.x.value + 'px' }"
      :should-be-active="true"
    />
  </div>
</template>

<script>
import { inject, nextTick, onMounted, ref } from 'vue'

import { INJECTION_KEY as INJECTION_KEY_POINT } from '@/modules/point'
import { initializeThree } from '@/modules/three'
import { initializeThreeBaseSize } from '@/modules/threeBaseSize'

import RayCasterChecker from '@/components/RayCasterChecker'

export default {
  components: {
    RayCasterChecker
  },
  setup () {
    const desktopElm = ref(null)
    const threeElm = ref(null)

    const point = inject(INJECTION_KEY_POINT)

    const threeBaseSize = initializeThreeBaseSize()
    const three = initializeThree(threeBaseSize)

    onMounted(async () => {
      await nextTick()
      threeBaseSize.updateSize({ width: desktopElm.value.clientWidth, height: desktopElm.value.clientHeight })
      three.execute(threeElm)
    })

    const onMouseMove = (event) => {
      point.update(event)
    }

    return {
      desktopElm,
      threeElm,

      point,
      threeBaseSize,
      three,

      onMouseMove
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
import { computed } from 'vue'

import { sightAngRad } from '@/modules/three/constants'

export const initializeScale = (baseSize) => {
  const fullZDistance = computed(() => baseSize.isMobileOrTabletAspect.value ? baseSize.height.value / 2 : baseSize.width.value / 2)
  const fullFarWidth = computed(() => Math.round(fullFarHeight.value * baseSize.horizontalRatio.value))
  const fullFarHeight = computed(() => Math.round(fullZDistance.value * Math.tan(sightAngRad / 2) * 2))

  return {
    fullZDistance,
    fullFarWidth,
    fullFarHeight
  }
}

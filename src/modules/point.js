import { reactive, toRefs } from 'vue'

export const initializePoint = () => {
  const point = reactive({
    x: 0,
    y: 0
  })

  const update = (event) => {
    point.x = event.clientX
    point.y = event.clientY
  }

  return {
    ...toRefs(point),

    update
  }
}

export const INJECTION_KEY = 'INJECTION_KEY_POINT'

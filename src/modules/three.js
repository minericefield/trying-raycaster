import { Scene } from 'three'
import { reactive, toRefs } from 'vue'

export const initializeThree = () => {
  const three = reactive({
    scene: null
  })

  const execute = () => {
    three.scene = new Scene()
  }

  return {
    ...toRefs(three),

    execute
  }
}
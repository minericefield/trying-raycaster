import { Vector3 } from 'three'

export const initializeRotationSpeed = (fullZDistance) => {
  const vector3 = new Vector3()
  const isOnFrontCenter = ({ x, y, z }) => x > -fullZDistance.value / 20 && x < 1 && y > -fullZDistance.value / 20 && y < 1 && z > 1

  const getSpeed = (targets) => {
    if (targets.find(target => isOnFrontCenter(target.getWorldPosition(vector3)))) {
      return -.003
    } else {
      return -.04
    }
  }

  return {
    getSpeed
  }
}

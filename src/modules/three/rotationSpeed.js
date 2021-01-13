import { Vector3 } from 'three'

const vector3 = new Vector3()
const isOnFrontCenter = ({ x, y, z }) => x > -50 && x < 1 && y > -50 && y < 1 && z > 1

export const getSpeed = (targets) => {
  if (targets.find(target => isOnFrontCenter(target.getWorldPosition(vector3)))) {
    return -.003
  } else {
    return -.04
  }
}

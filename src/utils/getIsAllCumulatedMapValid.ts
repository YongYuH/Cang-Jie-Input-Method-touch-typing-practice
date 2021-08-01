import type { CumulatedMap } from '../keyDownRadicalReducer'

const getIsAllCumulatedMapValid = (list: CumulatedMap[]) => {
  return list.reduce((acc, cur) => acc && cur.isValid, true)
}

export { getIsAllCumulatedMapValid }

import { CumulatedMap } from '../radicalReducer'

const getIsAllCumulatedMapValid = (list: CumulatedMap[]) => {
  return list.reduce((acc, cur) => acc && cur.isValid, true)
}

export { getIsAllCumulatedMapValid }

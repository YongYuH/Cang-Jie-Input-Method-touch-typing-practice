interface GetIsUpdatedIndexValidArgs {
  max: number
  updatedIndex: number
}
type GetIsUpdatedIndexValid = (args: GetIsUpdatedIndexValidArgs) => boolean
const getIsUpdatedIndexValid: GetIsUpdatedIndexValid = (args) => {
  const { max, updatedIndex } = args
  if (updatedIndex >= max + 1) {
    return false
  }
  if (updatedIndex <= -1) {
    return false
  }
  return true
}

export { getIsUpdatedIndexValid }

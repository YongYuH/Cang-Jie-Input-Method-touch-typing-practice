interface GetRandomNumberArgs {
  max: number
}

type GetRandomInteger = (args: GetRandomNumberArgs) => number
const getRandomInteger: GetRandomInteger = (args) => {
  const { max } = args
  return Math.floor(Math.random() * max)
}

export { getRandomInteger }

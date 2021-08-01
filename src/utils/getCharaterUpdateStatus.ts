import { match } from 'ts-pattern'

type CharaterUpdateStatus = 'valid' | 'invalid'

interface GetCharaterUpdateStatusArgs {
  target: string
  updated: string
}

type GetCharaterUpdateStatus = (args: GetCharaterUpdateStatusArgs) => CharaterUpdateStatus

const getCharaterUpdateStatus: GetCharaterUpdateStatus = (args) => {
  const { target, updated } = args

  return match<boolean, CharaterUpdateStatus>(target === updated)
    .with(true, () => 'valid')
    .with(false, () => 'invalid')
    .exhaustive()
}

export type { CharaterUpdateStatus }
export { getCharaterUpdateStatus }

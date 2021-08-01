import { __, match } from 'ts-pattern'

import type { CumulatedMap } from '../keyDownRadicalReducer'
import type { CumulatedUpdateAction } from './getCumulatedUpdateAction'

type CumulatedUpdateType =
  | 'push'
  | 'pushFirst'
  | 'pushLast'
  | 'pushOverflow'
  | 'pop'
  | 'popEmpty'
  | 'skip'

type Target = string

interface GetCumulatedUpdateTypeArgs {
  cumulated: CumulatedMap[]
  targetList: Target[]
  updateAction: CumulatedUpdateAction
}

type GetCumulatedUpdateType = (args: GetCumulatedUpdateTypeArgs) => CumulatedUpdateType

const getCumulatedUpdateType: GetCumulatedUpdateType = (args) => {
  const { cumulated, targetList, updateAction } = args

  const cumulatedUpdateType = match<[CumulatedMap[], CumulatedUpdateAction], CumulatedUpdateType>([
    cumulated,
    updateAction,
  ])
    .with([[], { type: 'pop' }], () => 'popEmpty')
    .with([[], { type: 'push' }], () => 'pushFirst')
    .with(
      [__, { type: 'push' }],
      ([cumulated]) => cumulated.length === targetList.length,
      () => 'pushOverflow'
    )
    .with(
      [__, { type: 'push' }],
      ([cumulated]) => cumulated.length === targetList.length - 1,
      () => 'pushLast'
    )
    .with([__, { type: 'invalid' }], () => 'skip')
    .with([__, { type: 'push' }], () => 'push')
    .with([__, { type: 'pop' }], () => 'pop')
    .exhaustive()

  return cumulatedUpdateType
}

export type { CumulatedUpdateType }
export { getCumulatedUpdateType }

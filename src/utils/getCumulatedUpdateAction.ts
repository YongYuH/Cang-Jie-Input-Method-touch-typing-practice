import { __, match } from 'ts-pattern'

import CangJieKeyBinding from '../CangJieKeyBinding.json'
import type { CumulatedMap } from '../keyDownRadicalReducer'

type CumulatedUpdateAction =
  | {
      type: 'push'
      payload: CumulatedMap
    }
  | {
      type: 'pop'
    }
  | {
      type: 'invalid'
    }

interface GetCumulatedUpdateActionArgs {
  typingKey: string
  isValid: boolean
}

type GetCumulatedUpdateAction = (args: GetCumulatedUpdateActionArgs) => CumulatedUpdateAction

const getCumulatedUpdateAction: GetCumulatedUpdateAction = (args) => {
  const { typingKey, isValid } = args

  return match<string, CumulatedUpdateAction>(typingKey)
    .with('Backspace', () => ({
      type: 'pop',
    }))
    .with(
      __,
      (typingKey) => CangJieKeyBinding[typingKey] === undefined,
      () => ({
        type: 'invalid',
      })
    )
    .with(__, () => ({
      type: 'push',
      payload: {
        radical: CangJieKeyBinding[typingKey],
        isValid,
      },
    }))
    .exhaustive()
}

export type { CumulatedUpdateAction }
export { getCumulatedUpdateAction }

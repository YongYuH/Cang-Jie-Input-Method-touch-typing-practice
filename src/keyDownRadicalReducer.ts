import { __, match } from 'ts-pattern'

import CangJieKeyBinding from './CangJieKeyBinding.json'
import ChineseCharacterToEnglishKey from './ChineseCharacterToEnglishKey.json'
import type { CharaterUpdateStatus } from './utils/getCharaterUpdateStatus'
import { getCharaterUpdateStatus } from './utils/getCharaterUpdateStatus'
import { getCumulatedUpdateAction } from './utils/getCumulatedUpdateAction'
import type { CumulatedUpdateType } from './utils/getCumulatedUpdateType'
import { getCumulatedUpdateType } from './utils/getCumulatedUpdateType'
import { getIsAllCumulatedMapValid } from './utils/getIsAllCumulatedMapValid'
import { getRandomInteger } from './utils/getRandomInteger'
import type { SelectedChineseCharacterMapping } from './utils/getSelectedChineseCharacterMapping'
import { getSelectedChineseCharacterMapping } from './utils/getSelectedChineseCharacterMapping'

const numberOfCharacters = Object.keys(ChineseCharacterToEnglishKey).length

interface ActionPayload {
  key: string
}

type ActionType = 'keyDown'

interface Action {
  payload?: ActionPayload
  type: ActionType
}

interface CumulatedMap {
  radical: string
  isValid: boolean
}

interface RadicalState {
  selectedChineseCharacterMapping: SelectedChineseCharacterMapping
  cumulatedMapList: CumulatedMap[]
}

type GetInitialState = () => RadicalState

const getInitialState: GetInitialState = () => {
  const randomNumber = getRandomInteger({ max: numberOfCharacters })

  return {
    selectedChineseCharacterMapping: getSelectedChineseCharacterMapping(randomNumber),
    cumulatedMapList: [],
  }
}

const keyDownRadicalReducer = (state: RadicalState, action: Action) => {
  const currentRadicalList = state.selectedChineseCharacterMapping.radicalList
  const originalCumulatedMapList = state.cumulatedMapList
  const targetIndex = originalCumulatedMapList.length
  const currentTypingIndex = originalCumulatedMapList.length + 1
  const typingKey = action.payload.key

  const target = currentRadicalList[targetIndex]
  const typingRadical = CangJieKeyBinding[typingKey]
  const isCurrentTypingKeyValid = typingRadical === target

  const charaterUpdateStatus = getCharaterUpdateStatus({
    target,
    updated: typingKey,
  })

  const cumulatedUpdateType = getCumulatedUpdateType({
    cumulated: originalCumulatedMapList,
    targetList: currentRadicalList,
    updateAction: getCumulatedUpdateAction({
      isValid: isCurrentTypingKeyValid,
      typingKey,
    }),
  })

  return match<[CharaterUpdateStatus, CumulatedUpdateType], RadicalState>([
    charaterUpdateStatus,
    cumulatedUpdateType,
  ])
    .with([__, 'skip'], () => state)
    .with([__, 'popEmpty'], () => state)
    .with([__, 'pushOverflow'], () => state)
    .with([__, 'pushFirst'], () => {
      const pushedCumulatedMapList: CumulatedMap[] = [
        ...originalCumulatedMapList,
        {
          radical: typingRadical,
          isValid: isCurrentTypingKeyValid,
        },
      ]
      return {
        ...state,
        cumulatedMapList: pushedCumulatedMapList,
      }
    })
    .with([__, 'pushLast'], () => {
      const pushedCumulatedMapList: CumulatedMap[] = [
        ...originalCumulatedMapList,
        {
          radical: typingRadical,
          isValid: isCurrentTypingKeyValid,
        },
      ]
      const isAllTypingCorrect = getIsAllCumulatedMapValid(pushedCumulatedMapList)
      if (isAllTypingCorrect) {
        return getInitialState()
      }

      return {
        ...state,
        cumulatedMapList: pushedCumulatedMapList,
      }
    })
    .with([__, 'push'], () => {
      const pushedCumulatedMapList: CumulatedMap[] = [
        ...originalCumulatedMapList,
        {
          radical: typingRadical,
          isValid: isCurrentTypingKeyValid,
        },
      ]
      return {
        ...state,
        cumulatedMapList: pushedCumulatedMapList,
      }
    })
    .with([__, 'pop'], () => {
      const popedCumulatedMapList: CumulatedMap[] = originalCumulatedMapList.slice(
        0,
        currentTypingIndex - 2
      )

      return {
        ...state,
        cumulatedMapList: popedCumulatedMapList,
      }
    })
    .exhaustive()
}

export type { CumulatedMap, RadicalState }

export { getInitialState, keyDownRadicalReducer }

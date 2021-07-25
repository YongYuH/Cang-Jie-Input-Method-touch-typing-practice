import ChineseCharacterToEnglishKey from './ChineseCharacterToEnglishKey.json'
import { getIsUpdatedIndexValid } from './utils/getIsUpdatedIndexValid'
import { getRandomInteger } from './utils/getRandomInteger'
import {
  getSelectedChineseCharacterMapping,
  SelectedChineseCharacterMapping,
} from './utils/getSelectedChineseCharacterMapping'

const numberOfCharacters = Object.keys(ChineseCharacterToEnglishKey).length

interface ActionPayload {
  typingRadical: string
}

type ActionType = 'typing' | 'backspace'

interface Action {
  payload?: ActionPayload
  type: ActionType
}

interface State {
  selectedChineseCharacterMapping: SelectedChineseCharacterMapping
  cumulated: string[]
  isCurrentTypingCorrect: boolean
  isCumulatedCorrect: boolean
  isAllTypingCorrect: boolean
}

const getInitialState = (randomNumber: number) => {
  return {
    selectedChineseCharacterMapping:
      getSelectedChineseCharacterMapping(randomNumber),
    cumulated: [],
    isCurrentTypingCorrect: false,
    isCumulatedCorrect: false,
    isAllTypingCorrect: false,
  }
}

const randomNumber = getRandomInteger({ max: numberOfCharacters })

export const initialState: State = {
  selectedChineseCharacterMapping:
    getSelectedChineseCharacterMapping(randomNumber),
  cumulated: [],
  isCurrentTypingCorrect: false,
  isCumulatedCorrect: false,
  isAllTypingCorrect: false,
}

const radicalReducer = (state: State, action: Action) => {
  const currentRadicalList = state.selectedChineseCharacterMapping.radicalList
  const max = currentRadicalList.length
  const currentTypingIndex = state.cumulated.length

  switch (action.type) {
    case 'backspace': {
      const updatedIndex = currentTypingIndex - 1

      const isUpdatingIndexValid = getIsUpdatedIndexValid({
        max,
        updatedIndex,
      })

      if (!isUpdatingIndexValid) {
        return state
      }

      return {
        ...state,
        currentTypingIndex: updatedIndex,
        cumulated: state.cumulated.slice(0, updatedIndex),
      }
    }

    case 'typing': {
      const updatedIndex = currentTypingIndex + 1

      const isUpdatingIndexValid = getIsUpdatedIndexValid({
        max,
        updatedIndex,
      })

      if (!isUpdatingIndexValid) {
        return state
      }

      const updatedCumulated = [
        ...state.cumulated.slice(0, currentTypingIndex),
        action.payload.typingRadical,
        ...state.cumulated.slice(updatedIndex),
      ]

      const isCurrentTypingCorrect =
        updatedCumulated[currentTypingIndex] ===
        currentRadicalList[currentTypingIndex]

      const isCumulatedCorrect =
        updatedIndex === 1
          ? isCurrentTypingCorrect
          : state.isCumulatedCorrect && isCurrentTypingCorrect

      const isAllTypingCorrect = isCumulatedCorrect && updatedIndex === max

      if (isAllTypingCorrect) {
        return getInitialState(getRandomInteger({ max: numberOfCharacters }))
      }

      return {
        ...state,
        currentTypingIndex: updatedIndex,
        cumulated: updatedCumulated,
        isCurrentTypingCorrect,
        isCumulatedCorrect,
        isAllTypingCorrect,
      }
    }

    default:
      return state
  }
}

export { radicalReducer }

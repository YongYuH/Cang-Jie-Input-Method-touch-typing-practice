import ChineseCharacterToEnglishKey from './ChineseCharacterToEnglishKey.json'
import { getIsAllCumulatedMapValid } from './utils/getIsAllCumulatedMapValid'
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

export interface CumulatedMap {
  radical: string
  isValid: boolean
}

interface State {
  selectedChineseCharacterMapping: SelectedChineseCharacterMapping
  cumulatedMapList: CumulatedMap[]
}

const getInitialState = (randomNumber: number) => {
  return {
    selectedChineseCharacterMapping:
      getSelectedChineseCharacterMapping(randomNumber),
    cumulatedMapList: [],
  }
}

const randomNumber = getRandomInteger({ max: numberOfCharacters })

export const initialState: State = {
  selectedChineseCharacterMapping:
    getSelectedChineseCharacterMapping(randomNumber),
  cumulatedMapList: [],
}

const radicalReducer = (state: State, action: Action) => {
  const currentRadicalList = state.selectedChineseCharacterMapping.radicalList
  const max = currentRadicalList.length
  const currentTypingIndex = state.cumulatedMapList.length

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
        cumulatedMapList: state.cumulatedMapList.slice(0, updatedIndex),
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

      const appendedTypingRadical = action.payload.typingRadical

      const appended: CumulatedMap = {
        radical: appendedTypingRadical,
        isValid:
          appendedTypingRadical === currentRadicalList[currentTypingIndex],
      }

      const updatedCumulatedMapList = [
        ...state.cumulatedMapList.slice(0, currentTypingIndex),
        appended,
      ]

      const isAllTypingCorrect =
        updatedIndex === max &&
        getIsAllCumulatedMapValid(updatedCumulatedMapList)

      if (isAllTypingCorrect) {
        return getInitialState(getRandomInteger({ max: numberOfCharacters }))
      }

      return {
        ...state,
        currentTypingIndex: updatedIndex,
        cumulatedMapList: updatedCumulatedMapList,
      }
    }

    default:
      return state
  }
}

export { radicalReducer }

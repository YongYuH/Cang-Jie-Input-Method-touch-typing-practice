import CangJieKeyBinding from './CangJieKeyBinding.json'
interface ActionPayload {
  currentPressedKey: string
}

type ActionType = 'typing'

interface Action {
  payload?: ActionPayload
  type: ActionType
}

interface State {
  currentTypingIndex: number
  currentQuestionRadicalList: string[]
  cumulated: string[]
}

const radicalReducer = (state: State, action: Action) => {
  const { currentQuestionRadicalList } = state
  const { payload, type } = action
  const { currentPressedKey } = payload

  const maxLength = currentQuestionRadicalList.length

  if (currentPressedKey === 'Backspace') {
    const updatedIndex = state.currentTypingIndex - 1
    if (updatedIndex < 0) {
      return state
    }

    const placeholderLength = maxLength - updatedIndex

    return {
      ...state,
      currentTypingIndex: state.currentTypingIndex - 1,
      cumulated: [
        ...state.cumulated.slice(0, state.currentTypingIndex - 1),
        ...Array(placeholderLength).fill(' '),
      ],
    }
  }

  const typingRadical = CangJieKeyBinding[currentPressedKey]

  if (typingRadical === undefined) {
    return state
  }

  switch (type) {
    case 'typing': {
      const updatedIndex = state.currentTypingIndex + 1
      if (updatedIndex > maxLength) {
        return state
      }

      return {
        ...state,
        currentTypingIndex: updatedIndex,
        cumulated: [
          ...state.cumulated.slice(0, state.currentTypingIndex),
          CangJieKeyBinding[currentPressedKey],
          ...state.cumulated.slice(updatedIndex),
        ],
      }
    }

    default:
      return state
  }
}

export { radicalReducer }

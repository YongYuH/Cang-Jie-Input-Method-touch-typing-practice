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
  currentIndex: number
  cumulated: string[]
  maxLength: number
}

const radicalReducer = (state: State, action: Action) => {
  const { payload, type } = action
  const { currentPressedKey } = payload

  if (currentPressedKey === 'Backspace') {
    const updatedIndex = state.currentIndex - 1
    if (updatedIndex < 0) {
      return state
    }

    const placeholderLength = state.maxLength - updatedIndex

    return {
      ...state,
      currentIndex: state.currentIndex - 1,
      cumulated: [
        ...state.cumulated.slice(0, state.currentIndex - 1),
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
      const updatedIndex = state.currentIndex + 1
      if (updatedIndex > state.maxLength) {
        return state
      }

      return {
        ...state,
        currentIndex: updatedIndex,
        cumulated: [
          ...state.cumulated.slice(0, state.currentIndex),
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

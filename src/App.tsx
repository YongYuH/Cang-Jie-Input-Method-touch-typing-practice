import React, { useEffect, useReducer } from 'react'
import styled from 'styled-components'

import CangJieKeyBinding from './CangJieKeyBinding.json'
import CangJieKeyboard from './CangJieKeyboard'
import Grid from './components/Grid'
import RadicalQuestion from './RadicalQuestion'
import { initialState, radicalReducer } from './radicalReducer'
import TypingRadicalPreview from './TypingRadicalPreview'

const KeyboardWrapper = styled.div`
  max-width: 600px;
`

const App = () => {
  const [state, dispatch] = useReducer(radicalReducer, initialState)

  const hanleKeyDown = (event: KeyboardEvent) => {
    const currentPressedKey = event.key
    if (currentPressedKey === 'Backspace') {
      dispatch({
        type: 'backspace',
      })
    } else {
      const typingRadical = CangJieKeyBinding[currentPressedKey]
      if (typingRadical !== undefined) {
        dispatch({
          type: 'typing',
          payload: {
            typingRadical,
          },
        })
      }
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', hanleKeyDown)
    return () => {
      window.removeEventListener('keydown', hanleKeyDown)
    }
  }, [])

  return (
    <Grid gridRowGap="32px">
      <RadicalQuestion
        questionChineseCharacter={
          state.selectedChineseCharacterMapping.character
        }
        radicalList={state.selectedChineseCharacterMapping.radicalList}
      />
      <TypingRadicalPreview
        cumulated={state.cumulated}
        maxLength={state.selectedChineseCharacterMapping.radicalList.length}
      />
      <KeyboardWrapper>
        <CangJieKeyboard />
      </KeyboardWrapper>
    </Grid>
  )
}

export default App

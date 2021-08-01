import React, { useReducer } from 'react'
import styled from 'styled-components'

import CangJieKeyboard from './CangJieKeyboard'
import Grid from './components/Grid'
import type { RadicalState } from './keyDownRadicalReducer'
import { getInitialState, keyDownRadicalReducer } from './keyDownRadicalReducer'
import RadicalQuestion from './RadicalQuestion'
import TypingRadicalPreview from './TypingRadicalPreview'
import { useKeyDown } from './useKeyDown'

const KeyboardWrapper = styled.div`
  max-width: 600px;
`

const initialState: RadicalState = getInitialState()

const App = () => {
  const [state, dispatch] = useReducer(keyDownRadicalReducer, initialState)

  const keyDownHandler = (event: KeyboardEvent) => {
    const currentPressedKey = event.key
    dispatch({
      type: 'keyDown',
      payload: {
        key: currentPressedKey,
      },
    })
  }

  useKeyDown(keyDownHandler)

  return (
    <Grid gridRowGap="32px">
      <RadicalQuestion
        questionChineseCharacter={state.selectedChineseCharacterMapping.character}
        radicalList={state.selectedChineseCharacterMapping.radicalList}
      />
      <TypingRadicalPreview
        cumulatedMapList={state.cumulatedMapList}
        maxLength={state.selectedChineseCharacterMapping.radicalList.length}
      />
      <KeyboardWrapper>
        <CangJieKeyboard />
      </KeyboardWrapper>
    </Grid>
  )
}

export default App

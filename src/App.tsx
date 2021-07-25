import React, { useEffect, useReducer } from 'react'
import styled from 'styled-components'

import CangJieKeyboard from './CangJieKeyboard'
import Grid from './components/Grid'
import { radicalReducer } from './radicalReducer'
import TypingRadicalPreview from './TypingRadicalPreview'

const KeyboardWrapper = styled.div`
  max-width: 600px;
`

const maxLength = 3

const App = () => {
  const [state, dispatch] = useReducer(radicalReducer, {
    currentIndex: 0,
    cumulated: Array(maxLength).fill(' '),
    maxLength,
  })

  const hanleKeyDown = (event: KeyboardEvent) => {
    dispatch({
      type: 'typing',
      payload: {
        currentPressedKey: event.key,
      },
    })
  }

  useEffect(() => {
    window.addEventListener('keydown', hanleKeyDown)
    return () => {
      window.removeEventListener('keydown', hanleKeyDown)
    }
  }, [])

  return (
    <Grid gridRowGap="32px">
      <TypingRadicalPreview cumulated={state.cumulated} />
      <KeyboardWrapper>
        <CangJieKeyboard />
      </KeyboardWrapper>
    </Grid>
  )
}

export default App

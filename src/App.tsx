import React from 'react'
import styled from 'styled-components'

import CangJieKeyboard from './CangJieKeyboard'

const KeyboardWrapper = styled.div`
  max-width: 600px;
`

const App = () => {
  return (
    <KeyboardWrapper>
      <CangJieKeyboard />
    </KeyboardWrapper>
  )
}

export default App

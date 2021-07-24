import 'react-simple-keyboard/build/css/index.css'

import React from 'react'
import Keyboard from 'react-simple-keyboard'

import cangJieKeyBinding from './cangJieKeyBinding.json'

const CangJieKeyboard = () => {
  return (
    <Keyboard
      mergeDisplay
      display={cangJieKeyBinding}
      physicalKeyboardHighlight
    />
  )
}

export default CangJieKeyboard

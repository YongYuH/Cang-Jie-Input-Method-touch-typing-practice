import 'react-simple-keyboard/build/css/index.css'

import React from 'react'
import Keyboard from 'react-simple-keyboard'

import CangJieKeyBinding from './CangJieKeyBinding.json'

const CangJieKeyboard = () => {
  return <Keyboard mergeDisplay display={CangJieKeyBinding} physicalKeyboardHighlight />
}

export default CangJieKeyboard

import React, { FC } from 'react'
import styled, { CSSProperties } from 'styled-components'

type RadicalState = 'valid' | 'invalid'

type GetBorderBottom = (state?: RadicalState) => CSSProperties['borderBottom']
const getBorderBottom: GetBorderBottom = (state) => {
  switch (state) {
    case 'invalid': {
      return '4px solid red'
    }
    case 'valid': {
      return '4px solid green'
    }
    default: {
      return '4px solid transparent'
    }
  }
}

interface RadicalTextProps {
  state?: RadicalState
}

const RadicalText = styled.div<RadicalTextProps>`
  border-bottom: ${(props) => getBorderBottom(props.state)};
  font-size: 20px;
  line-height: 28px;
`

interface RadicalProps {
  state?: RadicalState
}

const Radical: FC<RadicalProps> = (props) => {
  const { children, state } = props

  return <RadicalText state={state}>{children}</RadicalText>
}

export default Radical

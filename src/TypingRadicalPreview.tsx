import React from 'react'
import styled from 'styled-components'

import Grid from './components/Grid'
import Radical from './components/Radical'

const Placeholder = styled.div`
  border-bottom: 1px solid black;
  width: 20px;
  height: 27px;
`

interface TypingRadicalPreviewProps {
  cumulated: string[]
}

const TypingRadicalPreview = (props: TypingRadicalPreviewProps) => {
  const { cumulated } = props

  return (
    <Grid
      gridAutoColumns="min-content"
      gridAutoFlow="column"
      gridColumnGap="4px"
    >
      {cumulated.map((radical, index) =>
        radical === ' ' ? (
          <Placeholder key={`radical-${index}`} />
        ) : (
          <Radical key={`radical-${index}`}>{radical}</Radical>
        )
      )}
    </Grid>
  )
}

export default TypingRadicalPreview

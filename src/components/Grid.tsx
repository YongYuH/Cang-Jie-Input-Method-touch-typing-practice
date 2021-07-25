import styled from 'styled-components'
import { grid, GridProps } from 'styled-system'

const Grid = styled.div<GridProps>`
  display: grid;
  ${grid}
`

export default Grid

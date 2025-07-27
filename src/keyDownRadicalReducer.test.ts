import { getInitialState, keyDownRadicalReducer } from './keyDownRadicalReducer'
import * as getSelectedChineseCharacterMapping from './utils/getSelectedChineseCharacterMapping'

// Mock the random character selector to control the test cases
jest.mock('./utils/getSelectedChineseCharacterMapping')

const getSelectedChineseCharacterMappingMock =
  getSelectedChineseCharacterMapping.getSelectedChineseCharacterMapping as jest.Mock

describe('keyDownRadicalReducer', () => {
  it('should move to the next character when a single-radical character is typed correctly', () => {
    // Arrange: Mock state to start with a single-radical character '日' (a)
    const singleRadicalChar = {
      character: '日',
      radicalList: ['日'],
      englishKeyList: ['a'],
    }
    getSelectedChineseCharacterMappingMock.mockReturnValue(singleRadicalChar)

    let state = getInitialState()
    expect(state.selectedChineseCharacterMapping.character).toBe('日')

    // Mock the next character to be different, to verify we moved on
    const nextChar = {
      character: '口',
      radicalList: ['口'],
      englishKeyList: ['r'],
    }
    getSelectedChineseCharacterMappingMock.mockReturnValue(nextChar)

    // Act: Dispatch a keyDown action with the correct key 'a'
    const action = { type: 'keyDown' as const, payload: { key: 'a' } }
    state = keyDownRadicalReducer(state, action)

    // Assert: The state should be reset and moved to the next character '口'
    expect(state.selectedChineseCharacterMapping.character).toBe('口')
    expect(state.cumulatedMapList).toEqual([])
  })

  it('should handle a multi-radical character correctly', () => {
    // Arrange: Mock state to start with '不' (mf)
    const multiRadicalChar = {
      character: '不',
      radicalList: ['一', '火'],
      englishKeyList: ['m', 'f'],
    }
    getSelectedChineseCharacterMappingMock.mockReturnValue(multiRadicalChar)

    let state = getInitialState()
    expect(state.selectedChineseCharacterMapping.character).toBe('不')

    // Act: Type the first radical 'm'
    state = keyDownRadicalReducer(state, { type: 'keyDown', payload: { key: 'm' } })

    // Assert: State should be updated, but not reset
    expect(state.selectedChineseCharacterMapping.character).toBe('不')
    expect(state.cumulatedMapList).toEqual([{ radical: '一', isValid: true }])

    // Mock the next character
    const nextChar = {
      character: '中',
      radicalList: ['中'],
      englishKeyList: ['l'],
    }
    getSelectedChineseCharacterMappingMock.mockReturnValue(nextChar)

    // Act: Type the second and final radical 'f'
    state = keyDownRadicalReducer(state, { type: 'keyDown', payload: { key: 'f' } })

    // Assert: State should be reset and moved to the next character '中'
    expect(state.selectedChineseCharacterMapping.character).toBe('中')
    expect(state.cumulatedMapList).toEqual([])
  })
})

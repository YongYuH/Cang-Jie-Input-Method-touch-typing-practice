import CangJieKeyBinding from '../CangJieKeyBinding.json'
import ChineseCharacterToEnglishKey from '../ChineseCharacterToEnglishKey.json'

interface SelectedChineseCharacterMapping {
  character: string
  radicalList: string[]
}

type GetSelectedChineseCharacterPair = (randomNumber: number) => SelectedChineseCharacterMapping

const getSelectedChineseCharacterMapping: GetSelectedChineseCharacterPair = (randomNumber) => {
  const [character, englishKeyString] = Object.entries(ChineseCharacterToEnglishKey)[randomNumber]
  const radicalList = englishKeyString.split('').map((key) => CangJieKeyBinding[key])

  return { character, radicalList }
}

export type { SelectedChineseCharacterMapping }

export { getSelectedChineseCharacterMapping }

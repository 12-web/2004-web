import { GoodResponse } from '@store/types/goodApi'

export const goodMapper = (good: GoodResponse) => {
  return {
    id: good.GoodItemId,
    article: good.Article,
    brutto: good.Brutto,
    height: good.Height,
    length: good.Length,
    label: good.Name,
    netto: good.Netto,
    width: good.Width,
  }
}

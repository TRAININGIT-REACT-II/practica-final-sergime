import { shortenText } from "../client/src/notes/helpers/shortenText";

describe('#Helper functions', () => { 
  it('shortens text to 20 if no length passed parameter', () => {
    const text = "This is a very long text where I will try the shorten function"
    const shortenedText = shortenText(text)

    expect(shortenedText).toHaveLength(20)
  })

  it('shortens text to given length when passing parameter', () => {
    const text = "This is a very long text where I will try the shorten function"
    const shortenedText = shortenText(text, 30)

    expect(shortenedText).toHaveLength(30)
  })

  it('returns the same string if the string is smaller than the passed length', () => {
    const text = "Small text"
    const shortenedText = shortenText(text, 30)

    expect(shortenedText).toBe(text)
  })

  it('returns the same string if passed length is zero or negative', () => {
    const text = "This is a very long text where I will try the shorten function"
    const shortenedText = shortenText(text, -1)
    expect(shortenedText).toBe(text)
    const shortenedText2 = shortenText(text, 0)
    expect(shortenedText2).toBe(text)
  })
});
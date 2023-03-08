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
});
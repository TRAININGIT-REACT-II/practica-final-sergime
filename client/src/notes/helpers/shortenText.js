
export const shortenText = (text, nchars = 20) => {
  return text.slice(0, nchars - 1) + '…'
}
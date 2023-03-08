
export const shortenText = (text, nchars = 20) => {
  if ((nchars - 1) < 0) {
    return text
  }
  if (text.length < nchars) {
    return text
  }
  return text.slice(0, nchars - 1) + '…'
}
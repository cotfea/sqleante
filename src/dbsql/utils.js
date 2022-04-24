
const ArrayIn = arr =>
    `( ${
      arr
      .map(t => `'${t}'`)
      .join(', ')
    } )`

export {
  ArrayIn
}

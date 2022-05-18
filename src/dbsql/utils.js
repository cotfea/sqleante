const arrayIn = arr =>
  `( ${
    arr
    .map(t => `'${t}'`)
    .join(', ')
  } )`

const strWarp = str => `'${str}'`

const sqlFormat = sql =>
  sql
  .replace(/\n/g, '')
  .replace(/^ {2,}/g, '')
  .replace(/ {2,}/g, ' ')

export {
  arrayIn
, sqlFormat
, strWarp
}

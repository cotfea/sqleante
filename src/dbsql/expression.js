const ops = {
  eq: '='
, ne: '<>' // '!='
, lt: '<'
, lte: '<='
, gt: '>'
, gte: '>='

, like: 'LIKE'
, glob: 'GLOB'

, and: 'AND'
, or: 'OR'

// , not: 'NOT'
, in: 'IN'
, nin: 'NOT IN'
, exist: 'EXIST'
, nexist: 'NOT EXIST'
, between: 'BETWEEN'
, nbetween: 'NOT BETWEEN'
, is: 'IS'
, nis: 'IS NOT'
}

const checkKey = expression =>
      typeof expression === 'object'
  &&  Object.keys(expression).length === 1
  &&  new RegExp(/^\$/)
      .test(Object.keys(expression)[0])
  &&  Object.keys(ops).includes(
        Object.keys(expression)[0]
        .replace(/^\$/, '')
      )
  ?   true
  :   false

const objToArr = obj =>
  Object.keys(obj)
  .reduce(
    (r, c) => [
      ...r
    , { [c]: obj[c] }
    ]
  , []
  )

const expressionObjToStr = (
  eObj, expressionHandler
) =>
  eObj.v.length === 1
  ? `${
      ops[ eObj.k.replace(/^\$/, '') ]
    } ${
      checkKey(eObj.v[0])
      ? `( ${expressionHandler(eObj.v[0])} )`
      : e
    }`
  : eObj.v.map(
      e =>
        checkKey(e)
        ? [ 'and', 'or' ].includes(eObj.k)
        ? `( ${expressionHandler(e)} )`
        : expressionHandler(e)
        : e
    )
    .join(` ${ops[
      eObj.k.replace(/^\$/, '')
    ]} `)

const expressionHandler = expression => {

  const exObj = e => {
    return typeof e === 'object'
    ? (() => {
        const k = Object.keys(e)[0]
        return {
          k
        , v: typeof e[k] === 'object'
          ? Array.isArray(e[k])
          ? e[k]
          : objToArr(e[k])
          : []
        }
      })()
    : e
  }

  return checkKey(expression)
  ? expressionObjToStr(
      exObj(expression)
    , expressionHandler
    )
  : ''

}

export {
  checkKey
}

export default expressionHandler

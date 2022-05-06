type Ops_ = {
  [k: string]: string
}

const ops: Ops_ = {
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

type EKey = string
type EValue_ = Array<string | number>
type Expression = {
  [k: EKey]: Expression | Array<Expression> | EValue_ | [string, number, Expression] 
}
type EvalueArr = Array<Expression> | EValue_ | [string, number, Expression]
// type Evalue = Expression | EvalueArr

const checkKey = (
  expression: Expression | unknown
): boolean =>
      typeof expression === 'object'
  &&  Object.keys(expression as Expression).length === 1
  &&  new RegExp(/^\$/)
      .test(Object.keys(expression as Expression)[0])
  &&  Object.keys(ops).includes(
        Object.keys(expression as Expression)[0]
        .replace(/^\$/, '')
      )
  ?   true
  :   false

const objToArr = (
  obj: Expression
): Array<Expression> =>
  Object.keys(obj)
  .reduce(
    (
      r: Array<Expression>
    , c: EKey
    ): Array<Expression> => [
      ...r
    , { [c]: obj[c] }
    ]
  , []
  )

const expressionObjToStr = (
  eObj: {
    k: EKey
  , v: EvalueArr
  }
, expressionHandler
  : (e: Expression | unknown) => string
): string =>
  eObj.v.length === 1
  ? `${
      ops[ eObj.k.replace(/^\$/, '') ]
    } ${
      checkKey(eObj.v[0] as Expression)
      ? `( ${
          expressionHandler(
            eObj.v[0] as Expression
          )
        } )`
      : eObj.v[0]
    }`
  : eObj.v.map(
      (e: string | number | Expression): string =>
        checkKey(e)
        ? [ 'and', 'or' ].includes(eObj.k)
        ? `( ${expressionHandler(e)} )`
        : expressionHandler(e)
        : e as string
    )
    .join(` ${ops[
      eObj.k.replace(/^\$/, '')
    ]} `)

const expressionHandler =
(expression: Expression | unknown)
: string => {

  const exObj =
  (e: Expression)
  : {
    k: EKey
  , v: EvalueArr
  } => {
    const k = Object.keys(e)[0]
    return {
      k
    , v: (
        Array.isArray(e[k])
        ? e[k]
        : typeof e[k] === 'object'
        ? objToArr(e[k] as Expression)
        : [ e[k] ]
      ) as EvalueArr
    }
  }

  return checkKey(expression)
  ? expressionObjToStr(
      exObj(expression as Expression)
    , expressionHandler
    )
  : ''

}

export {
  checkKey
}

export default expressionHandler

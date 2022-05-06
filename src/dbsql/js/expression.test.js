import expressionHandler, { checkKey } from "./expression.js"

//     ( A < b )
// AND (
//         CCC >= ddd
//     OR  AGE BETTWEN 25 AND 27
//     )

const expression = {
  '$and': {
    '$lt': [
      'A'
    , 'b'
    ]
  ,
    '$or': {
      '$gte': [
        'CCC'
      , 'ddd'
      ]
    ,
      '$between': [
        'AGE'
      , {
          '$and': [
            25
          , 27
          ]
        }
      ]
    }
  }
}

// console.log(
//   Object.keys(expression['$and'])[0]
// )

// const expressionStr = checkKey(
//   // expression
//   {
//     [Object.keys(expression['$and'])[0]]:
//       expression['$and'][
//         Object.keys(expression['$and'])[0]
//       ]
//   }
// )

// console.log(expressionStr)
console.log(
  expressionHandler(expression)
)

console.log(
  expressionHandler({
    '$lt': [ 'count(name)', '2' ]
  })
)

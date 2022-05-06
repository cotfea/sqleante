import expressionHandler, { checkKey } from "./expression.ts"

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

console.log(
  expressionHandler(expression)
)

console.log(
  expressionHandler({
    '$lt': [ 'count(name)', '2' ]
  })
)

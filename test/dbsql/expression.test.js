import expressionHandler, { checkKey } from "../../src/dbsql/expression.ts"
import { assertEquals } from "../dep.js"

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

Deno.test(
  'expression base'
, () => {

    assertEquals(
      expressionHandler(expression)
    , 'A < b AND CCC >= ddd OR AGE BETWEEN 25 AND 27'
    )

    assertEquals(
      expressionHandler({
        '$lt': [ 'count(name)', '2' ]
      })
    , 'count(name) < 2'
    )
  }
)

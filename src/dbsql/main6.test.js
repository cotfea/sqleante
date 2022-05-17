import dbsql, { utils } from "./main.js"
import { randomInt } from "../../deps.js"

import { DB } from '../dep.js'
const db = new DB("sqleante.db")

const {
  pointerQuery
, showDB
, show
, dropTable
, createTable
, showSchema
, insertTable
, listTable
} = dbsql(db)

console.log(
  pointerQuery
)

console.log(showDB())

const showTables = () =>
  show("table")

console.log({
  tables: showTables()
})

showTables()
.forEach(
  t => dropTable(t)
)

console.log({
  tables: showTables()
})

createTable(
  'test1'
, {
    test2Id: "TEXT"
  , test3Id: "TEXT"
  }
)

createTable(
  'test2'
, {
    id: "INT"
  , content: "TEXT"
  }
)

createTable(
  'test3'
, {
    id: "INT"
  , content: "TEXT"
  }
)

console.log({
  tables: showTables()
})

console.log(showSchema())

const newData = () => ({
  id: randomInt(10)
, content: randomInt(50)
})

new Array(3)
.fill({})
.forEach(
  t => {
    insertTable('test2', newData())
    insertTable('test3', newData())
  }
)

const listTest2 = listTable('test2')
const listTest3 = listTable('test3')

console.log({
  test2: listTest2
})
console.log({
  test3: listTest3
})

new Array(10)
.fill({})
.forEach(
  t => {
    insertTable('test1', {
      test2Id: Object.keys(listTest2)[randomInt(3)]
    , test3Id: Object.keys(listTest3)[randomInt(3)]
    })
  }
)

console.log({
  test1: listTable('test1')
})

console.log({
  test1: pointerQuery(
    'test1'
  , {
      pointer: {
        test2Id: 'test2'
      , test3Id: 'test3'
      }
    }
  )
})

console.log({
  test1: pointerQuery(
    'test1'
  , {
      pointer: {
        test2Id: 'test2'
      , test3Id: {
          test3: [
            'id'
          , 'content'
          ]
        }
      }
    }
  )
})

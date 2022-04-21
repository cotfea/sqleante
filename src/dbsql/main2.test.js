import dbsql from './main.js'
import randomInt from 'https://deno.land/std@0.136.0/node/_crypto/randomInt.ts'

const {
  showDB
, show
, showSchema
, dropTable
, listTable
, createTable
, insertTable
, deleteFromTableByObjectId
, getFromTableByObjectId
, updateFromTableByObjectId
} = dbsql

console.log(showDB())

const showTables = () => show('table')

console.log({tables: showTables()})

showTables().forEach(
  t => dropTable(t)
)

console.log({tables: showTables()})

createTable(
  'test'
, {
    id: 'INT'
  , content: 'TEXT'
  }
)

console.log({tables: showTables()})

console.log(showSchema())

const listTest = option => listTable('test', option)

console.log({test: listTest()})

const userData = 
new Array(100).fill(0)
.map(
  (t, i) => ({
    id: i + 1
  , content: randomInt(100)
  })
)

userData
.forEach(
  insertData =>
    insertTable('test', insertData)
)

// console.log({test: listTest()})

const snipData = 
  listTest({
    select: 'content'
  , limit: 10
  , offset: 15
  , orderBy: 'content'
  })

console.log(snipData)

const randomId = Object.keys(snipData)[
  randomInt(Object.keys(snipData).length)
]

console.log(randomId)

const oneData = getFromTableByObjectId(
  'test', randomId
, {
    select: [ 'content' ]
  }
)

console.log(oneData)

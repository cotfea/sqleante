import dbsql from './main.js'

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
    id: 'INTEGER PRIMARY KEY'
  , name: 'TEXT'
  , age: 'INT'
  , address: 'TEXT'
  , salary: 'REAL'
  }
)

console.log({tables: showTables()})

console.log(showSchema())

const listTest = option => listTable('test', option)

console.log({test: listTest()})

insertTable(
  'test'
, [
    [ 'Paul', 32, 'California', 20000.0 ]
  , [ 'Allen', 25, 'Texas', 15000.0 ]
  , [ 'Teddy', 23, 'Norway', 20000.0 ]
  , [ 'Mark', 25, 'Rich-Mond', 65000.0 ]
  , [ 'David', 27, 'Texas', 85000.0 ]
  , [ 'Kim', 22, 'South-Hall', 45000.0 ]
  , [ 'James', 24, 'Houston', 10000.0 ]
  , [ 'Paul', 24, 'Houston', 20000.0 ]
  , [ 'James', 44, 'Norway', 5000.0 ]
  , [ 'James', 45, 'Texas', 5000.0 ]
  ]
)

console.log({test: listTest()})

// SELECT * FROM COMPANY GROUP BY name HAVING count(name) < 2;
const groupByHaving = () =>
  listTest({
    select: [
      'id'
    , 'name'
    , 'age'
    , 'group_concat(address) as address'
    , 'salary'
    ]
  , groupBy: 'name'
  , having: {
      '$lt': [ 'count(name)', '2' ]
    }
  })

console.log(groupByHaving())

console.log(
  listTest({
    select: 'name'
  , distinct: true
  })
)

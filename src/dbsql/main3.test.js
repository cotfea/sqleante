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
    ID: 'INTEGER PRIMARY KEY'
  , NAME: 'TEXT'
  , AGE: 'INT'
  , ADDRESS: 'TEXT'
  , SALARY: 'REAL'
  }
)

console.log({tables: showTables()})

console.log(showSchema())

const listTest = option => listTable('test', option)

console.log({test: listTest()})

insertTable(
  'test'
, [
    {
      name: 'Paul'
    , age: 32
    , address: 'California'
    , salary: 20000.0
    }
  ,
    {
      name: 'Allen'
    , age: 25
    , address: 'Texas'
    , salary: 15000.0
    }
  , {
      name: 'Teddy'
    , age: 23
    , address: 'Norway'
    , salary: 20000.0
    }
  , {
      name: 'Mark'
    , age: 25
    , address: 'Rich-Mond'
    , salary: 65000.0
    }
  , {
      name: 'David'
    , age: 27
    , address: 'Texas'
    , salary: 85000.0
    }
  , {
      name: 'Kim'
    , age: 22
    , address: 'South-Hall'
    , salary: 45000.0
    }
  , {
      name: 'James'
    , age: 24
    , address: 'Houston'
    , salary: 10000.0
    }
  ]
)

console.log({test: listTest()})

const groupByField = () =>
  listTest({
    select: [ 
      'id'
    , 'name'
    , 'sum(salary)'
    ]
  // , orderBy: 'salary'
  , groupBy: 'name'
  })

console.log(groupByField())

const insertDatas = [
  [ 'Paul', 24, 'Houston', 20000.00 ]
, [ 'James', 44, 'Norway', 5000.00 ]
, [ 'James', 45, 'Texas', 5000.00 ]
]

insertDatas
.forEach(
  t => insertTable( 'test' , t )
)

console.log(groupByField())

console.log({test: listTest()})

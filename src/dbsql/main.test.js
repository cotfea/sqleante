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
} = dbsql

console.log(showDB())

const showTables = () => show('table')
const showIndexs = () => show('index')

console.log({tables: showTables()})
console.log({indexs: showIndexs()})

showTables().forEach(
  t => dropTable(t)
)

console.log({tables: showTables()})

createTable(
  'user'
, {
    username: "TEXT"
  , phone: "TEXT"
  }
)

console.log({tables: showTables()})

console.log(showSchema())

const users = () => listTable('user')

console.log({user: users()})

const userData = [
  {
    username: '张三'
  , phone: '18971234657'
  }
, {
    username: '李四'
  , phone: '18971234657'
  }
]

userData
.forEach(
  insertData =>
    insertTable('user', insertData)
)

console.log({user: users()})

users()
.forEach(
  user => {
    const objectId = user[0]
    deleteFromTableByObjectId('user', objectId)
  }
)

console.log({user: users()})

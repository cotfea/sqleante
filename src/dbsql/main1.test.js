import dbsql from './main.js'

import { DB } from '../dep.js'
const db = new DB("test.db")

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
} = dbsql(db)

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

console.log({schema: showSchema()})

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

const objectId = Object.keys(users())[0]

console.log({objectId})

const oneUser = getFromTableByObjectId(
  'user', Object.keys(users())[0]
)

console.log({userOne: oneUser})

updateFromTableByObjectId(
  'user'
, objectId
, {
    username: '王五'
  }
)

console.log({user: users()})

updateFromTableByObjectId(
  'user'
, objectId
, {
    phone: 13012345678
  }
)

console.log({user: users()})

console.log({
  userOne: getFromTableByObjectId(
    'user', objectId
  )
})

Object.keys(users())
.forEach(
  objectId =>
    deleteFromTableByObjectId('user', objectId)
)

console.log({user: users()})

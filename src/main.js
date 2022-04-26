import { oak , DB } from './dep.js'
import dbsql from './dbsql/main.js'
import {
  getAllSchemas
, getTableSchemas
, createSchema
, deleteSchema
} from './api/schemas.js'
import {
  insertClasses
, countClasses
, getClasses
, getClassesByObjectId
, cleanClasses
, deleteClassesByObjectId
, deleteClasses
} from './api/classes.js'

const db = new DB("test.db")

const {
  showDB
, show
, showSchema
, dropTable
, createTable

, insertTable
, countTable
, listTable
, getFromTableByObjectId
, cleanTable
, deleteTable
, deleteFromTableByObjectId
, updateTable
, updateFromTableByObjectId
} = dbsql(db)

const isTableExist = tableName =>
  show('table').includes(tableName)

const router =

  new oak.Router()

  .get('/', ctx => {
    ctx.response.body = 'Hello Sqleante!!!'
  })

  .get('/api/0.1/schemas', getAllSchemas({showSchema}))

  .get('/api/0.1/schemas/:classname', getTableSchemas({
    isTableExist
  , showSchema
  }))

  .post('/api/0.1/schemas/:classname', createSchema({
    isTableExist
  , createTable
  , showSchema 
  }))

  .delete('/api/0.1/schemas/:classname', deleteSchema({
    isTableExist
  , dropTable
  , showSchema
  }))

  .post('/api/0.1/classes/:classname', insertClasses({
    isTableExist
  , insertTable
  , listTable
  }))

  .get('/api/0.1/classes/count/:classname', countClasses({
    isTableExist
  , countTable
  }))

  .get('/api/0.1/classes/:classname', getClasses({
    isTableExist
  , listTable
  }))

  .get('/api/0.1/classes/:classname/:objectId', getClassesByObjectId({
    isTableExist
  , getFromTableByObjectId
  }))

  .delete('/api/0.1/classes/clean/:classname', cleanClasses({
    isTableExist
  , cleanTable
  }))

  .delete('/api/0.1/classes/:classname/:objectId', deleteClassesByObjectId({
    isTableExist
  , getFromTableByObjectId
  , deleteFromTableByObjectId 
  }))

  .delete('/api/0.1/classes/:classname', deleteClasses({
    isTableExist
  , deleteTable
  }))

const port = 9000

console.log(`http://localhost:${port}`)

await new oak.Application()
.use(router.routes())
.use(router.allowedMethods())
.listen({ port })

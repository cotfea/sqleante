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
, updateClassesByObjectId
, updateClasses
} from './api/classes.js'

const Router = (router, db) => {

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
  , deleteFromTableByObjectId
  , deleteTable
  , updateFromTableByObjectId
  , updateTable
  } = dbsql(db)

  const isTableExist = tableName =>
    show('table').includes(tableName)

  return new router()

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

  .put(
    '/api/0.1/classes/:classname/:objectId'
  , updateClassesByObjectId({
      isTableExist
    , updateFromTableByObjectId
    })
  )

  .put(
    '/api/0.1/classes/:classname'
  , updateClasses({
      isTableExist
    , updateTable
    })
  )

}
  
export default Router

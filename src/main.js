import {
  oak
, uuid
, DB
} from './dep.js'

import dbsql from './dbsql/main.js'
const db = new DB("test.db")

const {
  showDB
, show
, showSchema
, dropTable
, listTable
, createTable
, insertTable
, deleteTable
, cleanTable
, updateTable
, deleteFromTableByObjectId
, getFromTableByObjectId
, updateFromTableByObjectId
} = dbsql(db)

const isTableExist = tableName =>
  show('table').includes(tableName)

const router =

  new oak.Router()

  .get('/', ctx => {
    ctx.response.body = 'Hello Sqleante!!!'
  })

  .get('/api/0.1/schemas', async ctx => {
    const schemas = showSchema()
    ctx.response.body = {
      results: schemas
    }
  })

  .get('/api/0.1/schemas/:classname', async ctx => {

    const { classname } =
      ctx.params
    ? ctx.params
    : { classname: '' }

    ctx.response.body =
      isTableExist(classname)
    ? {
        code: 200
      , results: showSchema(classname)
      }
    : {
        code: 202
      , error: `class ${classname} is not exist.`
      }

  })

  .post('/api/0.1/schemas/:classname', async ctx => {

    const { classname } =
      ctx.params
    ? ctx.params
    : { classname: '' }

    const reqData = await ctx.request.body({type: 'json'}).value

    createTable(classname, reqData)

    ctx.response.body =
      isTableExist(classname)
    ? {
        code: 200
      , results: showSchema(classname)
      }
    : {
        code: 201
      , error: `class ${classname} creation failed.`
      }

  })

  .delete('/api/0.1/schemas/:classname', async ctx => {
    const { classname } =
      ctx.params
    ? ctx.params
    : { classname: '' }

    dropTable(classname)

    ctx.response.body =
      !isTableExist(classname)
    ? {
        code: 200
      , results: showSchema(classname)
      }
    : {
        code: 201
      , error: `class ${classname} deletion failed.`
      }

  })

  .post('/api/0.1/classes/:classname', async ctx => {

    const { classname } =
      ctx.params
    ? ctx.params
    : { classname: '' }

    const reqData = await ctx.request.body({type: 'json'}).value

    ctx.response.body =
      isTableExist(classname)
    ? (() => {
        const rawCount = () => Object.keys(listTable(classname)).length
        const rawCountBefore = rawCount()

        const retData = insertTable(classname, reqData)
        const rawCountAfter = rawCount()

        return rawCountBefore < rawCountAfter
        ? {
            code: 200
          , results: retData
          }
        : {
            code: 201
          , error: `class ${classname} data insertion failed`
          }
        })()
    : {
        code: 202
      , error: `class ${classname} is not exist.`
      }
  })

  .get('/api/0.1/classes/:classname', ctx => {

    const { classname } =
      ctx.params
    ? ctx.params
    : { classname: '' }

    ctx.response.body =
      isTableExist(classname)
    ? (() => {
        const r = listTable(classname)
        const keys = Object.keys(r)
        return {
          code: 200
        , count: Object.keys(r).length
        , keys          
        , results: r
        }
      })()
    : {
        code: 202
      , error: `class ${classname} is not exist.`
      }
  })

  .delete('/api/0.1/classes/:classname', ctx => {

    const { classname } =
      ctx.params
    ? ctx.params
    : { classname: '' }

    ctx.response.body =
      isTableExist(classname)
    ? (() => {
        cleanTable(classname)
        const r = listTable(classname)
        const keys = Object.keys(r)
        return {
          code: 200
        , count: Object.keys(r).length
        , keys          
        , results: r
        }
      })()
    : {
        code: 202
      , error: `class ${classname} is not exist.`
      } 
  })

  .get('/api/0.1/classes/:classname/:objectId', ctx => {

    const {
      classname
    , objectId
    } =
      ctx.params
    ? ctx.params
    : {
        classname: ''
      , objectId: ''
      }

    ctx.response.body =
      isTableExist(classname)
    ? {
        code: 200
      , results: getFromTableByObjectId(classname, objectId)
      }
    : {
        code: 202
      , error: `class ${classname} is not exist.`
      }

  })

const port = 9000

console.log(`http://localhost:${port}`)

await new oak.Application()
.use(router.routes())
.use(router.allowedMethods())
.listen({ port })

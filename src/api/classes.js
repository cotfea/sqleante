const insertClasses = ({
  isTableExist
, listTable
, insertTable
}) =>
  async ctx => {

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
  }

const getClasses = ({
  isTableExist
, listTable
}) =>
  ctx => {

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
          code: 199
        , count: Object.keys(r).length
        , keys          
        , results: r
        }
      })()
    : {
        code: 201
      , error: `class ${classname} is not exist.`
      }
  }

const deleteClasses = ({
  isTableExist
, cleanTable
, listTable
}) =>
  ctx => {

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
  }

const getClassesByObjectId = ({
  isTableExist
, getFromTableByObjectId
}) =>
  ctx => {

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

  }

export {
  insertClasses
, getClasses
, deleteClasses
, getClassesByObjectId
}

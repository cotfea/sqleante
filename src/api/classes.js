const insertClasses = ({
  isTableExist
, insertTable
, listTable
}) => async ctx => {

  const { classname } =
    ctx.params
  ? ctx.params
  : { classname: '' }

  const reqData = await ctx.request.body({type: 'json'}).value

  ctx.response.body =
    isTableExist(classname)
  ? (() => {
      const retData = insertTable(classname, reqData)
      return (
          typeof retData === 'string'
      &&  listTable(classname, retData)
      )
      ||  reqData.length === Object.keys(retData).length
      ?   {
            code: 200
          , results: retData
          }
      :   {
            code: 201
          , error: `class ${classname} data insertion failed`
          }
      })()
  : {
      code: 202
    , error: `class ${classname} is not exist.`
    }
}

const countClasses = ({
  isTableExist
, countTable
}) => ctx => {

  const { classname } =
    ctx.params
  ? ctx.params
  : { classname: '' }

  ctx.response.body =
    isTableExist(classname)
  ? {
      code: 200
    , results: countTable(classname)
    }
  : {
      code: 201
    , error: `class ${classname} is not exist.`
    }

}

const getClasses = ({
  isTableExist
, listTable
}) => ctx => {

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
      code: 201
    , error: `class ${classname} is not exist.`
    }
}

const getClassesByObjectId = ({
  isTableExist
, getFromTableByObjectId
}) => ctx => {

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

const cleanClasses = ({
  isTableExist
, cleanTable
}) => ctx => {

  const { classname } =
    ctx.params
  ? ctx.params
  : { classname: '' }

  ctx.response.body =
    isTableExist(classname)
  ? {
      code: 200
    , results: cleanTable(classname)
    }
  : {
      code: 202
    , error: `class ${classname} is not exist.`
    } 
}

const deleteClassesByObjectId = ({
  isTableExist
, getFromTableByObjectId
, deleteFromTableByObjectId 
}) => ctx => {

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
  ? Object.keys(getFromTableByObjectId(classname, objectId)).length === 0
  ? {
      code: 199
    , error: `${objectId} is node found in ${classname}.`
    }
  : (() => {
      const ret = deleteFromTableByObjectId(classname, objectId)
      return Array.isArray(ret)
      && ret.length === 1
      && ret[0] === objectId
      ? {
          code: 200
        , results: ret[0]
        }
      : {
          code: 201
        , error: `delete ${objectId} from ${classname} is failed.`
        }
    })()
  : {
      code: 202
    , error: `class ${classname} is not exist.`
    }

}

// const deleteClasses = ({
//   isTableExist
// , deleteTable
// }) => ctx => {

//   const { classname } =
//     ctx.params
//   ? ctx.params
//   : { classname: '' }

//   const reqData = await ctx.request.body({type: 'json'}).value

//   ctx.response.body =
//     isTableExist(classname)
//   ? (() => {
//       deleteTable(classname, reqData)
//     })()
//   : {
//       code: 202
//     , error: `class ${classname} is not exist.`
//     }

// }

export {
  insertClasses
, countClasses
, getClassesByObjectId
, getClasses
, cleanClasses
, deleteClassesByObjectId
// , deleteClasses
// , updateClasses
// , updateClassesByObjectId
}

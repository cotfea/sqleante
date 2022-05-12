const getAllSchemas = ({showSchema}) =>
  async ctx => {
    const schemas = showSchema()
    ctx.response.body = {
      results: schemas
    }
  }

const getTableSchemas = ({
  isTableExist
, showSchema
}) =>

  async ctx => {

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

  }

const createSchema = ({
  isTableExist
, createTable
, showSchema
}) =>
async (ctx) => {

    const { classname } =
      ctx.params
    ? ctx.params
    : { classname: '' }
    const reqData = await ctx.request.body({type: 'json'}).value

    ctx.response.body =
      !isTableExist(classname)
    ? ( () => {
        createTable(classname, reqData)
        return isTableExist(classname)
        ? {
            code: 200
          , results: showSchema(classname)
          }
        : {
            code: 201
          , error: `class ${classname} creation failed.`
          }
      })()
    : {
        code: 202
      , error: `class ${classname} is already exists.`
      }
  }

const deleteSchema = ({
  isTableExist
, dropTable
, showSchema
}) =>
  async ctx => {
    const { classname } =
      ctx.params
    ? ctx.params
    : { classname: '' }

    ctx.response.body =
      isTableExist(classname)
    ? (() => {
        const schema = showSchema(classname)
        dropTable(classname)
        return !isTableExist(classname)
        ? {
            code: 200
          , results: schema
          }
        : {
            code: 201
          , error: `class ${classname} deletion failed.`
          }
      })()
    : {
        code: 202
      , error: `class ${classname} is not exist.`
      }

  }

export {
  getAllSchemas
, getTableSchemas
, createSchema
, deleteSchema
}

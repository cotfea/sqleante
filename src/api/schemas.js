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
  async ctx => {

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

  }

export {
  getAllSchemas
, getTableSchemas
, createSchema
, deleteSchema
}

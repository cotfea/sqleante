import ddl from './ddl.js'

const groupByObjectId = (
  qryArr, db, tableName, option
) => {

  const schemaKeys = Object.keys(
    ddl(db).showSchema(tableName)
  )

  const fileds =
    option?.select
    ? Array.isArray(option.select)
    ? [ 'objectId', ...option.select ]
    : [ 'objectId', option.select ]
    : schemaKeys

  return qryArr
  .map(
    t => t.reduce(
      (r, c, i) => ({
        ...r
      , [fileds[i]]: c
      })
    , {}
    )
  )

  .reduce(
    (r, c) => {
      const {
        objectId
      , ...otherDatas
      } = c
      return {
        ...r
      , [c.objectId]: otherDatas
      }
    }
  , {}
  )

}

const main = db => {

  const listTable = (tableName, option) =>

    groupByObjectId(
      db.query(`
        SELECT ${
          option?.select
          ? Array.isArray(option.select)
          ? `objectId, ${option.select.join(' ')}`
          : `objectId, ${option.select}`
          : '*'
        }
        FROM ${tableName}
        ${
          option?.orderBy
          ? Array.isArray(option.orderBy)
          ? `ORDER BY ${option.orderBy.join(' ')}`
          : `ORDER BY ${option.orderBy}`
          : ``
        }
        ${
          option?.limit
          ? `LIMIT ${option.limit}`
          : ''
        }
        ${
          option?.offset
          ? `OFFSET ${option.offset}`
          : ''
        }
      `)
    , db, tableName
    , option
    )

  const getFromTableByObjectId = (tableName, objectId, option) =>

    groupByObjectId(
      db.query(`
        SELECT ${
          option?.select
          ? Array.isArray(option.select)
          ? `objectId, ${option.select.join(' ')}`
          : `objectId, ${option.select}`
          : '*'
        }
        FROM ${tableName}
        WHERE objectId = '${objectId}'
      `)
    , db, tableName
    , option
    )
    [objectId]

  return {
    listTable
  , getFromTableByObjectId
  }

}

export default db => main(db)

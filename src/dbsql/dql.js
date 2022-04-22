import ddl from './ddl.js'
import expressionHandler from './expression.js'

const groupByObjectId = (
  qryArr, db, tableName, option
) => {

  const schemaKeys = Object.keys(
    ddl(db).showSchema(tableName)
  )

  const fields =
    option?.select
    ? Array.isArray(option.select)
    ? [ 'objectId', ...option.select ]
    : option?.distinct
    ? [ option.select ]
    : [ 'objectId', option.select ]
    : schemaKeys

  return Array.isArray(fields)
  &&  fields.length === 1
  ? qryArr.reduce(
      (r, c) => [
        ...r
      , ...c
      ]
    , []
    )
  : qryArr
    .map(
      t => t.reduce(
        (r, c, i) => ({
          ...r
        , [
            (() => {
              const fieldArr =
                fields[i]
                .replace(/\n/g, '')
                .replace(/ {2,}/g, ' ')
                .split(' ')
              return fieldArr.length >= 3
              ? fieldArr[fieldArr.length - 2].toLowerCase() === 'as'
              ? fieldArr[fieldArr.length - 1]
              : fields[i]
              : fields[i]
            })()
          ]: c
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
        SELECT
        ${
          option?.select
          ? Array.isArray(option.select)
          ? `objectId, ${option.select.join(', ')}`
          : option?.distinct
          ? `DISTINCT ${option.select}`
          : `objectId, ${option.select}`
          : '*'
        }
        FROM ${tableName}
        ${
          option?.where
          ? `WHERE ${expressionHandler(option.where)}`
          : ''
        }
        ${
          option?.groupBy
          ? Array.isArray(option.groupBy)
          ? `GROUP BY ${option.groupBy.join(', ')}`
          : `GROUP BY ${option.groupBy}`
          : ``
        }
        ${
          option?.groupBy && option?.having
          ? `HAVING ${expressionHandler(option.having)}`
          : ''
        }
        ${
          option?.orderBy
          ? Array.isArray(option.orderBy)
          ? `ORDER BY ${option.orderBy.join(', ')}`
          : `ORDER BY ${option.orderBy}`
          : ``
        }
        ${
          option?.limit || option?.offset
          ? `LIMIT ${
              option?.limit
              ? option?.limit
              : 100
            }`
          : ''
        }
        ${
          option?.offset && option?.limit
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
          ? `objectId, ${option.select.join(', ')}`
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

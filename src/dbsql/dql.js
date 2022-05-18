import ddl from './ddl.js'
import expressionHandler from './expression.ts'

const groupByObjectId = (
  qryArr, query, tableName, option = {}
) => {

  const schemaKeys = Object.keys(
    ddl(query).showSchema(tableName)
  )

  const fields =
    option?.select
    ?   Array.isArray(option.select)
    ?   option.select.length === 1
    &&  option.select[0] === 'count(*)'
    ?   option.select
    :   [ 'objectId', ...option.select ]
    :   option?.distinct
    ?   [ option.select ]
    :   [ 'objectId', option.select ]
    :   schemaKeys

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

const main = query => {

  // 获取某个表数据
  const listTable = (
    tableName, option = {}
  ) =>

    groupByObjectId(
      query({
        ns: 'listTable'
      , sql: `
          SELECT
          ${
            option?.select
            ?   Array.isArray(option.select)
            ?   option.select.length === 1
            &&  option.select[0] === 'count(*)'
            ?   option.select[0]
            :   `objectId, ${option.select.join(', ')}`
            :   option?.distinct
            ?   `DISTINCT ${option.select}`
            :   `objectId, ${option.select}`
            :   '*'
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
        `
      })
    , query, tableName
    , option
  )

  // 获取某个表指定id的那条数据
  const getFromTableByObjectId = (
    tableName, objectId, option = {}
  ) =>
    groupByObjectId(
      query({
        ns: 'getFromTableByObjectId'
      , sql: `
          SELECT ${
            option?.select
            ? Array.isArray(option.select)
            ? `objectId, ${option.select.join(', ')}`
            : `objectId, ${option.select}`
            : '*'
          }
          FROM ${tableName}
          WHERE objectId = '${objectId}'
        `
      })
    , query, tableName
    , option
    )

  // 获取某个表的总数据量
  const countTable = (
    tableName, option = {}
  ) =>
    listTable(tableName, {
      ...option
    , select: [
        'count(*)'
      ]
    })
    [0]

  const pointerQuery = (
    tableName, option = {}
  ) => {

    const {
      pointer
    , ..._option
    } =
      Object.keys(option)
      .includes('pointer')
    ? option
    : {
        pointer: {}
      , ...option
      }

    const mainTableDatas = listTable(tableName, _option)
    const pointerFields = Object.keys(pointer)

    if(!pointer || pointerFields.length === 0) {
      return mainTableDatas
    }

    const filedData = pointerFields.reduce(
      (r, p) => ({
        ...r
      , [p]:
          Object.values(mainTableDatas)
          .map(
            t => t[p]
          )
      })
    , {}
    )

    const otherTableDatas = pointerFields.reduce(
      (r, f) => {
        const result = {
          tableName: ''
        , data: {}
        }

        const wherein = {
          where: {
            $in: [
              'objectId'
            , `(${
                Array.from(
                  new Set(
                    filedData[f]
                  )
                )
                .map(t => `'${t}'`)
                .join(', ')
              })`
            ]
          }
        }

        switch(typeof pointer[f]) {

          case 'string':
            result.tableName = pointer[f]
            result.data = {
              [result.tableName]: listTable(
                result.tableName
              , wherein
              )
            }
            break

          case 'object':
            result.tableName = [Object.keys(pointer[f])[0]]
            const fields = pointer[f][result.tableName]
            result.data = {
              [result.tableName]: listTable(
                result.tableName
              , {
                  select: fields
                , ...wherein
                }
              )
            }
            break

          default:
            result.data = {}
            break
        }


        return {
          ...r
        , ...result.data
        }

      }
    , {}
    )

    return {
      tableName: mainTableDatas
    , ...otherTableDatas
    }

  }

  return {
    listTable
  , getFromTableByObjectId
  , countTable
  , pointerQuery
  }

}

export default query => main(query)

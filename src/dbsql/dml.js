import { uuid } from '../dep.js'
import dql from './dql.js'
import ddl from './ddl.js'

const main = query => {

  const insertTableOne = (
      tableName
    , insertData
    , schemaKeys
    , needHeader = true
  ) => {

    const entries =
      Array.isArray(insertData)
      ? {
          keys: schemaKeys
        , values: insertData
        }
      : {
          keys: Object.keys(insertData)
        , values: Object.values(insertData)
        }

    return `
      ${
        needHeader
        ? `
          INSERT INTO ${tableName}
          (
            objectId
          , ${entries.keys.join(', ')}
          )
          VALUES
        `
        : ''
      }
      (
        '${uuid()}'
      , ${
          entries.values
          .map(t => `'${t}'`)
          .join(', ')
        }
      )
    `
  }

  const insertTable = (tableName, insertData) => {

    const schema = ddl(query).showSchema(tableName)
    const schemaKeys = Object.keys( schema )
    .filter(
      t =>
            schema[t] === 'INTEGER PRIMARY KEY'
        ||  t === 'objectId'
        ?   false
        :   true
    )

        Array.isArray(insertData)
    &&  insertData.reduce(
          (r, c) =>
                r === true
            ||  Array.isArray(c)
            ||  typeof c === 'object'
            ?   true
            :   r
        , false
        )

    ?   query(
          insertData.map(
            (t, i) => insertTableOne(
              tableName, t, schemaKeys
            ,   i === 0
              ? true
              : false
            )
          )
          .join(',')
        )
    :   query(
          insertTableOne(tableName, insertData, schemaKeys)
        )

  }

  const deleteFromTableByObjectId = (tableName, ObjectId) =>
    query(`
      DELETE FROM ${tableName}
      ${
        ObjectId
        ? `WHERE objectId = '${ObjectId}'`
        : ''
      }
    `)

  const updateFromTableByObjectId = (tableName, ObjectId, newData) => {
    const { getFromTableByObjectId } = dql(query)
    const oldData = getFromTableByObjectId(tableName, ObjectId)
    const _newData = {
      ...oldData
    , ...newData
    }
    query(`
      UPDATE ${tableName}
      SET ${
        Object.entries(_newData)
        .reduce(
          (r, c) => [
            ...r
          , `${c[0]} = '${c[1]}'`
          ]
        , []
        )
        .join(', ')
      }
      WHERE objectId = '${ObjectId}'
    `)
  }

  return {
    insertTable
  , deleteFromTableByObjectId
  , updateFromTableByObjectId
  }

}

export default query => main(query)

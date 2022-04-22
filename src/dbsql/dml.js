import { uuid } from '../dep.js'
import dql from './dql.js'
import ddl from './ddl.js'

const main = db => {

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

    const schema = ddl(db).showSchema(tableName)
    const schemaKeys = Object.keys( schema )
    .filter(
      t =>
            schema[t] === 'INTEGER PRIMARY KEY'
        ||  t === 'objectId'
        ? false
        : true
    )

        Array.isArray(insertData)
    &&  insertData.reduce(
          (r, c) =>
                typeof c === 'object'
            ||  Array.isArray(c)
            ||  r === true
            ?   true
            :   r
        , false
        )

    ? db.query(
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
    : db.query(insertTableOne(tableName, insertData, schemaKeys))

  }

  const deleteFromTableByObjectId = (tableName, ObjectId) =>
    db.query(`
      DELETE FROM ${tableName}
      ${
        ObjectId
        ? `WHERE objectId = '${ObjectId}'`
        : ''
      }
    `)

  const updateFromTableByObjectId = (tableName, ObjectId, newData) => {
    const { getFromTableByObjectId } = dql(db)
    const oldData = getFromTableByObjectId(tableName, ObjectId)
    const _newData = {
      ...oldData
    , ...newData
    }
    db.query(`
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

export default db => main(db)

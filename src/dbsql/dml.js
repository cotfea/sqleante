import { uuid } from '../dep.js'
import dql from './dql.js'

const main = db => {

  const insertTable = (tableName, insertData) =>  {
    const entries = {
      keys: Object.keys(insertData)
    , values: Object.values(insertData)
    }
    return db.query(`
      INSERT INTO ${tableName}
      (
        objectId
      , ${entries.keys.join(', ')}
      )
      VALUES
      (
        '${uuid()}'
      , ${
          entries.values
          .map(t => `'${t}'`)
          .join(', ')
        }
      )
    `)
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

import { uuid } from '../dep.js'

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

  return {
    insertTable
  , deleteFromTableByObjectId
  }

}

export default db => main(db)

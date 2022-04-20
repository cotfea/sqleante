import ddl from './ddl.js'

const groupByObjectId = (qryArr, db, tableName) => {

  const schemaKeys = Object.keys(
    ddl(db).showSchema(tableName)
  )

  return qryArr
  .map(
    t => t.reduce(
      (r, c, i) => ({
        ...r
      , [schemaKeys[i]]: c
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

  const listTable = tableName =>

    groupByObjectId(
      db.query(`
        SELECT *
        FROM ${tableName}
      `)
    , db, tableName
    )

  const getFromTableByObjectId = (tableName, objectId) =>

    groupByObjectId(
      db.query(`
        SELECT *
        FROM ${tableName}
        WHERE objectId = '${objectId}'
      `)
    , db, tableName
    )
    [objectId]

  return {
    listTable
  , getFromTableByObjectId
  }

}

export default db => main(db)

const main = query => {

  const showDB = () => // sqlite_schema
    query(`
      SELECT * FROM sqlite_master
    `)

  const show = type =>
    showDB().reduce(
      (r, c) => [
        ...r
      , ...c[0] === type
        ? [ c[1] ]
        : []
      ]
    , []
    )

  const showSchema = tableName => {
    const ret = showDB().reduce(
      (r, c) => ({
        ...r
      , ...c[0] === 'table'
        ? {
            [c[1]]:
              c[4]
              .replace(/\n/g, '')
              .replace(/ {2,}/g, ' ')
              .match(/(?<=\().+(?=\))/)[0]
              .trim()
              .split(',')
              .map(t => t.trim())
              .reduce(
                (r, c) => {
                  const arr = c.split(' ')
                  return {
                    ...r
                  , [arr[0]]: arr.slice(1, arr.length).join(' ')
                  }
                }
              , {}
              )
          }
        : {}
      })
    , {}
    )
    return tableName && ret[tableName]
    ? ret[tableName]
    : ret
  }

  const createTable = (tableName, schema) => {
    const _schema = {
      objectId: 'TEXT UNIQUE'
    , ...schema
    }
    return query(`
      CREATE TABLE IF NOT EXISTS ${tableName} (
        ${
          Object.keys(_schema)
          .reduce(
            (r, c) => [
              ...r
            , `${c} ${_schema[c]}`
            ]
          , []
          )
          .join(', ')
        }
      )
    `)
  }

  const dropTable = tableName =>
    query(`
      DROP TABLE IF EXISTS ${tableName}
    `)

  return {
    showDB
  , show
  , showSchema
  , createTable
  , dropTable
  }

}

export default query => main(query)

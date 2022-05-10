const main = query => {

  // 获取SQLite数据库信息
  const showDB = () =>
    query({
      ns: 'showDB'
      // sqlite_schema
    , sql: 'SELECT * FROM sqlite_master'
    })

  // 获取所有表名或索引名 type:"table"||"index"
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

  // 查询所有表结构
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

  // 创建某个数据表
  const createTable = (tableName, schema) => {
    const _schema = {
      objectId: 'TEXT UNIQUE'
    ,  ...schema
    , createdAt: 'TEXT'
    , updatedAt: 'TEXT'
    }
    return query({
      ns: 'createTable'
    // , ret: tableName
    , sql: `
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
      `
    })
  }

  // 删除某个数据表
  const dropTable = tableName =>
    query({
      ns: 'dropTable'
    // , ret: tableName
    , sql: `
        DROP TABLE IF EXISTS ${tableName}
      `
    })

  return {
    showDB
  , show
  , showSchema
  , createTable
  , dropTable
  }

}

export default query => main(query)

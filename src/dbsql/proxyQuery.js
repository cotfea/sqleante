import { sqlFormat } from "./utils.js"

export default db => sqlRunner => {
  // console.log({sql_ns: sqlRunner.ns})

  const sql = sqlFormat( sqlRunner.sql )
  console.log('sql:\n', sql)

  const queryData = db.query(sql)
  // console.log({queryData})

  // console.log({sql_ret: typeof sqlRunner.ret})

  // console.log(sqlRunner.ns)

  const ret = sqlRunner.ret
  ? typeof sqlRunner.ret === 'function'
  ? sqlRunner.ret(queryData)
  : sqlRunner.ret
  : queryData

  // console.log({ret})

  return ret
}

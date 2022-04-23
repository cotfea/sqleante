import ddl from './ddl.js'
import dql from './dql.js'
import dml from './dml.js'

import query from './proxyQuery.js'

export default {
  ...ddl(query)
, ...dql(query)
, ...dml(query)
}

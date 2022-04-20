import { DB } from '../dep.js'

import ddl from './ddl.js'
import dql from './dql.js'
import dml from './dml.js'

const db = new DB("test.db")

export default {
  ...ddl(db)
, ...dql(db)
, ...dml(db)
}

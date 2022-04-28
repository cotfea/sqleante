import ddl from "./ddl.js";
import dql from "./dql.js";
import dml from "./dml.js";

import query from "./proxyQuery.js";

import * as utils from "./utils.js";
export { utils };

export default db => ({
  ...ddl(query(db))
, ...dql(query(db))
, ...dml(query(db))
})

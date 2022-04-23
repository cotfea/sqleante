import { DB } from '../dep.js'

const db = new DB("test.db")

export default sql => {
  // console.log(sql)
  return db.query(sql)
}

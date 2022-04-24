import { DB } from '../dep.js'

const db = new DB("test.db")

export default sql => {
  // console.log(
  //   sql
  //   .replace(/\n/g, '')
  //   .replace(/^ {2,}/g, '')
  //   .replace(/ {2,}/g, ' ')
  // )
  return db.query(sql)
}

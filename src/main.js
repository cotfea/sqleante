import {
  oak
, uuid
, DB
} from './dep.js'

// Open a database
const db = new DB("test.db")

// const names = ["Peter Parker", "Clark Kent", "Bruce Wayne"];

// // Run a simple query
// for (const name of names) {
//   db.query("INSERT INTO people (name) VALUES (?)", [name]);
// }

// // Print out data in table
// for (const [name] of db.query("SELECT name FROM people")) {
//   console.log(name);
// }

// Close connection
// db.close();

const router =
  new oak.Router()

  .get('/', ctx => {
    ctx.response.body = 'Hello World!!!'
  })

  .post('/api/1.1/classes/:classname', async ctx => {

    const { classname } =
        ctx.params
      ? ctx.params
      : { classname: '' }

    const rJson = await ctx.request.body({type: 'json'}).value

    db.query(`
      CREATE TABLE IF NOT EXISTS user (
        objectId  TEXT PRIMARY KEY
      , username  TEXT
      , phone     TEXT
      )
    `)

    db.query(`
      INSERT INTO ${classname}
      (
        objectId
      , username
      , phone
      )
      VALUES
      (
      , ${uuid()}
      , ${rJson.classname}
      , ${rJson.phone}
      )
    `)

    ctx.response.body = {}
  })

  .get('/api/1.1/classes/:classname', ctx => {
    const { classname } =
        ctx.params
      ? ctx.params
      : { classname: '' }
    ctx.response.body = `Hello ${classname}!!!`
  })

  .get('/api/1.1/classes/:classname/:objectId', ctx => {
    const {
      classname
    , objectId
    } =
        ctx.params
      ? ctx.params
      : {
          classname: ''
        , objectId: ''
        }
    ctx.response.body = `Hello ${classname} ${objectId}!!!`
  })

console.log('http://localhost:9000')

await new oak.Application()
.use(router.routes())
.use(router.allowedMethods())
.listen({ port: 9000 })

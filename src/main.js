import { oak, DB, Command } from './dep.js'
import Router from './router.js'

const controller = new AbortController()
const { signal } = controller

const global = {}

const { args } = await new Command()

.name('sqleante-cli')
.version('0.0.1')

.description(
  'BaaS DB Sqleate like LeanCloud DB Service.'
)

.arguments("[file]")

.parse(Deno.args)

const [ dbfile ] = args

const app = new oak.Application()

app.addEventListener(
  'listen'
, ({ hostname, port, secure }) => {
    console.log(
      `Listening on: ${"http://"}${
        hostname ??  "localhost"
      }:${port}`
    )
  }
)

app.addEventListener(
  'error', (evt) => {
    console.log(evt.error)
  }
)

const Start = async (
  dbfile = './sqleante.db'
, port = 9000
) => {

  global.db = new DB(dbfile)
  const router = Router(oak.Router, global.db)

  global.listenPromise = app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen({ port }, signal)

  controller.abort()

  await global.listenPromise

}

await Start(dbfile)

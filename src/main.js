import { oak , DB } from './dep.js'

import Router from './router.js'

const db = new DB("test.db")

const router = Router(oak.Router, db)

const port = 9000
console.log(`http://localhost:${port}`)

await new oak.Application()
.use(router.routes())
.use(router.allowedMethods())
.listen({ port })

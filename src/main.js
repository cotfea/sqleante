import { oak, DB } from "./dep.js";
import dbsql from "./dbsql/main.js";
import {
  getAllSchemas,
  getTableSchemas,
  createSchema,
  deleteSchema,
} from "./api/schemas.js";
import {
  insertClasses,
  getClasses,
  deleteClasses,
  getClassesByObjectId,
} from "./api/classes.js";

const db = new DB("test.db");

const {
  showDB,
  show,
  showSchema,
  dropTable,
  listTable,
  createTable,
  insertTable,
  deleteTable,
  cleanTable,
  updateTable,
  deleteFromTableByObjectId,
  getFromTableByObjectId,
  updateFromTableByObjectId,
} = dbsql(db);

const isTableExist = (tableName) => show("table").includes(tableName);

const router = new oak.Router()

  .get("/", (ctx) => {
    ctx.response.body = "Hello Sqleante!!!";
  })

  .get("/api/0.1/schemas", getAllSchemas({ showSchema }))

  .get(
    "/api/0.1/schemas/:classname",
    getTableSchemas({
      isTableExist,
      showSchema,
    })
  )

  .post(
    "/api/0.1/schemas/:classname",
    createSchema({
      isTableExist,
      createTable,
      showSchema,
    })
  )

  .delete(
    "/api/0.1/schemas/:classname",
    deleteSchema({
      isTableExist,
      dropTable,
      showSchema,
    })
  )

  .post(
    "/api/0.1/classes/:classname",
    insertClasses({
      isTableExist,
      listTable,
      insertTable,
    })
  )

  .get(
    "/api/0.1/classes/:classname",
    getClasses({
      isTableExist,
      listTable,
    })
  )

  .delete(
    "/api/0.1/classes/:classname",
    deleteClasses({
      isTableExist,
      cleanTable,
      listTable,
    })
  )

  .get(
    "/api/0.1/classes/:classname/:objectId",
    getClassesByObjectId({
      isTableExist,
      getFromTableByObjectId,
    })
  );

const port = 9000;

console.log(`http://localhost:${port}`);

await new oak.Application()
  .use(router.routes())
  .use(router.allowedMethods())
  .listen({ port });

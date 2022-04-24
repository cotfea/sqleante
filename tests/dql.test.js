import dbsql from "../src/dbsql/main.js";

const {
  showSchema,
  listTable,
  getFromTableByObjectId,
} = dbsql;


Deno.test({
  name: "测试打印1个数据表的所有数据",
  fn: () => {
    const tableName = Object.keys(showSchema())[1];

    const res = listTable(tableName);
    console.log(res);
  },
});

Deno.test({
  name: "测试通过objectId获取对应的1条数据",
  fn: () => {
    const tableName = Object.keys(showSchema())[1];
    const ObjectId = Object.keys(listTable(tableName))[0];

    const res = getFromTableByObjectId(tableName,ObjectId);
    console.log(res);
  },
});


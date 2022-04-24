import dbsql from "../src/dbsql/main.js";

const {
  showDB,
  show,
  showSchema,
  createTable,
  listTable,
  insertTable,
  getFromTableByObjectId,
  updateFromTableByObjectId,
  deleteFromTableByObjectId,
  dropTable,
} = dbsql;

Deno.test({
  name: "测试打印数据库信息",
  fn: () => {
    console.log(showDB());
  },
});

Deno.test({
  name: "测试打印所有数据表表名",
  fn: () => {
    console.log(show('table'));
  },
});

Deno.test({
  name: "测试打印所有表结构",
  fn: () => {
    console.log(showSchema());
  },
});


Deno.test({
  name: "测试新增1个数据表",
  fn: () => {
    const res = createTable("tableOne", {
      field1: "TEXT",
      field2: "int",
      field3: "NUMERIC",
      field4: "REAL",
    });
    console.log(res);
  },
});

Deno.test({
  name: "测试给数据表加1条数据",
  fn: () => {
    const tableName = Object.keys(showSchema())[1];
    const res = insertTable(tableName, {
      field1: "TEXT",
      field2: "1",
      field3: false,
      field4: "2022-04-24",
    });
    console.log(res);
  },
});

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

Deno.test({
  name: "测试通过objectId更改对应的1条（第1条）数据",
  fn: () => {
    const tableName = Object.keys(showSchema())[1];
    const dataObj = listTable(tableName);
    const keysArr = Object.keys(dataObj);
    if(keysArr.length){

      const ObjectId = Object.keys(listTable(tableName))[0];
      const res = updateFromTableByObjectId(tableName,ObjectId,{
        field4: "2022-01-24",
      });
      console.log(res);
    }
  },
});

Deno.test({
  name: "测试再次打印1个数据表的所有数据",
  fn: () => {
    const tableName = Object.keys(showSchema())[1];

    const res = listTable(tableName);
    console.log(res);
  },
});

Deno.test({
  name: "测试通过objectId删除对应的1条（最后1条）数据",
  fn: () => {
    const tableName = Object.keys(showSchema())[1];
    const dataObj = listTable(tableName);
    const keysArr = Object.keys(dataObj);
    if(keysArr.length){

      const ObjectId = Object.keys(listTable(tableName))[keysArr.length-1];
      const res = deleteFromTableByObjectId(tableName,ObjectId);
      console.log(res);
    }
  },
});

Deno.test({
  name: "测试再次打印1个数据表的所有数据",
  fn: () => {
    const tableName = Object.keys(showSchema())[1];

    const res = listTable(tableName);
    console.log(res);
  },
});

Deno.test({
  name: "测试删除1个数据表",
  fn: () => {
    const tableName = Object.keys(showSchema())[1];

    const res = dropTable(tableName);
    console.log(res);
  },
});

Deno.test({
  name: "测试再次打印所有数据表表名",
  fn: () => {
    console.log(show('table'));
  },
});
import dbsql from "../src/dbsql/main.js";
import { DB } from '../deps.js'
import { assertEquals } from "https://deno.land/std@0.136.0/testing/asserts.ts";

const db = new DB("test.db")

const {
  showSchema,
  listTable,
  getFromTableByObjectId,
} = dbsql(db);


Deno.test({
  name: "测试打印1个数据表的所有数据(第1个新增的数据表)",
  fn: () => {
    // 获取第1个新增的表名
    const tableName = Object.keys(showSchema())[0];

    // 获取这个表所有数据
    const res = listTable(tableName);
    // console.log(res);
    const isObj=Object.prototype.toString.call(res) === '[object Object]'

    assertEquals(isObj,true)
  },
});

Deno.test({
  name: "测试通过objectId获取对应的1条数据",
  fn: () => {
     // 获取第1个新增的表名
    const tableName = Object.keys(showSchema())[0];
     // 获取这个表第1条数据的id
     const ObjectId = Object.keys(listTable(tableName))[0];
     
     // 获取这个表的第1条数据
    const res = getFromTableByObjectId(tableName,ObjectId);
    const len=Object.keys(res).length>0
    assertEquals(len,true)
  },
});


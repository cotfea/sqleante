import dbsql from "../src/dbsql/main.js"
import { DB,assertEquals } from "../deps.js"

const db = new DB("test.db")

const { showSchema, listTable, getFromTableByObjectId } = dbsql(db)

Deno.test({
  name: "测试打印1个数据表的所有数据(第1个新增的数据表)"
  , fn: () => {
    // 获取第1个新增的表名
    const tableName = Object.keys(showSchema())[0]

    // 获取这个表所有数据
    const res = listTable(tableName)
    // console.log("查询结果",res);
    const isObj = Object.prototype.toString.call(res) === "[object Object]"

    assertEquals(isObj, true)
  }
})

Deno.test({
  name: "测试通过objectId获取对应的1条数据"
  , fn: () => {
    // 获取第1个新增的表名
    const tableName = Object.keys(showSchema())[0]
    // 获取这个表第1条数据的id
    const ObjectId = Object.keys(listTable(tableName))[0]

    // 获取这个表的第1条数据
    const res = getFromTableByObjectId(tableName, ObjectId)
    const len = Object.keys(res).length > 0
    assertEquals(len, true)
  }
})

Deno.test({
  name: "测试获取部分字段的记录"
  , fn: () => {
    // 获取第1个新增的表名
    const tableName = Object.keys(showSchema())[0]

    // 获取这个表部分字段的数据
    const res = listTable(tableName, { select: ["field1", "field2"] })

    const len = Object.keys(res).length > 0
    // console.log("查询结果",res);
    assertEquals(len, true)
  }
})

Deno.test({
  name: "测试 groupBy"
  , fn: () => {
    // 获取第1个新增的表名
    const tableName = Object.keys(showSchema())[0]

    // 获取这个表部分字段的数据
    const res = listTable(tableName, { select: ["field1"], groupBy: "field1" })

    // console.log("查询结果",res);
    const len = Object.keys(res).length > 0
    assertEquals(len, true)
  }
})

Deno.test({
  name: "测试 sum"
  , fn: () => {
    // 获取第1个新增的表名
    const tableName = Object.keys(showSchema())[0]

    // 获取这个表部分字段的数据
    const res = listTable(tableName, { select: ["field1", "sum(field2)"] })

    // console.log("查询结果",res);
    const len = Object.keys(res).length > 0
    assertEquals(len, true)
  }
})

Deno.test({
  name: "测试 limit offset"
  , fn: () => {
    // 获取第1个新增的表名
    const tableName = Object.keys(showSchema())[0]

    // 按页获取数据
    const res = listTable(tableName, {
      select: ["field1", "field2"],
      limit: 4,
      offset: 1
    })

    // console.log("查询结果",res);
    const len = Object.keys(res).length > 0
    assertEquals(len, true)
  }
})

Deno.test({
  name: "测试 orderBy排序"
  , fn: () => {
    // 获取第1个新增的表名
    const tableName = Object.keys(showSchema())[0]

    // 多条件排序
    const res = listTable(tableName, {
      select: ["field1", "field2"],
      orderBy: "-field2,field1"
    })

    // console.log("查询结果",res);
    const len = Object.keys(res).length > 0
    assertEquals(len, true)
  }
})

Deno.test({
  name: "测试 where 比较运算符"
  , fn: () => {
    // 获取第1个新增的表名
    const tableName = Object.keys(showSchema())[0]

    // 多条件排序
    const res = listTable(tableName, {
      where: { $lt: ["field2", 100] }
    })

    // console.log("查询结果", res)
    const len = Object.keys(res).length > 0
    assertEquals(len, true)
  }
})

Deno.test({
  name: "测试 count"
  , fn: () => {
    // 获取第1个新增的表名
    const tableName = Object.keys(showSchema())[0]

    // 多条件排序
    const res = listTable(tableName, {
      select: ["count(field2)"],
      where: { $gt: ["field2", 100] }
    })

    // console.log("查询结果", res)
    const len = Object.keys(res).length > 0
    assertEquals(len, true)
  }
})

Deno.test({
  name: "测试 as别名"
  , fn: () => {
    // 获取第1个新增的表名
    const tableName = Object.keys(showSchema())[0]

    // 多条件排序
    const res = listTable(tableName, {
      select: ["field1", "field2", "sum(field2) as 总和"]
    })

    // console.log("查询结果",res)
    const len = Object.keys(res).length > 0
    assertEquals(len, true)
  }
})

Deno.test({
  name: "测试 having"
  , fn: () => {
    // 获取第1个新增的表名
    const tableName = Object.keys(showSchema())[0]

    // 多条件排序
    const res = listTable(tableName, {
      select: ["field1", "field2"]
    , groupBy: "field1"
    , having: {
        $lt: [
          "count(field1)"
        , 2
        ]
      }
    })

    // console.log("查询结果", res)
    const len = Object.keys(res).length > 0
    assertEquals(len, true)
  }
})

import dbsql from "../src/dbsql/main.js"
import { db,assertEquals } from '../deps.js'

const {
  showDB
, show
, showSchema

, createTable
, dropTable
} = dbsql(db)

Deno.test({
  name: "测试获取数据库信息",
  fn: () => {
    const res = showDB() // 没有时返回空数组
    // console.log(res)
    // assertEquals(!!res.length,true)
    assertEquals(Array.isArray(res),true)
  }
})

Deno.test({
  name: "测试获取所有数据表表名",
  fn: () => {
    const res = show('table')// 没有时返回空数组
    // console.log(999,res,res2)
    // assertEquals(!!res.length,true)
    assertEquals(Array.isArray(res),true)
  }
})

Deno.test({
  name: "测试获取所有表结构",
  fn: () => {
    const res = showSchema()
    // console.log(res)

    const isObj = Object.prototype.toString.call(res) === '[object Object]'

    // assertEquals(!!Object.keys(res).length,true)
    assertEquals(isObj,true)
  },
})


Deno.test({
  name: "测试新增1个数据表",
  fn: () => {
    // 创建一个表
    const createTableRes = createTable("table45", {
      field1: "TEXT"
    , field2: "int"
    , field3: "NUMERIC"
    , field4: "REAL"
    })
    // console.log(createTableRes) // 新增返回空数组

    // 获取所有数据表表名
    const showTableRes = show('table')
    // console.log("所有数据表",showTableRes)

    // 对比所有表名里最后一个是不是 刚新增的那个
    assertEquals(showTableRes[showTableRes.length-1],"table45")
  }
})

Deno.test({
  name: "测试修改1个数据表结构",
  fn: () => {

    // console.log("暂无")
  }
})



Deno.test({
  name: "测试删除1个数据表(最近新增的那个表)",
  fn: () => {
    // 获取所有表名
    const showTableRes = show('table')
    // 要删除的表
    const delTable = showTableRes[showTableRes.length-1]
    // 删除表
    const res = dropTable(delTable)
    // console.log(res)  // 删除表返回空数组

    // 再次获取所有表名
    const showTableAgain = show('table')
    // console.log("剩下的表",showTableAgain)
    // 查询刚删除的表是否还存在
    const isExist = showTableAgain.includes(delTable)
    assertEquals(isExist,false)

     // 创建一个表
    const createTableRes = createTable("table45", {
      field1: "TEXT"
    , field2: "int"
    , field3: "NUMERIC"
    , field4: "REAL"
    })
  }
})


import dbsql from "../src/dbsql/main.js";
import { DB,assertEquals } from "../deps.js";

const db = new DB("test.db");
const {
   showSchema
, listTable

, insertTable
, updateFromTableByObjectId
, updateTable
, deleteFromTableByObjectId
, deleteTable
, cleanTable
} = dbsql(db);

Deno.test({
  name: "测试给1个数据表加1条数据(第1个新增的数据表)",
  fn: () => {
    // console.log("查看所有表结构",showSchema());

    // 获取第1个数据表 的表名
    // const tableName =show('table')[0];
    const tableName = Object.keys(showSchema())[0];

    //  插入一条数据
    const res = insertTable(tableName, {
      field1: "TEXT2"
    , field2: "32"
    , field3: 1
    , field4: "2022-03-20"
    });
    // console.log("插入记录的返回值",res); // 返回插入记录的ObjectId

    assertEquals(res.length, 18);
  },
});

Deno.test({
  name: "测试获取1个数据表的所有数据(第1个新增的数据表)",
  fn: () => {
    // 拿到表名
    const tableName = Object.keys(showSchema())[0];

    // 获取表所有数据
    const res = listTable(tableName);
    // console.log("这个表的所有数据",res);

    const flag = Object.prototype.toString.call(res) === "[object Object]";
    assertEquals(flag, true);
  },
});

Deno.test({
  name: "测试给1个数据表加多条数据(给第1个新增的数据表)",
  fn: () => {
    console.log("暂无，通过多个单插入实现");
  },
});

Deno.test({
  name: "测试通过objectId更改对应的1条数据(第1个新增的数据表)",
  fn: () => {
    // 获取第一个新增的数据库名
    const tableName = Object.keys(showSchema())[0];
    // 获取第一个数据库数据
    const dataObj = listTable(tableName);
    const keysArr = Object.keys(dataObj);
    if (keysArr.length) {
      // 得到要更新的数据的objectId
      const ObjectId = Object.keys(listTable(tableName))[0];
      // 更新数据
      const res = updateFromTableByObjectId(tableName, ObjectId, {
        field1: "subline",
        // field4: "2022-02-22",
      });

      // console.log("修改数据返回值",res); // 修改数据返回值为undefined

      const updateData = listTable(tableName)[ObjectId]["field1"];
      assertEquals(updateData, "subline");
    }
  },
});

Deno.test({
  name: "测试修改多个objectId的数据(第1个新增的数据表)",
  fn: () => {
    // 获取第一个新增的数据库名
    const tableName = Object.keys(showSchema())[0];
    // 获取第一个数据库数据
    const dataObj = listTable(tableName);
    const keysArr = Object.keys(dataObj);
    if (keysArr.length) {
      // 得到要更新的数据的objectId
      // const ObjectId = Object.keys(listTable(tableName))[0];
      const allData = listTable(tableName);
      const someDatas = Object.fromEntries(Object.entries(allData).slice(0, 2));
      const updateDatas = {};
      for (const key in someDatas) {
        updateDatas[key] = {
          ...someDatas[key],
          field2: someDatas[key]["field2"] + 1000,
        };
      }
      // console.log(11, updateDatas);

      // 更新多个数据
      const res = updateTable(tableName, updateDatas);
      // console.log(445, res); // 批量修改数据返回 被修改后的那些记录
      const isSuccess = !!Object.keys(res).length;
      // const updateData = listTable(tableName);
      // console.log("999999", updateData);
      assertEquals(isSuccess, true);
    }
  },
});

// Deno.test({
//   name: "测试通过objectId删除对应的1条数据（最后1条）",
//   fn: () => {
//     // 获取第一个新增的表名
//     const tableName = Object.keys(showSchema())[0];
//     const dataObj = listTable(tableName);
//     const keysArr = Object.keys(dataObj);
//     if(keysArr.length){

//       const ObjectId = Object.keys(listTable(tableName))[keysArr.length-1];

//       // 删除表一条记录
//       const res = deleteFromTableByObjectId(tableName,ObjectId);
//       // console.log(res);
//       assertEquals(res[0].length,18)
//     }
//   },
// });

// Deno.test({
//   name: "测试按条件删除1个数据表的1条数据(第1个新增的数据表)",
//   fn: () => {
//     const tableName = Object.keys(showSchema())[0];
//     const res = deleteTable(tableName, {
//         where: {
//             $gt: ["field2", 0], // 字段field2值大于0的数据
//           },
//         });
//       console.log("待更新",res); // 返回被删数据的objectId字符串数组

//       assertEquals(!!res.length,true)

//      console.log("这个表的所有数据", listTable(tableName));
//   },
// });

// Deno.test({
//   name: "测试删除1个数据的表所有数据(第1个新增的数据表)",
//   fn: () => {
//     const tableName = Object.keys(showSchema())[0];
//     const res = cleanTable(tableName);
//     // console.log(res);

//       // 获取表所有数据
//       const allData = listTable(tableName);
//       const isClear=!!Object.keys(allData).length
//       // console.log("这个表的所有数据",isClear);
//       assertEquals(isClear,false)
//   },
// });

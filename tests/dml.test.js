import dbsql from "../src/dbsql/main.js";

const {
  
  show,
  showSchema,
  listTable,

  insertTable,
  deleteTable,
  cleanTable,
  updateFromTableByObjectId,
  deleteFromTableByObjectId,
 
} = dbsql;


Deno.test({
  name: "测试给第1个新增的数据表加1条数据",
  fn: () => {
    const tableName = Object.keys(showSchema())[1];
    const res = insertTable(tableName, {
      field1: "TEXT2",
      field2: "10",
      field3: 1,
      field4: "2008-04-24",
    });
    console.log(res);
  },
});

Deno.test({
  name: "测试给第1个新增的数据表加多条数据",
  fn: () => {

    console.log("暂无，通过多个单插入实现");
  },
});

Deno.test({
  name: "测试按条件删除数据",
  fn: () => {
    const tableName = Object.keys(showSchema())[1];
    // const res = deleteTable(tableName, {
    //   where: {
    //     // $: ["objectId", utils.ArrayIn(deleteKeys)],
    //   },
    // });
    console.log("待更新");
  },
});

Deno.test({
  name: "测试删除表所有数据",
  fn: () => {
    const tableName = Object.keys(showSchema())[1];
    const res = cleanTable(tableName);
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


// Deno.test({
//   name: "测试通过objectId更改对应的1条（第1条）数据",
//   fn: () => {
//     const tableName = Object.keys(showSchema())[1];
//     const dataObj = listTable(tableName);
//     const keysArr = Object.keys(dataObj);
//     if(keysArr.length){

//       const ObjectId = Object.keys(listTable(tableName))[0];
//       const res = updateFromTableByObjectId(tableName,ObjectId,{
//         field4: "2022-01-24",
//       });
//       console.log(res);
//     }
//   },
// });


// Deno.test({
//   name: "测试通过objectId删除对应的1条（最后1条）数据",
//   fn: () => {
//     const tableName = Object.keys(showSchema())[1];
//     const dataObj = listTable(tableName);
//     const keysArr = Object.keys(dataObj);
//     if(keysArr.length){

//       const ObjectId = Object.keys(listTable(tableName))[keysArr.length-1];
//       const res = deleteFromTableByObjectId(tableName,ObjectId);
//       console.log(res);
//     }
//   },
// });




Deno.test({
  name: "测试再次打印所有数据表表名",
  fn: () => {
    console.log(show('table'));
  },
});
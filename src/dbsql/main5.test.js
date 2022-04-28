import dbsql, { utils } from "./main.js";
import { randomInt } from "../../deps.js";

import { DB } from '../dep.js'
const db = new DB("test.db")

const {
  showDB
, show
, showSchema
, dropTable
, listTable
, createTable
, insertTable
, deleteTable
, cleanTable
, updateTable
} = dbsql(db)

console.log(showDB());

const showTables = () => show("table");

console.log({ tables: showTables() });

showTables().forEach((t) => dropTable(t));

console.log({ tables: showTables() });

createTable("test", {
  id: "INT",
  content: "TEXT",
});

console.log({ tables: showTables() });

console.log(showSchema());

const listTest = (option) => listTable("test", option);

console.log({ test: listTest() });

const insertDatas = new Array(10).fill(0).map((t, i) => ({
  id: i + 1,
  content: randomInt(10),
}));

insertDatas.forEach((insertData) => insertTable("test", insertData));

console.log({ test: listTest() });

const deleteKeys = Object.keys(listTest()).slice(0, 3);
console.log(123,deleteKeys);
console.log(124,utils.arrayIn(deleteKeys));
deleteTable(
  'test'
, {
    where: {
      $in: [
        'objectId'
      , utils.arrayIn(deleteKeys)
      ]
    }
  }
)

console.log({test: listTest()})

const tableDatas = listTest()

const newTableDatas =
  Object.keys(tableDatas)
  .reduce(
    (r, c) => ({
      ...r
    , [c]: {
        id: tableDatas[c].id + 3
      , content: `${Number.parseInt(tableDatas[c].content) + 3}`
      }
    })
  , {}
  )

console.log({newTableDatas})

updateTable('test', newTableDatas)

console.log({test: listTest()})

deleteTable(
  'test'
, {
    where: {
      $between: [
        'id'
      , {
          $and: [
            '8'
          , '10'
          ]
        }
      ]
    }
  }
)

console.log({ test: listTest() });

cleanTable("test");

console.log({ test: listTest() });

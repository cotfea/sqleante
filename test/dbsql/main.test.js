import dbsql from '../../src/dbsql/main.js'
import { DB } from '../../src/dep.js'
import { assertEquals } from '../dep.js'

const db = new DB("test.db")

const {
  showDB
, show
, showSchema
, dropTable
, listTable
, createTable
, insertTable
, deleteFromTableByObjectId
, getFromTableByObjectId
, updateFromTableByObjectId
} = dbsql(db)

const showTables = () => show('table')
const showIndexs = () => show('index')

const cleanTable = () => {
  showTables()
  .forEach(
    t => dropTable(t)
    )
  }

// 删除所有表
cleanTable()

const tableName = 'user'
const defSchema = {
  username: "TEXT"
, phone: "TEXT"
}

const userData = [
  {
    username: '张三'
  , phone: '18971234657'
  }
, {
    username: '李四'
  , phone: '18971234657'
  }
]

const tableData = () => listTable(tableName)

// 创建一个表
createTable(
  tableName
, defSchema
)

Deno.test(
  'create Table'
, () => {
    // 查表名
    assertEquals(
      showTables()
    , [ tableName ]
    )

    // 查表索引
    assertEquals(
      new RegExp(`^sqlite_autoindex_${tableName}`).test(showIndexs()[0])
    , true
    )

    // 查表结构
    assertEquals(
      showSchema()
    , {
        user: {
          objectId: "TEXT UNIQUE"
        , ...defSchema
        , createdAt: "TEXT"
        , updatedAt: "TEXT"
        }
      }
    )

    // 查表数据
    assertEquals(
      listTable(tableName)
    , {}
    )

    // 用户表批量插入数据
    userData
    .forEach(
      insertData =>
        insertTable(tableName, insertData)
    )

    // 获取(用户)表数据
    const tableData_ = tableData()

    // 拿到非内置字段数据
    const tableData__ =
      Object.keys(tableData_)
      .map(
        t =>
          Object.keys(tableData_[t])
          .filter(
            _t => Object.keys(defSchema).includes(_t)
          )
          .reduce(
            (r, c) => ({
              ...r
            , [c]: tableData_[t][c]
            })
          , {}
          )
      )

    assertEquals(
      tableData__
    , userData
    )

  }

)

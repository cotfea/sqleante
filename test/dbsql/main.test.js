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

createTable(
  tableName
, defSchema
)

Deno.test(
  'create Table'
, () => {

    assertEquals(
      showTables()
    , [ tableName ]
    )

    assertEquals(
      new RegExp(`^sqlite_autoindex_${tableName}`).test(showIndexs()[0])
    , true
    )

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

    assertEquals(
      listTable(tableName)
    , {}
    )

    userData
    .forEach(
      insertData =>
        insertTable(tableName, insertData)
    )

    const tableData_ = tableData()

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

import { uuid } from "../dep.js";
import dql from "./dql.js";
import ddl from "./ddl.js";
import expressionHandler from "./expression.ts";

const main = (query) => {

  const insertTableOne = (
    tableName
  , insertData
  , schemaKeys
  , needHeader = true
  ) => {

    const entries = Array.isArray(insertData)
      ? {
          keys: schemaKeys,
          values: insertData,
        }
      : {
          keys: Object.keys(insertData),
          values: Object.values(insertData),
        };

    const _uuid = uuid()
    const _createdAt = new Date().toJSON()
    const _updatedAt = _createdAt

    return {
      ret: _uuid,
      sql: `
        ${
          needHeader
        ? `
          INSERT INTO ${tableName}
          (
            objectId
          , ${entries.keys.join(", ")}
          , createdAt
          , updatedAt
          )
          VALUES
          `
        : ""
        }
        (
          '${_uuid}'
        , ${entries.values.map((t) => `'${t}'`).join(", ")}
        , '${_createdAt}'
        , '${_updatedAt}'
        )
      `,
    };
  };

  // 插入一条或多条数据
  const insertTable = (tableName, insertData) => {

    // const schema = ddl(query).showSchema(tableName);
    // const schemaKeys = Object.keys(schema).filter((t) =>
    //   schema[t] === "INTEGER PRIMARY KEY" || t === "objectId" ? false : true
    // );

    const schema = ddl(query).showSchema(tableName)

    const schemaKeys = Object.keys(schema).filter((t) =>
        schema[t] === "INTEGER PRIMARY KEY"
    ||  t === "objectId"
    ||  t === "createdAt"
    ||  t === "updatedAt"
    ? false : true
    )

    return Array.isArray(insertData) &&
      insertData.reduce(
        (r, c) =>
          r === true || Array.isArray(c) || typeof c === "object" ? true : r,
        false
      )
      ? query(
          insertData
            .map((t, i) =>
              insertTableOne(tableName, t, schemaKeys, i === 0 ? true : false)
            )
            .reduce(
              (r, c, i) => ({
                ns: r.ns,
                ret: [...r.ret, c.ret],
                sql: `
                ${r.sql}
                ${i === 0 ? "" : ","} ${c.sql}
              `,
              }),
              {
                ns: "insertTable",
                ret: [],
                sql: "",
              }
            )
        )
      : query({
          ...insertTableOne(tableName, insertData, schemaKeys),
          ns: "insertTable",
        })
  }

  // 删除指定条件的数据
  const deleteTable = (tableName, option = {}) => {
    const limitDefault = 1000
    const _option =
      option?.limit <= limitDefault
        ? option.limit
        : {
            ...option,
            limit: limitDefault,
          }

    const deleteData = Object.keys(dql(query).listTable(tableName, _option))

    return query({
      ns: "deleteTable",
      ret: deleteData,
      sql: `
        DELETE FROM ${tableName}
        ${option?.where ? `WHERE ${expressionHandler(_option.where)}` : ""}
      `,
    })
  }

  // 清空表数据
  const cleanTable = (tableName) =>
    deleteTable( tableName )

  // 删除指定id的那条数据
  const deleteFromTableByObjectId = (tableName, objectId) =>
  deleteTable(tableName, {
    where: {
      $eq: [
        'objectId'
        , `'${objectId}'`
      ]
    }
  })

  // 更改指定id的那条数据
  const updateFromTableByObjectId = (tableName, objectId, newData) => {
    const { getFromTableByObjectId } = dql(query)
    const oldData = getFromTableByObjectId(tableName, objectId)
    const _updatedAt = new Date().toJSON()
    const _newData = {
      ...oldData[objectId]
    , ...newData
    , updatedAt:_updatedAt
    }

    return query({
      ns: "updateFromTableByObjectId",
      ret: () => dql(query).getFromTableByObjectId(tableName, objectId),
      sql: `
        UPDATE ${tableName}
        SET ${Object.entries(_newData)
          .reduce((r, c) => [...r, `${c[0]} = '${c[1]}'`], [])
          .join(", ")}
        WHERE objectId = '${objectId}'
      `,
    })
  }

  // 更改多条数据
  const updateTable = (tableName, newDatas) => {
    const entries = Object.entries(newDatas)
    return entries
      .map((t) => updateFromTableByObjectId(tableName, t[0], t[1]))
      .reduce(
        (r, c) => ({
          ...r
        , ...c
        }),
        {}
      )
  }

  return {
    insertTable
  , deleteTable
  , cleanTable
  , deleteFromTableByObjectId
  , updateFromTableByObjectId
  , updateTable
  }
}

export default (query) => main(query)

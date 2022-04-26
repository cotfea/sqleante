import { uuid } from "../dep.js";
import dql from "./dql.js";
import ddl from "./ddl.js";
import expressionHandler from "./expression.js";

const main = (query) => {
  const insertTableOne = (
    tableName,
    insertData,
    schemaKeys,
    needHeader = true
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

    const _uuid = uuid();

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
            )
            VALUES
          `
            : ""
        }
        (
          '${_uuid}'
        , ${entries.values.map((t) => `'${t}'`).join(", ")}
        )
      `,
    };
  };

  const insertTable = (tableName, insertData) => {
    // const schema = ddl(query).showSchema(tableName);
    // const schemaKeys = Object.keys(schema).filter((t) =>
    //   schema[t] === "INTEGER PRIMARY KEY" || t === "objectId" ? false : true
    // );

    const schema = ddl(query).showSchema(tableName);

    const schemaKeys = Object.keys(schema).filter((t) =>
      schema[t] === "INTEGER PRIMARY KEY" || t === "objectId" ? false : true
    );

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
        });
  };

  const deleteTable = (tableName, option = {}) => {
    const limitDefault = 1000;
    const _option =
      option?.limit <= limitDefault
        ? option.limit
        : {
            ...option,
            limit: limitDefault,
          };

    const deleteData = Object.keys(dql(query).listTable(tableName, _option));

    return query({
      ns: "deleteTable",
      ret: deleteData,
      sql: `
        DELETE FROM ${tableName}
        ${option?.where ? `WHERE ${expressionHandler(_option.where)}` : ""}
      `,
    });
  };

  const cleanTable = (tableName) => ({
    ...deleteTable(tableName),
    ns: "cleanTable",
  });

  const deleteFromTableByObjectId = (tableName, objectId) => ({
    ...deleteTable(tableName, {
      where: {
        $eq: ["objectId", `'${objectId}'`],
      },
    }),
    ns: "deleteFromTableByObjectId",
    // , ret: objectId
  });

  const updateFromTableByObjectId = (tableName, objectId, newData) => {
    const { getFromTableByObjectId } = dql(query);
    const oldData = getFromTableByObjectId(tableName, objectId);
    const _newData = {
      ...oldData[objectId],
      ...newData,
    };

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
    });
  };

  const updateTable = (tableName, newDatas) => {
    const entries = Object.entries(newDatas);
    return entries
      .map((t) => updateFromTableByObjectId(tableName, t[0], t[1]))
      .reduce(
        (r, c) => ({
          ...r,
          ...c,
        }),
        {}
      );
  };

  return {
    insertTable,
    deleteTable,
    cleanTable,
    deleteFromTableByObjectId,
    updateFromTableByObjectId,
    updateTable,
  };
};

export default (query) => main(query);

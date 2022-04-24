import { uuid } from "../../deps.js";
import dql from "./dql.js";
import ddl from "./ddl.js";
import expressionHandler from "./expression.js";
import { utils } from "./main.js";

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

    return `
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
        '${uuid()}'
      , ${entries.values.map((t) => `'${t}'`).join(", ")}
      )
    `;
  };

  const insertTable = (tableName, insertData) => {
    const schema = ddl(query).showSchema(tableName);
    const schemaKeys = Object.keys(schema).filter((t) =>
      schema[t] === "INTEGER PRIMARY KEY" || t === "objectId" ? false : true
    );

    Array.isArray(insertData) &&
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
            .join(",")
        )
      : query(insertTableOne(tableName, insertData, schemaKeys));
  };

  const deleteTable = (tableName, option) =>
    query(`
      DELETE FROM ${tableName}
      ${option?.where ? `WHERE ${expressionHandler(option.where)}` : ""}
    `);

  const cleanTable = (tableName) => {
    const listTable = dql(query).listTable(tableName);
    const allObjectKeys = Object.keys(listTable);
    deleteTable(tableName, {
      where: {
        $in: ["objectId", utils.ArrayIn(allObjectKeys)],
      },
    });
  };

  const deleteFromTableByObjectId = (tableName, objectId) =>
    deleteTable(tableName, {
      where: {
        $eq: ["objectId", `'${objectId}'`],
      },
    });

  const updateFromTableByObjectId = (tableName, objectId, newData) => {
    const { getFromTableByObjectId } = dql(query);
    const oldData = getFromTableByObjectId(tableName, objectId);
    const _newData = {
      ...oldData,
      ...newData,
    };

    query(`
      UPDATE ${tableName}
      SET ${Object.entries(_newData)
        .reduce((r, c) => [...r, `${c[0]} = '${c[1]}'`], [])
        .join(", ")}
      WHERE objectId = '${objectId}'
    `);
  };

  return {
    insertTable,
    deleteTable,
    cleanTable,
    deleteFromTableByObjectId,
    updateFromTableByObjectId,
  };
};

export default (query) => main(query);

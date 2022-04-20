const main = db => {

  const listTable =  tableName =>
    db.query(`
      SELECT *
      FROM ${tableName}
    `)

  return {
    listTable
  }
}

export default db => main(db)

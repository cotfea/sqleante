import expressionHandler from './expression.js'

export default () => {`
  ${
    option?.where
    ? `WHERE ${expressionHandler(option.where)}`
    : ''
  }
  ${
    option?.groupBy
    ? Array.isArray(option.groupBy)
    ? `GROUP BY ${option.groupBy.join(', ')}`
    : `GROUP BY ${option.groupBy}`
    : ``
  }
  ${
    option?.groupBy && option?.having
    ? `HAVING ${expressionHandler(option.having)}`
    : ''
  }
  ${
    option?.orderBy
    ? Array.isArray(option.orderBy)
    ? `ORDER BY ${option.orderBy.join(', ')}`
    : `ORDER BY ${option.orderBy}`
    : ``
  }
  ${
    option?.limit || option?.offset
    ? `LIMIT ${
        option?.limit
        ? option?.limit
        : 100
      }`
    : ''
  }
  ${
    option?.offset && option?.limit
    ? `OFFSET ${option.offset}`
    : ''
  }
`}

# SQLeante 使用文档

## 1. API 版本

当前的 API 版本是 0.1。

## 2. Base URL

    http://${yourDomainUrl}/api/0.1

## 3. 接口列表

### 3.1 Schemas(对象定义)

| 序号 | URL                  | HTTP   | 功能             |
| ---- | -------------------- | :----- | :--------------- |
| 01   | /schemas/{classname} | POST   | 创建对象定义     |
| 02   | /schemas             | GET    | 获取全部对象定义 |
| 03   | /schemas/{classname} | GET    | 查询指定对象定义 |
| 04   | /schemas/{classname} | DELETE | 删除对象定义     |

### 3.2 classes(对象)

| 序号 | URL                             | HTTP   | 功能                          |
| ---- | ------------------------------- | ------ | ----------------------------- |
| 01   | /classes/{classname}            | POST   | 新增数据                      |
| 02   | /classes/{classname}            | PUT    | 更新数据                      |
| 03   | /classes/{classname}/{objectId} | PUT    | 更新指定对象数据              |
| 04   | /classes/count/{classname}      | GET    | 查询指定对象数据总数/对象计数 |
| 05   | /classes/{classname}            | GET    | 查询指定对象所有数据          |
| 06   | /classes/{classname}/{objectId} | GET    | 查询指定对象数据              |
| 07   | /classes/clean/{classname}      | DELETE | 删除指定对象所有数据          |
| 08   | /classes/{classname}/{objectId} | DELETE | 删除指定对象数据              |
| 09   | /classes/{classname}            | DELETE | 按条件删除                    |

## 4. Schemas

### 4.1 创建对象定义

创建应用指定的一个 class 的角色信息

例如：

    备注：必填“Path参数”中的classname“参数值”是对创建对象定义的名称命名。）

请求：

- 请求地址： ```/schemas/test```
- 请求方法： ```POST```

请求内容: 格式为 JSON

```json
{
  "id": "INTEGER PRIMARY KEY",
  "name": "TEXT",
  "age": "INT",
  "address": "TEXT",
  "salary": "REAL"
}
```

返回：格式为 JSON

    备注：返回后“objectId”/“createdAt”/“updatedAt”为自动生成。其中“objectId”是指定生成的数据，用于更新/查询/删除指定对象数据。

```json
{
  "code": 200,
  "results": {
    "objectId": "TEXT UNIQUE",
    "id": "INTEGER PRIMARY KEY",
    "name": "TEXT",
    "age": "INT",
    "address": "TEXT",
    "salary": "REAL",
    "createdAt": "TEXT",
    "updatedAt": "TEXT"
  }
}
```

### 4.2 获取全部对象定义

获取应用的所有的角色信息

例如：

请求：

- 请求地址： ```/schemas```
- 请求方法： ```GET```

请求内容: 无请求内容

返回：格式为 JSON

```json
{
  "results": {
    "test": {
      "objectId": "TEXT UNIQUE",
      "id": "INTEGER PRIMARY KEY",
      "name": "TEXT",
      "age": "INT",
      "address": "TEXT",
      "salary": "REAL",
      "createdAt": "TEXT",
      "updatedAt": "TEXT"
    },
  }
}
```

### 4.3 查询指定对象定义

获取应用指定的 class 的全部角色信息

例如：

请求：

- 请求地址： ```/schemas/test```
- 请求方法： ```GET```

请求内容: 无请求内容。

    备注：必填“Path参数”中的classname“参数值”与待“查询指定对象定义”的命名名称保持一致。

返回：格式为 JSON

```json
{
  "code": 200,
  "results": {
    "objectId": "TEXT UNIQUE",
    "id": "INTEGER PRIMARY KEY",
    "name": "TEXT",
    "age": "INT",
    "address": "TEXT",
    "salary": "REAL",
    "createdAt": "TEXT",
    "updatedAt": "TEXT"
  }
}
```

### 4.4 删除对象定义

删除应用指定的class的全部角色信息

例如：

请求：

- 请求地址： ```/schemas/test```
- 请求方法： ```DELETE```

请求内容: 无请求内容。（备注：必填“Path参数”中的classname“参数值”与待“删除指定对象定义”的命名名称保持一致。）

返回：格式为 JSON

```json
{
  "code": 200,
  "results": {}
}
```

## 5. Classes

### 5.1 新增数据

新增应用指定的 class 的（一条或多条）数据。
（备注：针对新增的数据类型有四种。按数量可分1条或多条，按对象可分对象或数组。）

例如：

请求：

- 请求地址： ```/classes/test```
- 请求方法： ```POST```

请求内容: 格式为 JSON

```json
[
  {
    "name": "Paul",
    "age": 32,
    "address": "California",
    "salary": 20000.0
  },
  {
    "name": "Allen",
    "age": 25,
    "address": "Texas",
    "salary": 15000.0
  },
  {
    "name": "Teddy",
    "age": 23,
    "address": "Norway",
    "salary": 20000.0
  }
]
```

返回：格式为 JSON

    备注：新增三个数组后，返回三条新增数据的 objectId

```json
{
  "code": 200,
  "results": [
    "Z0dOV7BwmZYqM9s6WX",
    "ItfYKVv7zSMr3lqwXi",
    "5uoDzODeCZO8609BzQ",
  ]
}
```

### 5.2 更新数据

更新应用指定的 class 的(一条或多条或全部)数据

例如：

请求：

- 接口定义： ```/classes/:classname```
- 请求地址： ```/classes/test/```
- 请求方法： ```PUT```

请求内容: 格式为 JSON

    备注：必填 Path 参数中的 classname “参数值”与待更新“对象定义”的命名名称保持一致。具体更新内容在“Body”操作界面中进行代码编辑。

    备注：接口定义中路径参数 classname 须与对象名称保持一致. 更新数据使用 http 请求体传输.

```json
{
  "UUz55FyvBQdG3TqUMS": {
    "age": 97
  },
  "xo74y7iIvzTBDlbxXN": {
    "age": 92,
    "salary": 47000
  }
}
```

返回：格式为 JSON

```json
{
  "code": 200,
  "results": {}
}
```

### 5.3 更新指定数据

更新应用指定的 class 的指定的一条数据

例如：（备注：在使用“更新指定数据”之前，需要对待更新的“指定数据”的“objectId”进行查询，以使用于以下呈现）

请求：

- 请求地址： ```/classes/test/UUz55FyvBQdG3TqUMS```
- 请求方法： ```PUT```

请求内容: 格式为 JSON【备注：必填“Path参数”中的2个“参数值”（classname/objectId)与待“更新指定对象定义"命名名称保持一致。具体更新内容在“Body”操作界面中进行代码编辑。）】

```json
{
    "age": 23
}
```

返回：格式为 JSON

```json
{
  "code": 200,
  "results": {
    "UUz55FyvBQdG3TqUMS": {
      "id": 2,
      "name": "Allen",
      "age": 23,
      "address": "Texas",
      "salary": 15000,
      "createdAt": "2022-05-09T03:53:44.146Z",
      "updatedAt": "2022-05-09T04:01:26.957Z"
    }
  }
}
```

### 5.4 查询指定对象数据总数/对象计数

获取应用指定的 class 的所有的数据总数

例如：

请求：

- 请求地址： ```/classes/count/test```
- 请求方法： ```GET```

请求内容: 无请求内容。

    备注：必填“Path参数”中的classname“参数值”与待“查询指定对象定义”的命名名称保持一致。

返回：格式为 JSON

```json
{
  "code": 200,
  "results": 3
}
```

### 5.5 查询指定对象所有数据

获取应用指定的 class 的所有的数据

例如：

请求：

- 请求地址： ```/classes/test```
- 请求方法： ```GET```

请求内容: 无请求内容。

    备注：必填“Path参数”中的“参数值”与待“查询指定对象定义”的命名名称保持一致。

返回：格式为 JSON

```json
{
  "code": 200,
  "count": 3,
  "keys": [
    "u6ATcJfW5163357oTz",
    "eQkvWdiysSKj5wGCKa",
    "TR7pINjW4PhSooz59P"
  ],
    "results": {
      "u6ATcJfW5163357oTz": {
        "id": 1,
        "name": "Paul",
        "age": 32,
        "address": "California",
        "salary": 20000,
        "createdAt": "2022-05-09T03:39:50.072Z",
        "updatedAt": "2022-05-09T03:39:50.072Z"
        },
        "eQkvWdiysSKj5wGCKa": {
          "id": 2,
          "name": "Allen",
          "age": 25,
          "address": "Texas",
          "salary": 15000,
          "createdAt": "2022-05-09T03:39:50.073Z",
          "updatedAt": "2022-05-09T03:39:50.073Z"
        },
        "TR7pINjW4PhSooz59P": {
          "id": 3,
          "name": "Teddy",
          "age": 23,
          "address": "Norway",
          "salary": 20000,
          "createdAt": "2022-05-09T03:39:50.073Z",
          "updatedAt": "2022-05-09T03:39:50.073Z"
        }
    }
}

```

### 5.6 查询指定对象数据

获取应用指定的 class 的指定的一条数据

例如：

    备注：在使用 "查询指定数据" 之前，需要对待查询的“指定数据”的“objectId”进行查询，以使用于以下呈现。）

请求：

- 请求地址： ```/classes/test/u6ATcJfW5163357oTz```
- 请求方法： ```GET```

请求内容: 无请求内容。（备注：必填“Path参数”中的2个“参数值”（classname/objectId)与待“查询指定对象定义"命名名称保持一致。）

返回：格式为 JSON

```json

{
  "code": 200,
  "results": {
    "u6ATcJfW5163357oTz": {
      "id": 1,
      "name": "Paul",
      "age": 32,
      "address": "California",
      "salary": 20000,
      "createdAt": "2022-05-09T03:39:50.072Z",
      "updatedAt": "2022-05-09T03:39:50.072Z"
    }
  }
}
```

### 5.7 删除指定对象所有数据

删除应用指定的 class 的所有的数据

例如：

请求：

- 请求地址： ```/classes/clean/test```
- 请求方法： ```DELETE```

请求内容: 无请求内容。（备注：必填“Path参数”中的classname“参数值”与待“删除指定对象定义”的命名名称保持一致。）

返回：格式为 JSON

```json
{
  "code": 200,
  "results": [
    "u6ATcJfW5163357oTz",
    "TR7pINjW4PhSooz59P"
  ]
}
```

### 5.8 删除指定对象数据

删除应用指定的 class 的指定的一条数据

例如：（备注：在使用“删除指定对象数据”之前，需要对待删除的“指定数据”的“objectId”进行查询，以使用于以下呈现。）

请求：

- 请求地址： ```/classes/test/eQkvWdiysSKj5wGCKa```
- 请求方法： ```DELETE```

请求内容: 无请求内容。（备注：必填“Path参数”中的2个“参数值”（classname/objectId)与待“删除指定对象定义"命名名称保持一致。）

返回：格式为 JSON

```json
{
  "code": 200,
  "results": "eQkvWdiysSKj5wGCKa"
}
```

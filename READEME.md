# PureMysql

this is a pure mysql lib, you just can use it to test and a script

use demo
```js

const config = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'data',
    // debug: ['ComQueryPacket', 'RowDataPacket']
}

const con = new Mysql(config)

con.select("select * from students where id = 100")
    .then((rows) => {
        console.log(ret);
        for (const row of ret) {
            console.log(row);
        }
    })

con.select("select * from students where name=:name", { name: '李白' })
    .then((ret) => {
    for (const row of ret) {
        console.log(row.name);
    }
})


con.select("select * from students where name = ?", ['李白'])
    .then((ret) => {
    for (const row of ret) {
        console.log(row);
    }
})

con.selectOne("select * from students where name = ? limit 1", ['李白'])
    .then((ret) => {
    console.log(ret);
})

con.update("update students set age = :age where id = :id", { age: 30, id: 3 })
    .then((ret) => {
    console.log(ret);
})


con.insert("insert into students (name, age) values(:name, :age)", { age: 30, name: '杰克' })
    .then((ret) => {
    console.log(ret);
})

con.delete("delete from students where id = ?", [5])
    .then((ret) => {
    console.log(ret);
})

con.close()
```
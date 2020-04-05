/**
 * https://www.npmjs.com/package/mysql
 */

const mysql = require('mysql')

class Mysql {
    constructor(config) {
        this.con = mysql.createConnection(config)
        this.con.connect()
    }

    /**
     * 对sql 进行预处理， 支持? 和参数 :key
     * @param {string} query 
     * @param {any} values 
     */
    preQueryFormat(query, values) {
        if (!values) return query;
        if (Array.isArray(values)) return query;

        return query.replace(/\:(\w+)/g, function (txt, key) {
            if (values.hasOwnProperty(key)) {
                return mysql.escape(values[key]);
            } else {
                return txt;
            }
        })
    }

    query(sql, values) {
        sql = this.preQueryFormat(sql, values)

        return new Promise((resolve, reject) => {
            this.con.query(sql, values, function (err, result) {
                if (err) {
                    reject(err.message)
                } else {
                    resolve(result)
                }
            })
        })
    }

    async select(sql, values) {
        const result = await this.query(sql, values)
        return result
    }

    async selectOne(sql, values) {
        const result = await this.query(sql, values)
        if (result.length > 0) {
            return result[0]
        } else {
            return {}
        }
    }

    async update(sql, values) {
        const result = await this.query(sql, values)
        return result.affectedRows
    }

    async delete(sql, values) {
        const result = await this.query(sql, values)
        return result.affectedRows
    }

    async insert(sql, values) {
        const result = await this.query(sql, values)
        return result.insertId
    }

    close() {
        this.con.end()
    }
}


module.exports = Mysql
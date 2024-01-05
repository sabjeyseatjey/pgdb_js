const db = require('../db');



class UserController{
    async createUser(req, res){
        const {name, age} = req.body
        const newPerson = await db.query(`INSERT INTO users (name, age) values ($1, $2) RETURNING *`, [name, age])
        res.json(newPerson.rows[0])
        // res.json(newPerson)

    }
    async getUser(req, res){
        const users = await db.query(`SELECT * FROM users`)
        res.json(users.rows)
    }
    async getOneUser(req, res){
        const id = req.params.id
        const user = await db.query(`SELECT * FROM users WHERE id = $1 `, [id])
        res.json(user.rows[0])

    }
    async updateUser(req, res){
        const {id , name , age} = req.body
        const user = await db.query(`UPDATE users set name = $1, age = $2 WHERE id = $3 RETURNING *`, [name , age, id])
        res.json(user.rows[0])
    }
    async deleteUser(req, res){
        const id = req.params.id
        const user = await db.query(`DELETE FROM users WHERE id = $1 `, [id])
        res.json(user.rows[0])
    }
}

module.exports = new UserController
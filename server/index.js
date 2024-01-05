const express = require('express')
const pool = require('./db');


const userRoter = require('./rotes/user.rotes')



const PORT = process.env.PORT || 8080

const app = express()

app.use(express.json())
app.use('/api' , userRoter)


app.get('/', async (req, res) => {
    try {
      const result = await pool.query("SELECT * FROM users");
      res.json( result.rows );
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
      res.status(500).json({ error: 'Ошибка при выполнении запроса' });
    }
});

app.listen(PORT, () => console.log(`server started in a port http://localhost:${PORT}`))
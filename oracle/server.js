const express = require('express');
const oracledb = require('oracledb');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); 

const dbConfig = {
    user: 'system',
    password: '2023503009',
    connectString: 'localhost:1521/XE'
};

app.post('/add-student', async (req, res) => {
    try {
        let { name, roll_no } = req.body;

        if (!name || !roll_no) {
            return res.status(400).json({ error: "Name and Roll No are required!" });
        }

        let con = await oracledb.getConnection(dbConfig);

        await con.execute(
            `INSERT INTO students(name, roll_no) VALUES (:name, :roll_no)`,
            { name, roll_no },
            { autoCommit: true }
        );

        let result = await con.execute(`SELECT * FROM students WHERE name IS NOT NULL AND roll_no IS NOT NULL`);
        await con.close();

        res.json({ message: 'Student Added!', students: result.rows });
    } catch (e) {
        console.error("Error adding student:", e);
        res.status(500).json({ error: e.message });
    }
});

app.get('/students', async (req, res) => {
    try {
        let con = await oracledb.getConnection(dbConfig);
        let result = await con.execute(`SELECT * FROM students WHERE name IS NOT NULL AND roll_no IS NOT NULL`);
        await con.close();

        res.json(result.rows);
    } catch (e) {
        console.error("Error fetching students:", e);
        res.status(500).json({ error: e.message });
    }
});
app.listen(3001, () => console.log('Server running on http://localhost:3001'));

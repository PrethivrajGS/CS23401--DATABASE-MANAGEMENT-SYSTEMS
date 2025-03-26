const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function fun () {
    let con;
    try {
        con = await oracledb.getConnection({
            user: 'system',
            password: '2023503009',
            connectString: 'localhost:1521/XE',  // Ensure correct format
        });

        
        await con.execute(`INSERT INTO students(name,roll_no) values ('selva',2023503007)`);
         const data = await con.execute(`SELECT * FROM students WHERE name IS NOT NULL AND roll_no IS NOT NULL`);

        console.log(data.rows);
    } catch (e) {
        console.error(e);
    } finally {
        if (con) {
            await con.close();
        }
    }
}

fun();

const fs = require('fs'); //파일에 접근할 수 있는 라이브러리 
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

//database 접근 
//파일 접근
const data = fs.readFileSync("./database.json");
// 파일 내 데이터 parshing
const conf = JSON.parse(data);
const mysql = require('mysql');

//mysql연결하고 연결객체를 이용할수 있게 한다
//정보는 파일로부터 읽어온다
const connection = mysql.createConnection({
    host : conf.host,
    user : conf.user,
    password:conf.password,
    port: conf.port,
    database:conf.database
});
connection.connect();



app.get('/api/customers', (req,res) => {
    //이 페이지에 접근시 쿼리를 날리게 한다
    connection.query(
        "SELECT * FROM CUSTOMER",
        //가져온 데이터는 rows로 처리
        (err, rows, fields) =>{
            //row를 사용자에게 다시 날려준다
            res.send(rows);
        }

    );
});


app.listen(port, () => console.log(`listening on port ${port}`));


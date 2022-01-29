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

//library fo fandle upload file 
const multer = require('multer');
const { CLIENT_SECURE_CONNECTION } = require('mysql/lib/protocol/constants/client');
const res = require('express/lib/response');
//set up upload folder 
const upload = multer({dest: './upload'});




app.get('/api/customers', (req,res) => {
    connection.query(
        "SELECT * FROM CUSTOMER WHERE isDeleted = 0",
        (err, rows, fields) =>{
            res.send(rows);
        }

    );
});

//user come through iamage folder to check image file which is 
//same folder we hace in directory, called 'upload'
app.use('/image', express.static('./upload'));

//handle when customer send additional customer data in webpage (api/cusotmers/)
app.post('/api/customers', upload.single('image'), (req,res) => {
    let sql = "INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?, now(), 0)";
    let image = '/image/' + req.file.filename;  //multer library make filename
    let name = req.body.name;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;
    // console.log(name); debudgging
    // console.log(image);
    // console.log(birthday);
    // console.log(gender);
    // console.log(job);
    let params = [image, name, birthday, gender, job];
    connection.query(sql, params,
        (err, rows, fileds) => {
            res.send(rows);
            // console.log(err);
            // console.log(rows);
        });
});

//when call delete method, 
//when id is matched
app.delete('/api/customers/:id', (req,res) =>{
    let sql = 'UPDATE CUSTOMER SET isDELETED = 1 WHERE id = ?';
    let params = [req.params.id];
    connection.query(sql, params,
        (err,rows, fields) => {
            res.send(rows);
        })
})

app.listen(port, () => console.log(`listening on port ${port}`));


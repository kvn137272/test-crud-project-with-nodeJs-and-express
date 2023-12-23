//استفاده از متغیر های محیطی به دلیل امنیت و عدم اشتراک این متغیر ها برای کسی 
// .env از فایل 
require('dotenv').config();
const mongoose = require('mongoose');
const express= require('express')

// پلاگین برای ارسال دیتا به یو آر ال
const bodyParser = require('body-parser');
const PORT= 3000;
const app = express();
app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json())

// تعریف روت پست
app.use('/posts',require('./routes/posts'));

// تعریف اینکه هر ادرسی غیر از آدرس هایی که تعریف کردیم وارد شد ارور 404 دریافت 
app.all('*',(req,res)=>{
    res.sendStatus(404)
})



// اتصال به دیتابیس
const {connect} = require('./dbConnection/dbConnection');
connect()
mongoose.connection.once("open", () => {
    console.log("connection is success");
    app.listen(PORT, () => {
      console.log(`listen on port ${PORT}`);
    });
  });




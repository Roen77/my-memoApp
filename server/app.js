
const express = require('express');
const cors = require('cors');
const morgan=require('morgan');
const {sequelize} = require('./models');
const prod=process.env.NODE_ENV === 'production'
const PORT=5000
// router
const userRouter=require('./router/user');
const boardRouter=require('./router/board');
const cardRouter=require('./router/card');
const categoryRouter=require('./router/category');

const app=express()

// db 연결
sequelize.sync()
.then(()=>{
    console.log('db 연결 성공')
})
.catch(err=>console.error(err));


if (prod) {
    app.use(morgan('combined'));
  } else {
    app.use(morgan('dev'));
  }

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// router
app.use('/user',userRouter);
app.use('/boards',boardRouter);
app.use('/cards',cardRouter);
app.use('/categorys', categoryRouter);

app.get('/',(req,res)=>{
  return res.json({
    url:'https://vuememo-sv.herokuapp.com'
  })
})

app.listen(prod?process.env.PORT:PORT,()=>{
    console.log(`${prod?process.env.PORT:PORT}번에서 실행중`)
})
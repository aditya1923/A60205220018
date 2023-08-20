const exp = require('express');
const cors = require('cors');
const axios = require('axios');

const app = exp();

app.use(cors());
app.use(exp.json());

app.get('/',function(req,res){
    return res.status(200).send('Server working fine');
})

app.get('/numbers', async function(req,res){
    const url = req.query;
    // console.log(url.url[0]);
    let result = [];
    await axios.get(`${url.url[0]}`).then(async(res)=>{
        //console.log(res.data.numbers)
        result = res.data.numbers;
    }).catch((err)=>{
        // console.log(err)
    })
    return res.status(200).json({numbers: result});
})


app.listen(8008, function(req,res){
    console.log('server started at port 8008');
})
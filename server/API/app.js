const express = require('express')
const app = express()
const dal = require('../DAL/no-sql.js')
const cors = require('cors')
var bodyParser = require('body-parser')

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET", "PUT", "POST", "DELETE", "OPTIONS");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     next();
// });
app.use(cors())
app.use(bodyParser.json())


app.get('/fans/:state',function(req,res){
  dal.fansByState(req.params.state,1000,function(err,body){
    if(err){
      return console.log(err.message)
    }
    if(res){
      res.send(body)
    }
  })
})

app.get('/fan/:fan',function(req,res){
  var fan = req.params.fan
  dal.getFan(fan,function(err,body){
    if(err){
      return console.log(err.message)
    }
    if(body){
      res.send(body)
    }
  })
})

app.post('/fan',function(req,res){
  var doc = req.body
  console.log(req.body)
  dal.createFan(doc,function(err,body){
    if(err){
      return console.log(err.message)
    }
    if(body){
      return res.send(body)
    }
  })
})

app.put('/fan',function(req,res){
  var doc = req.body
  dal.updateFan(doc,function(err,body){
    if(err){
      return(console.log(err.message))
    }
    if(body){
      return res.send(body)
    }
  })
})

app.get('/streetteam',function(req,res){
  dal.listStreetTeam('streetteam',function(err,body){
    if(err){
      return console.log(err.message)
    }
    if(body){
      res.send(body)
    }
  })
})

app.delete('/fan/:id',function(req,res){
  dal.removeFan(req.params.id,function(err,body){
    if(err){
      return res.send(err.message)
    }
    if(body){
      res.send(body)
    }
  })
})

app.listen(3039,function(){
  console.log('listening on port 3039')
})
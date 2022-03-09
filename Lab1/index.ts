const express = require('express');
 const app = express();
  app.get('/', (req, res) => { 
      res.send(req.query);
    })
  app.get('/add/:num1/:num2', (req, res) => { 

      if(req.query.length >2){
        res.send("You have entered too many numbers")
      }
      let num1 :number = parseInt(req.params.num1)
      let num2 :number = parseInt(req.params.num2)    
      
      
      res.send(num1+" + "+num2+" = "+(num1+num2));
  })
  app.get('/subtract/:num1/:num2', (req, res) => { 

    if(req.query.length >2){
      res.send("You have entered too many numbers")
    }
    let num1 :number = parseInt(req.params.num1)
    let num2 :number = parseInt(req.params.num2)    
    
    
    res.send(num1+" - "+num2+" = "+(num1-num2));
})
app.get('/multiply/:num1/:num2', (req, res) => { 

  if(req.query.length >2){
    res.send("You have entered too many numbers")
  }
  let num1 :number = parseInt(req.params.num1)
  let num2 :number = parseInt(req.params.num2)    
  
  
  res.send(num1+" * "+num2+" = "+(num1*num2));
})
app.get('/divide/:num1/:num2', (req, res) => { 

  if(req.query.length >2){
    res.send("You have entered too many numbers")
  }
  let num1 :number = parseInt(req.params.num1)
  let num2 :number = parseInt(req.params.num2)    
  
  
  res.send(num1+" / "+num2+" = "+(num1/num2));
})
 app.listen(3000)
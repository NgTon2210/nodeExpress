const express = require('express')
const app = express()

var bodyParser = require('body-parser')
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
const port = 9008
var users = [
    {id:1, name: "nguyen van ton", age:"21"},
    {id:2, name: "nguyen van a", age:"22"},
    {id:3, name: "nguyen van b", age:"23"}
]
app.set('view engine', 'pug')
app.set('views', './views')
app.get('/', (req, res) => {
    
  res.render('index', {
      name: 'ton'
  })
})
app.get('/user', (req, res) =>{
    res.render('user/index', {
        users: users
    })
})

//seach
app.get('/user/search', (req, res) =>{
    var q = req.query.q
   
    var matchedUser = users.filter((user)=>{
        return user.name.indexOf(q) !== -1
    })
    res.render('user/index',{
        users: matchedUser
    })
})
//post
app.get('/user/create', (req, res) =>{
    res.render('user/create')
})
app.post('/user/create', (req, res)=>{
    users.push(req.body)
    res.redirect('/user')
})
//detail user
app.get('/user/:id', (req, res)=>{
    
    var id = parseInt(req.params.id)
   
    var user = users.find(user => user.id === id)
    res.render('user/view',{
        user: user
    })
})
//delete
app.get('/user/delete/:id', (req, res)=>{
    var id = parseInt(req.params.id)
    var user =  users.filter(user => user.id !== id)
    console.log(user)
    res.render('user/index',{
        users: user
    })
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 3000

let db,
    dbConnectionStr = 'mongodb+srv://rob:boo@cluster0.i9ynm.mongodb.net/to-do?retryWrites=true&w=majority',
    dbName = 'rap'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })
    
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/',(request, response)=>{
    db.collection('rappers').find().toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

app.post('/addRapper', (request, response) => {
    db.collection('rappers').insertOne(request.body)
    .then(result => {
        console.log('Rapper Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.delete('/deleteRapper', (request, response) => {
    db.collection('rappers').deleteOne({item: request.body.stageNameS})
    .then(result => {
        console.log('Rapper Deleted')
        response.json('Rapper Deleted')
    })
    .catch(error => console.error(error))

})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const PORT = 4328
const router = express.Router()
const request = require('request')

let apik = ""

app.use(express.static(path.join(__dirname, 'components')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    next()
})
// mongoose.set('debug', true)
mongoose.connect('mongodb://localhost/fullexg', { useNewUrlParser: true })

const Schema = mongoose.Schema
const personSchema = new Schema({
    // _id: false,
    id: String,
    name: String,
    location: String
})

const peoplecollection = mongoose.model('peopleCollections', personSchema, 'peopleCollections')

let nPerson
app.get('/bios/:userName', function (req, res) {
    let userName = req.params.userName
    request(`https://torre.bio/api/bios/${userName}`,
        async function (error, result, data) {
            let person = await JSON.parse(data)
            nPerson = new peoplecollection({
                id: person.id,  //location.name
                name: person.name,  //location.name
                location: person.address
            })
            res.send(nPerson)
        })
})


app.post('/jobs', async function (req, res) {
    let data = req.body.data
    console.log(data)
    res.send()
})

app.listen(PORT, function () {
    console.log('run')
})
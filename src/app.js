const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weatherUrl = require('./utils/weatherapp')


const app = express()
const port = process.env.PORT || 3000
const publicDirectoriesPath = path.join(__dirname, '../public') 
// to change path for the views, define path for express
 const viewsPath = path.join(__dirname, '../templates/views')
 const partialPath = path.join(__dirname, '../templates/partials')
 //const viewsPathWay = path.join(__dirname,'../utils')

 //setup handlers engine and views location
 app.set('view engine', 'hbs')
 app.set('views', viewsPath)
 //app.set('utils', viewsPathWay)
 hbs.registerPartials(partialPath)

// setup public directory to serve
app.use(express.static(publicDirectoriesPath))

app.get('', (req,res)=>{
    res.render('index', {
        title: 'weather App',
        name: 'Balogun jamiu'
    })
})
app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Me',
        name: "Balogun jamiu"
    })
}) 
app.get('/help', (req,res)=>{
    res.render('help',{
        message:'How can we assist you, pls click the button below',
        title: "help",
        name: 'balogun jamiu'
    } )
})
app.get('/weather/address=', (req,res)=>{
    if (!req.query.address){
        return res.send({
            error:"you have not provided any location"
        })
    }   
     geocode(req.query.address, (error,{latitude, longitude, location}={}) =>{
        if(error){
            return res.send({error})
        }
        weatherUrl(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
     })
})

app.get('/products',(req, res)=>{
    if (!req.query.search){
         return res.send({
            error:'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})
 app.get('/help/*', (req,res) =>{
     res.render('error',{
        title: '404',
        name: 'Balogun jamiu',
        message:'Help article not found'
     })
 })
app.get('*', (req,res) =>{
    res.render('error',{
        title: '404',
        name: 'Balogun jamiu',
        message:'Page not found'
    })
})
// app.com

app.listen(port, () =>{
    console.log('server is up on port 3000' + port)
})
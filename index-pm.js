import  express from 'express'

const app = express()

app.listen(8080, ()=>{
    console.log(`Server running on port....`)
})

app.get('/', (req, res)=>{
    res.send(`Hola mundo`)
})
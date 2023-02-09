import express  from 'express'
import cluster from 'cluster'
import core from 'os'

const app = express()

if(cluster.isPrimary){
    console.log(`Primary process ${process.pid} is running`)

    for(let i = 0; i<core.cpus().length;i++){
        cluster.fork()
    }
    cluster.on('exit', (worker, code)=>{
        console.log(`Worker ${worker.process.pid} died with code ${code}`)
        cluster.fork()
    })
}else{
    app.listen(8080, ()=> console.log(`Worker ${process.pid} running`))
    app.get('/', (req,res)=>{
        const today = new Date()
        const date = `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`
        res.send(`Servidor express PID - ${process.pid} / ${date}`)
    })
}

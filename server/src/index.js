import espress from "express";
import  './config/config.js'

const PORT = process.env.PORT || 5000
const app = espress();


app.get('/', ( req , res ) => {
    res.send('Hola mundo')
})

app.listen(PORT , ()=>{
    console.log(`server run in port : http://localhost:${PORT}`);
})
const mongoose=require('mongoose');
const Document=require('./documentSchema');
const express=require('express')
const app=express();
const http=require("http").createServer(app);
const {Server} =require("socket.io");
const cors=require('cors')

const port=process.env.PORT || 3001;
app.use(cors()); 

const io =new Server(http,{
    cors :{
        origin : '*', 
        methods:["GET","POST"],
    },   
});

http.listen(port,()=>{
    console.log("server running on port 3001");
})



mongoose.connect("mongodb+srv://Ajay03:Ajay2002@cluster0.kfubfom.mongodb.net/test",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{console.log("connected to db")}).catch((err)=>{
    console.log(err);
})


io.on('connection',socket =>{
    console.log("connected");
    socket.on('disconnect',()=>{
        console.log("disconnected")
    })
    socket.on('get-document', async (id)=>{
        let document=await findOrCreateDocument(id);
        console.log(id);
        socket.join(id);
        socket.emit('load-document',document.data)
        socket.on('send-changes',(delta)=>{
            socket.broadcast.to(id).emit("receive-changes",delta);
        })
        socket.on("save-document", async (data)=>{
            await Document.findByIdAndUpdate(id,{data})
        })
    }) 
})

let findOrCreateDocument = async (id)=>{
    if(id===null){
        return ;
    }
    const document = await Document.findById(id);
    if(document){
        return document;
    }
    return await Document.create({_id:id,data:"" })
}
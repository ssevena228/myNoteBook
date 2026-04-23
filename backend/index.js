require("dotenv").config()
const express = require('express');
const connectToDB = require('./database');
const app = express();
const cors = require('cors')

const userRoute = require('./router/user.router')
const noteRoute = require('./router/note.router')
const contactRoute = require('./router/contact.router')



const PORT = process.env.PORT;

connectToDB()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send({
        message: "welcome to Home Page"
    })
})

app.use("/api/v3.2/auth", userRoute)

app.use("/api/v3.2/note", noteRoute)

app.use("/api/v3.2/contact", contactRoute)




app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

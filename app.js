const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.json({"message" : "Welcome to Jenkins tutorial!!!"})
})

app.get('/health', (req, res) => {
    res.send({"message" : "App is running",
        "status" : "OK"
    })
})
app.listen(3000, () => {
    console.log("Jenkins Demo app is listening on PORT 3000")
})
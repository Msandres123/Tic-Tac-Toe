const express = require('express')
const fetch = require('isomorphic-unfetch')
const path = require('path') 

const app = express()

const port = process.env.PORT || 5000

app.use(express.static('./client/public')) 

app.get('*', (req, res) => {
    res.sendFile(path.resolve('./index.html'))
})

app.listen(port, () => {
    console.log("listening on port", port)
})
const express = require('express')
const cors = require('cors')
const fs = require('fs')

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.get('/api/v1/books', (req, res) => {
    try {
        const { tableName } = req.query
        const data = fs.readFileSync('db.json', 'utf8')
        const selectedTableData = JSON.parse(data)[tableName]
        res.json({ data: selectedTableData })
    } catch (error) {
        console.log(error)
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
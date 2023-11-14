const service = require("./critics.service");

async function list(req, res) {
    const criticData = await service.list()
    res.json({ data: criticData })
}

module.exports = {
    list
}
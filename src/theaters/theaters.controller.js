const service = require("./theaters.service");

async function list(req, res) {
  const theaterData = await service.list()
  res.json({ data: theaterData })
}

module.exports = {
    list
}
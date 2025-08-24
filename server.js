import http from "node:http"
import { getDataFromDb } from "./database/db.js"
import sendJsonResponse from "./utils/sendJsonResponse.js"
import getDataByPathParams from "./utils/getDataByPathParams.js"
import getDataByQueryParams from "./utils/getDataByQueryParams.js"

const PORT = 8000
const server = http.createServer(async (req, res) => {
    const destinations = await getDataFromDb()

    const urlObj = new URL(req.url, `http://${req.headers.host}`)
    const queryObj = Object.fromEntries(urlObj.searchParams)

    if (req.method === "GET" && urlObj.pathname === "/api") {
        let filteredData = getDataByQueryParams(destinations,queryObj)
        sendJsonResponse(res, 200, filteredData)
    }
    else if (req.url.startsWith('/api/continent') && req.method === "GET") {
        const continent = req.url.split('/').pop()
        const filteredData = getDataByPathParams(destinations, 'continent', continent)
        sendJsonResponse(res, 200, filteredData)
    }
    else if (req.url.startsWith('/api/country') && req.method === "GET") {
        const country = req.url.split('/').pop()
        const filteredData = getDataByPathParams(destinations, 'country', country)
        sendJsonResponse(res, 200, filteredData)
    }
    else {
        sendJsonResponse(res, 404, { error: "not found", message: "The requested route does not exist" })
    }
})
server.listen(PORT, () => { console.log(`Server Running on ${PORT}`) })
export default function sendJsonResponse(res, statusCode, payLoad) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET')
    res.statusCode = statusCode
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(payLoad,null, 2))

}

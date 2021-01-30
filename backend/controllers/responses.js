module.exports = {
    sendJSONresponse(res, status, content) {
        res.status(status).send(content)
    }
};
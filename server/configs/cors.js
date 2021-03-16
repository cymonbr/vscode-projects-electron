module.exports = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '127.0.0.1')
    res.header('Access-Control-Allow-Methods', 'GET')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    next()
}
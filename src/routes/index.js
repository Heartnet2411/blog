const newsRouter = require('./news')
const siteRouter = require('./site')
const courseRouter = require('./course')
const meRouter = require('./me')

function routes(app) {
    app.use('/me', meRouter)

    app.use('/course', courseRouter)

    app.use('/news', newsRouter)

    app.use('/', siteRouter)
}

module.exports = routes

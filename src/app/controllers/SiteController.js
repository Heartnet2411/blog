const Course = require('../models/Course')

class SiteController {
    // GET /home
    async index(req, res, next) {
        try {
            const courses = await Course.find({ deletedAt: null }).lean()
            res.render('home', { courses })
        } catch (error) {
            res.status(400).json({ error: 'ERROR!!!' })
        }
    }

    // GET /search
    search(req, res) {
        res.render('search')
    }
}

module.exports = new SiteController()

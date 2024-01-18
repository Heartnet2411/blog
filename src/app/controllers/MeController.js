const Course = require('../models/Course')

class MeController {
    // GET /me/stored/courses
    async storedCourse(req, res) {
        try {
            const courses = await Course.find({ deletedAt: null }).lean()
            res.render('me/stored-course', { courses })
        } catch (error) {
            res.status(400).json({ error: 'ERROR!!!' })
        }
    }
}

module.exports = new MeController()

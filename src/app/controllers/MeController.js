const Course = require('../models/Course')

class MeController {
    // GET /me/stored/courses
    async storedCourse(req, res, next) {
        Promise.all([
            Course.find({}).lean(),
            Course.countDocumentsWithDeleted({ deleted: true }),
        ])
            .then(([courses, deletedCount]) =>
                res.render('me/stored-course', { courses, deletedCount })
            )

            .catch(next)
    }

    // GET /me/trash/courses
    async trashCourse(req, res) {
        try {
            const courses = await Course.findWithDeleted({
                deleted: true,
            }).lean()
            res.render('me/trash-course', { courses })
        } catch (error) {
            res.status(400).json({ error: 'ERROR!!!' })
        }
    }
}

module.exports = new MeController()

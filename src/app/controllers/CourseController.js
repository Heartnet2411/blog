const Course = require('../models/Course')

class CourseController {
    // GET /course/:slug
    async show(req, res, next) {
        try {
            const course = await Course.findOne({
                slug: req.params.slug,
            }).lean()
            res.render('courses/show', { course })
        } catch (error) {
            next(error)
        }
    }

    // GET /course/create
    create(req, res, next) {
        res.render('courses/create')
    }

    // POST /course/store
    async store(req, res, next) {
        try {
            const formData = req.body
            formData.image = `https://img.youtube.com/vi/${req.body.videoID}/sddefault.jpg`
            const course = new Course(formData)
            await course.save()
            res.redirect('/')
        } catch (error) {
            next(error)
        }
    }

    // GET /course/:id/edit
    async edit(req, res, next) {
        try {
            const course = await Course.findById(req.params.id).lean()
            res.render('courses/edit', { course })
        } catch (error) {
            next(error)
        }
    }

    // PUT /course/:id
    async update(req, res, next) {
        try {
            const formData = req.body
            formData.image = `https://img.youtube.com/vi/${req.body.videoID}/sddefault.jpg`
            const course = await Course.findById(req.params.id)
            course.set(formData)
            await course.save()
            res.redirect('/me/stored/course')
        } catch (error) {
            next(error)
        }
    }

    // DELETE /course/:id
    async delete(req, res, next) {
        try {
            await Course.delete({ _id: req.params.id })
            res.redirect('/me/stored/course')
        } catch (error) {
            next(error)
        }
    }

    // PATCH /course/:id/restore
    async restore(req, res, next) {
        try {
            await Course.restore({ _id: req.params.id })
            res.redirect('back')
        } catch (error) {
            next(error)
        }
    }

    // DELETE /course/:id/force
    async forceDelete(req, res, next) {
        try {
            await Course.deleteOne({ _id: req.params.id })
            res.redirect('back')
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new CourseController()

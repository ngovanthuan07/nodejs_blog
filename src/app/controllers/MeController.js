const Course = require('../models/Course');


class MeController {
     // [GET]  /me/stored/courses
     storedCourses(req, res, next) {
        Course.find({})
            .then(courses => {res.render('me/stored-courses', {layout: 'layouts/layout', courses});   })
    }
}

module.exports = new MeController;
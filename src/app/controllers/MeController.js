const Course = require('../models/Course');


class MeController {
     // [GET]  /me/stored/courses
    storedCourses(req, res, next) {
        Course.find({})
            .then(courses => {res.render('me/stored-courses', {layout: 'layouts/layout', courses});   })
    }

     // [GET]  /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
        .then(courses => {res.render('me/trash-courses', {layout: 'layouts/layout', courses});   })
    }
}

module.exports = new MeController;
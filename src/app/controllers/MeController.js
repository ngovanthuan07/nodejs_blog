const Course = require('../models/Course');
class MeController {
     // [GET]  /me/stored/courses
    storedCourses(req, res, next) {
        Promise.all([Course.find({}).sortable(req), 
                     Course.countDocumentsDeleted()]
        )
            .then(([courses, deletedCount]) => {
                res.render('me/stored-courses', {
                        layout: 'layouts/layout', 
                        courses,
                        deletedCount,
                    }
                );   
            }) 
            .catch(next);
    }

     // [GET]  /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
        .then(courses => {res.render('me/trash-courses', {layout: 'layouts/layout', courses});   })
    }
}

module.exports = new MeController;
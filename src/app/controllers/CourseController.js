const Course = require('../models/Course');
class CourseController {

     // [GET]  /courses/:slug
     show(req, res, next) {
        Course.findOne({slug: req.params.slug})
            .then(course => {
                res.render("courses/show", {layout: "layouts/layout", course});
            })
            .catch(next);
    }
}

module.exports = new CourseController;
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
    // [GET]  /courses/create
    create(req, res, next) {
        res.render("courses/create", {layout: "layouts/layout"});
    }

    // [POST]  /courses/store
    store(req, res, next) {
        const formData = req.body; 
        formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const course = new Course(formData);
        course.save()
            .then(() => res.redirect(`/`))
            .catch(error => {
                console.log();
            });
    }
}

module.exports = new CourseController;
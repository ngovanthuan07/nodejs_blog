const Course = require('../models/Course');
class SiteController {

    // [GET]  /home
    index(req, res, next) {

        Course.find({})
            .then(courses => res.render('home', {title:'HOME TITLE', layout: "layouts/layout", courses}))
            .catch(error =>  next(error));
        //  res.render("home", {layout: "layouts/layout"});
    }
     // [GET]  /search
     search(req, res) {
        res.render('search', {layout: "layouts/layout"});    
    }

    show() {

    }
}

module.exports = new SiteController;
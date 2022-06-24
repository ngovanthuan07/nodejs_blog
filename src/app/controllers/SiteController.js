
class SiteController {

    // [GET]  /home
    index(req, res) {
        res.render("home", {layout: "layouts/layout"});
    }
     // [GET]  /search
     search(req, res) {
        res.render("search", {layout: "layouts/layout"});    
    }
}

module.exports = new SiteController;
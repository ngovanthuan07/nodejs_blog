
class NewsController {

    // [GET]  /news
    index(req, res) {
        res.render("news", {layout: "layouts/layout"});
    }
    // [GET]  /news
    show(req, res) {
        res.send('NEW DETAIL!!');
    }
}

module.exports = new NewsController;
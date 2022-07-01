const newRouter = require('./news')
const meRouter = require('./me')
const courseRouter = require('./courses')
const siteRouter = require('./site')
const listingRouter = require('./listing')

function route(app) {

    app.use('/listing', listingRouter);

    app.use('/news', newRouter);

    app.use('/me', meRouter);

    app.use('/courses', courseRouter);



    app.use('/', siteRouter);
  
}

module.exports = route;
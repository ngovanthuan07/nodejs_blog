const Course = require('../models/Course');
const User = require('../models/User');
const Base = require('../models/Base');


class ListingController {

    // [GET]  /home
    // courses(req, res, next) {
    //     let configs = Course.listingConfigs();
    //     let action = req.originalUrl.split('/').pop();

    //     let filters = Base.getFilter(req, res, configs);

    //     Course.find(filters)
    //         .then(records => res.render('list/listing', {title: Course.title, layout: "layouts/layout", configs, records, action}))
    //         .catch(error =>  next(error));
    // }

    // users(req, res, next) {
    //     let configs = User.listingConfigs();
    //     let action = req.originalUrl.split('/').pop();
    //     let orderBy = {
    //         field: '_id',
    //         sort: 'desc'
    //     }

    //     if(req.query.hasOwnProperty('sort')) {
    //         let input = res.query.sort;
    //         let field = input.substring(0, input.lastIndexOf('_'));
    //         let sort = input.substring(input.lastIndexOf('_') + 1, input.length);
    //         orderBy = {field, sort}
    //     }

    //     let filters = Base.getFilter(req, res, configs);

    //     User.find(filters).sortable2(orderBy)
    //         .then(records => res.render('list/listing', {title:User.title, layout: "layouts/layout", configs, records, action}))
    //         .catch(error =>  next(error));
        
    // }

    index(req, res, next) {
        let action = req.originalUrl.split('/').pop().includes('?')  
                        ? req.originalUrl.split('/').pop().substring(0, req.originalUrl.split('/').pop().indexOf('?'))
                        : req.originalUrl.split('/').pop();

        let Model =  require(`../models/${action.charAt(0).toUpperCase().concat(action.slice(1)).slice(0, action.length-1)}`);


        let configs = Model.listingConfigs();

        // cho the cho orderBy = {}
        let orderBy = {
            field: '_id',
            sort: 'desc'
        }

        if(req.query.hasOwnProperty('sort')) {
            let input = req.query.sort;
            let field = input.substring(0, input.lastIndexOf('_'));
            let sort = input.substring(input.lastIndexOf('_') + 1, input.length);
            orderBy = {field, sort}
        }

        res.cookie(action + '_sort', JSON.stringify(orderBy)); // Cách này sẽ giúp ta vừa lọc vừa sắp sếp (Tính năng mở rộng)
        if(req.method === 'POST') {
            if(req.cookies[action + '_sort']) {
                orderBy = JSON.parse(req.cookies[action + '_sort']);
            }
        }
        


        let filters = Base.getFilter(req, res, configs);

        Model.find(filters).sortable2(orderBy)
            .then(records => res.render('list/listing', {title:Model.title, layout: "layouts/layout", configs, records, action, orderBy}))
            .catch(error =>  next(error));
        
    }


    
}

module.exports = new ListingController;
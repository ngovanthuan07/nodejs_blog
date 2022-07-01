const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;
const mongoose_delete = require('mongoose-delete');
const base = require('./Base');




const CourseSchema = new Schema({
  name: {type: String, maxLength: 255},
  description: {type: String, maxLength: 600},
  image: {type: String,  maxLength: 255},
  videoId:{type: String,  maxLength: 255},
  level: {type: String,  maxLength: 255},
  slug: { type: String, slug: 'name', unique: true },
}, {
  timestamps:true

});

// Custom query helpers
CourseSchema.query.sortable = function (req) {
  if(req.query.hasOwnProperty('_sort')) {
    const isValidType = ['asc', 'desc'].includes(req.query.type);
      return this.sort({
          [req.query.column]: isValidType ? req.query.type : 'desc',
      })
  }
  return this;
}

CourseSchema.query.sortable2 = function (orderby) {
  if(Object.keys(orderby).length) {
    return this.sort({
          [orderby['field']]: orderby['sort'] ? orderby['sort'] : 'desc',
    })
  }
  return this;
}


// Add plugins
mongoose.plugin(slug);
CourseSchema.plugin(mongoose_delete, {
  deletedAt : true,
  overrideMethods: 'all',
});

module.exports = mongoose.model('Course', CourseSchema);

module.exports.title = 'Khoá học';

module.exports.listingConfigs = function() {
  let configs = [
    {
        'field': '_id',
        'name': 'ID',
        'type': 'text',
        'filter': 'equal',
        'sort': true,
    },
    {
        'field': 'name',
        'name': 'Tên sản khoá học',
        'type': 'text',
        'filter': 'like',
        'sort': true,
    },
    {
        'field': 'description',
        'name': 'Mô tả',
        'type': 'text'         
    },
    {
        'field': 'image',
        'name': 'Ảnh',
        'type': 'image'         
    },

  ];

  return configs.concat(base.configs);
}


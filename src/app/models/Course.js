const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;
const mongoose_delete = require('mongoose-delete');




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


// Add plugins
mongoose.plugin(slug);
CourseSchema.plugin(mongoose_delete, {
  deletedAt : true,
  overrideMethods: 'all',
});

module.exports = mongoose.model('Course', CourseSchema);
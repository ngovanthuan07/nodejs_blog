const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;
const mongoose_delete = require('mongoose-delete');




const Course = new Schema({
  name: {type: String, maxLength: 255},
  description: {type: String, maxLength: 600},
  image: {type: String,  maxLength: 255},
  videoId:{type: String,  maxLength: 255},
  level: {type: String,  maxLength: 255},
  slug: { type: String, slug: 'name', unique: true },
}, {
  timestamps:true

});

// Add plugins
mongoose.plugin(slug);
Course.plugin(mongoose_delete, {
  deletedAt : true,
  overrideMethods: 'all',
});

module.exports = mongoose.model('Course', Course);
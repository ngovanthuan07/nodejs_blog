const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;
const mongoose_delete = require('mongoose-delete');
const base = require('./Base');




const UserSchema = new Schema({
  name: {type: String, maxLength: 255},
  age: {type: Number, maxLength: 600},
  address: {type: String,  maxLength: 255},
}, {
  timestamps:true
});

// Add plugins
UserSchema.plugin(mongoose_delete, {
  deletedAt : true,
  overrideMethods: 'all',
});

UserSchema.query.sortable2 = function (orderby) {
  if(Object.keys(orderby).length) {
    return this.sort({
          [orderby['field']]: orderby['sort'] ? orderby['sort'] : 'desc',
    })
  }
  return this;
}

module.exports = mongoose.model('User', UserSchema);

module.exports.title = 'Người dùng';

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
        'name': 'Tên người dùng',
        'type': 'text',
        'filter': 'like',
        'sort': true,
    },
    {
        'field': 'age',
        'name': 'Tuổi',
        'type': 'number',
        'filter': 'between', 
        'sort': true,
    },
    {
        'field': 'address',
        'name': 'Địa chỉ',
        'type': 'text' 
    },
  ];
  return configs.concat(base.configs);
}



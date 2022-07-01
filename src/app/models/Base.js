
module.exports.configs = [
    {
        'field': 'updatedAt',
        'name': 'Ngày cập nhật',
        'type': 'text',
        'sort': true,         
    },
    {
        'field': 'createdAt',
        'name': 'Ngày tạo',
        'type': 'text',
        'sort': true,         
    },
    {
        'field': 'copy',
        'name': 'Copy',
        'type': 'copy'         
    },
    {
        'field': 'edit',
        'name': 'Sửa',
        'type': 'edit'         
    },
    {
        'field': 'delete',
        'name': 'Xoá',
        'type': 'delete'         
    },
]


module.exports.getFilter = function(req, res, configs) {
    let lastNameURL = req.originalUrl.split('/').pop().includes('?')  
                    ? req.originalUrl.split('/').pop().substring(0, req.originalUrl.split('/').pop().indexOf('?'))
                    : req.originalUrl.split('/').pop(); // pop() => get last element array 
    let conditions = {};
    let nameCookie = lastNameURL + '_filter';  
    let modelFilter = req.cookies[nameCookie];

    if(req.method === 'POST') {
      for(let config of configs) {
        if(config['filter']) {
          let value = req.body[config['field']];
          if(value) {
            switch (config['filter']) {
                case 'equal':
                    conditions[config['field']] = value;
                    config['filter_value'] = value
                    break;
                case 'like':
                    conditions[config['field']] =  {'$regex': value};
                    config['filter_value'] = value
                    break;
                case 'between':
                    let from = value[0];
                    let to = value[1];
                    let condition = {};
                    if(from) {
                        condition.$gte = from;
                        config['filter_from_value'] = from
                    }
                    if(to) {
                        condition.$lte = to;
                        config['filter_to_value'] = to
                    }
                    if(Object.keys(condition).length)
                        conditions[config['field']] = condition;
                    break;
            }
          }
        }
      }
        // if(Object.keys(conditions).length) {
            res.cookie(nameCookie, JSON.stringify(conditions));
        // }

    } else { // GET

        conditions = modelFilter ? JSON.parse(modelFilter) : {};

        if(Object.keys(conditions).length) {
            for(let config of configs) { 
                if(conditions[config['field']]) {
                    switch (config['filter']) {
                        case 'equal':
                            config['filter_value'] = conditions[config['field']];
                            break;
                        case 'like':
                            config['filter_value'] = conditions[config['field']]['$regex'];
                            break;

                        case 'between':
                            if(conditions[config['field']]['$gte']) {
                                config['filter_from_value'] = conditions[config['field']]['$gte'];
                            }
                            if(conditions[config['field']]['$lte']) {
                                config['filter_to_value'] = conditions[config['field']]['$lte'];
                            }
                            break;
                    }
                }
            }
           
        }

    }
    
    return conditions;
}
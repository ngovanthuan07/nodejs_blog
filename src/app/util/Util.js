const xss = require("xss");
module.exports = {
    sum: (a, b) => a + b,
    sortable: (field, sort) => {
        const sortType = field === sort.column ? sort.type : 'default';


        const icons = {
            default: 'oi oi-elevator',
            asc: 'oi oi-sort-ascending',
            desc: 'oi oi-sort-descending',
        };

        const types = {
            default: 'desc',
            asc: 'desc',
            desc: 'asc'
        }

        sort.type

        const icon = icons[sortType];
        const type = types[sortType];
        let href = xss(`?_sort&column=${field}&type=${type}`);
        return `
            <a href="${href}">
                <span class="${icon}"></span>
            </a>
        `;
    },

}
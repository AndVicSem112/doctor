const createRequest = require('./createRequest')
const createUser = require('./createUser')
const createDoctor = require('./createDoctor')


module.exports = (app) => {
    createRequest(app);
    createUser(app);
    createDoctor(app);
}

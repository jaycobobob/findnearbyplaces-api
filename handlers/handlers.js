const auth = require("./auth");
const post = require("./post");
const put = require("./put");
const del = require("./del");
const get = require("./get");

module.exports = {
    auth: auth,
    post: post,
    put: put,
    delete: del,
    get: get,
};

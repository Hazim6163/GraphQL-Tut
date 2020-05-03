const APP_SECRET = 'Some-Random-Secret-12-!@&';
const jwt = require('jsonwebtoken');

// helper function to get the user id from the request
function getUserId(context) {
    const Authorization = context.request.get('Authorization');
    if (Authorization) {
        const token = Authorization.replace('Bearer ', '');
        const { userId } = jwt.verify(token, APP_SECRET);
        return userId;
    }

    throw new Error('Not authenticated');
}

module.exports = {
    APP_SECRET,
    getUserId,
}

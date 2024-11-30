const jwt = require('jsonwebtoken');
const responsehandler = require("../../config/responseTemplates");

let checkToken = async (req, res, next) => {
    try {
        res.setHeader('Content-Type', 'application/json');
        let token = req.headers['x-access-token'] || req.headers['authorization'];
        if (!token) {
            res.end(JSON.stringify(responsehandler(0, 403)));
            return false;
        }
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }
        //Access token authentication
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.end(JSON.stringify(responsehandler(0, 401)));
                return false;
            }
            else {
                req.decodedJWT = decoded;
                next();
            }
        });
    }
    catch (error) {
        res.end(JSON.stringify(responsehandler(0, 500, error.stack)));
        return false;
    }
};

const validate = (schema) => {
    return (req, res, next) => {
        res.setHeader('Content-Type', 'application/json');
        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            const errors = error.details.map((detail) => detail.message);
            res.end(JSON.stringify(responsehandler(1, 400, errors)));
            return;
        }

        next();
    };
};

const roleMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        res.setHeader('Content-Type', 'application/json');
        const userRole = req.decodedJWT?.role;
                if (!allowedRoles.includes(userRole)) {
            res.end(JSON.stringify(responsehandler(1, 403, 'Access denied')));
            return;
        }
        next();
    };
};

module.exports =
{
    checkToken: checkToken,
    validate: validate,
    roleMiddleware: roleMiddleware
}
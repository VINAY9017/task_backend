const jwt = require('jsonwebtoken');
require("dotenv").config()

const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }
 try {
        const decoded = jwt.verify(token, process.env.SECRETKEY); 
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = authenticateUser;
const jwt = require('jsonwebtoken');

exports.protect = (roles = []) => {
    return (req, res, next) => {
        const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];
        if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (!roles.includes(decoded.role)) return res.status(403).json({ message: 'Permission denied' });

            req.user = decoded;
            next();
        } catch (err) {
            res.status(401).json({ message: 'Token is not valid' });
        }
    };
};

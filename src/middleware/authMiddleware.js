import jwt from 'jsonwebtoken';

function authMiddleware(req, res, next) {
    const token = req.headers['authorization'] // Assuming Bearer token format
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.userId = decoded.id; // Attach user ID to request object
        next();
    });
}

export default authMiddleware;
// This middleware checks for a valid JWT token and attaches the user ID to the request object.
// It should be used in routes that require authentication.
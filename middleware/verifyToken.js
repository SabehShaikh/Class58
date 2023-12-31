import jwt from "jsonwebtoken"
import 'dotenv/config'


const verifyToken = (req, res, next) => {
    try {
        
        const { authorization } = req.headers;
        const token = authorization && authorization.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
            if (err) {
                return res.status(401).send({ message: "unauthorized", err })
            }
            return next()
        });
    } catch (err) {
        return res.status(401).send({ message: "unauthorized", err })
    }
}

export default verifyToken
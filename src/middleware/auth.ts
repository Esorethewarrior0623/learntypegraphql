const {AuthenticationError} = require('apollo-server')
const jwt = require('jsonwebtoken')

module.exports = (context:any) => {
    const authHeader = context.req.headers.authorization;
    if (authHeader) {
        //Bearer...
        const token = authHeader.split('Bearer')[1]; //Bearere
        if(token) {
            try {
                const user = jwt.verify(token, "UNSAFE_STRING");
                return user;
            } catch(err) {
                throw new AuthenticationError('Invalid/Expired token')
            }
        }
        throw new Error("Authentication token must be 'Bearer[token]")
    }
    throw new Error("Authentication token must be provided")
}
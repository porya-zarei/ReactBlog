import jwt from "../../node_modules/jsonwebtoken/index";

export const decodeToken = token => 
{
    return jwt.decode(token,{complete :true});
}
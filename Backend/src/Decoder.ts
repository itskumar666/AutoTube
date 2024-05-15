
import { Request, Response, NextFunction } from "express";
interface CustomRequest extends Request {
  userData?: {
      email: string;
      name: string;
  };
}
export function Token(req: CustomRequest, res: Response, next: NextFunction) {
    const token: string = req.headers.authorization?.split(" ")[1] || '';
    
    function decodeJwtToken(token: string) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const decoded = JSON.parse(atob(base64));
        return decoded;
    }
    
    if (token) {
        const decodedToken = decodeJwtToken(token);
      
        req.userData = {
            email: decodedToken.email,
            name: decodedToken.name
        };
      
       
        next();
    } else {
        console.log('JWT token not found in localStorage');
    }
}

    
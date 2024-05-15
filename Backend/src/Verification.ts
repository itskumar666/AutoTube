import jwt, { VerifyErrors, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const verification=(req:Request,res:Response,next:NextFunction)=>{
    const token:string|undefined=req.headers.authorization?.split(' ')[1]
    if(token){
        jwt.verify(token,process.env.SECRET_KEY as string,(err: VerifyErrors | null)=>{
            if(err){
                return res.status(401).json("Unauthorise User")
            }
            next()
        })
    }
}
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization;

  if(!authToken) {
    return res.status(401).end();
  }

  const [, token] = authToken.split(" ")

  try { 
    const { sub } = verify(token, "395f39b8fdd36db0b098bfcf702170f5") as IPayload

    req.user_id = sub;
    
    return next();
  } catch(err) {
    return res.status(401).end();
  }


}
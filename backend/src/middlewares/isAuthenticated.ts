import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
  sub: string;
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Receber token
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).end();
  }

  const [, token] = authToken.split(" "); // excluindo a palavra bearer do token

  try {
    // validar esse token
    const {sub} = verify(
        token, 
        process.env.JWT_SECRET
    ) as Payload;

    return next();

  } catch (error) {
    return res.status(401).end();
  }
}

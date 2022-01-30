import {Injectable, NestMiddleware} from '@nestjs/common';
import {Request, Response, NextFunction} from 'express';
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly jwtService: JwtService) {
    }

    async use(req: Request, res: Response, next: NextFunction) {
        const token = req.headers["authorization"];
        if (!token) {
            req["user"] = {role: "guest", id: undefined}
        }
        let validate = undefined
        try {
            validate = await this.jwtService.verify(token.split(" ")[1])
        }catch (e){

        }
        if (validate){
            req["user"] = {role: "user", id: validate.id}
        }else {
            req["user"] = {role: "guest", id: undefined}
        }
        console.log('Request roles...', req["user"]);
        next();
    }
}

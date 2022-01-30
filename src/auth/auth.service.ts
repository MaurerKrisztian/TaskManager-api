import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(private usersService: UserService, private jwtService: JwtService) {
    }

    async validateUser(username: string, password: string): Promise<any> {
        const foundUser = await this.usersService.findOneByName(username);
        if (foundUser && foundUser.password === password) {
            return foundUser;
        }
        return null;
    }

    async login(userPayload: Payload) {
        const user = await this.validateUser(userPayload.username, userPayload.password)
        if (!user) {
            throw new UnauthorizedException("Incorrect username / password")
        }
        return this.jwtService.sign({username: user.username, id: user._id});
    }
}

export interface Payload {
    username: string;
    password: string;
}
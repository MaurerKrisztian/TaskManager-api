import {Body, Controller, Post, Req, UseGuards} from '@nestjs/common';
import {AuthService} from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('login')
    async login(@Body() user, @Req() request): Promise<any> {
        // request["user"]
        return {username: user.username, token: await this.authService.login(user)};
    }
}

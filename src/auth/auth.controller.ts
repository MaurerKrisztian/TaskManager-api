import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {ApiTags} from "@nestjs/swagger";

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

  @Post('login')
    async login(@Body() user): Promise<any> {
        const auth = await this.authService.login(user);
        return { username: user.username, token: auth.token, userId: auth.id };
    }
}

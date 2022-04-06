import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  COOKIE_NAME,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  SERVER_ROOT_URI,
  UI_ROOT_URI,
} from './google.auth.config';
import * as querystring from 'querystring';
import axios from 'axios';
import { JwtService } from '@nestjs/jwt';

export const redirectURI = 'login/google';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('login')
  async login(@Body() user): Promise<any> {
    const auth = await this.authService.login(user);
    return { username: user.username, token: auth.token, userId: auth.id };
  }

  @Get('googleurl')
  async getGoogleUrl(@Body() user): Promise<any> {
    return { url: this.getGoogleAuthURL() };
  }
  @Get('me')
  async getCurrentUser(@Req() req, @Res() res): Promise<any> {
    console.log('get me');
    try {
      const decoded = this.jwtService.verify(req.cookies[COOKIE_NAME]);
      console.log('decoded', decoded);
      return res.send(decoded);
    } catch (err) {
      console.log(err);
      res.send(null);
    }
  }

  @Get(`/${redirectURI}`)
  async redirect(@Body() body, @Req() req, @Res() res): Promise<any> {
    const code = req.query.code as string;

    const { id_token, access_token } = await this.getTokens({
      code,
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      redirectUri: `${SERVER_ROOT_URI}/${redirectURI}`,
    });

    // Fetch the user's profile with the access token and bearer
    const googleUser = await axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
        {
          headers: {
            Authorization: `Bearer ${id_token}`,
          },
        },
      )
      .then((res) => res.data)
      .catch((error) => {
        console.error(`Failed to fetch user`);
        throw new Error(error.message);
      });

    const token = this.jwtService.sign(googleUser);

    res.cookie(COOKIE_NAME, token, {
      maxAge: 900000,
      httpOnly: true,
      secure: false,
    });

    res.redirect(UI_ROOT_URI);
  }

  getGoogleAuthURL() {
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const options = {
      redirect_uri: `${SERVER_ROOT_URI}/${redirectURI}`,
      client_id: GOOGLE_CLIENT_ID,
      access_type: 'offline',
      response_type: 'code',
      prompt: 'consent',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ].join(' '),
    };

    return `${rootUrl}?${querystring.stringify(options)}`;
  }

  getTokens({
    code,
    clientId,
    clientSecret,
    redirectUri,
  }: {
    code: string;
    clientId: string;
    clientSecret: string;
    redirectUri: string;
  }): Promise<{
    access_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    id_token: string;
  }> {
    /*
     * Uses the code to get tokens
     * that can be used to fetch the user's profile
     */
    const url = 'https://oauth2.googleapis.com/token';
    const values = {
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    };

    return axios
      .post(url, querystring.stringify(values), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then((res) => res.data)
      .catch((error) => {
        console.error(`Failed to fetch auth tokens`);
        throw new Error(error.message);
      });
  }
}

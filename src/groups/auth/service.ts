import { UsersService } from '../users/service';
import { ICreateUserDto } from '../users/dto/create.dto';

export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async login(
    jwt: any,
    cookie: any,
    body: { email: string; password: string },
    set: any,
  ): Promise<string> {
    const user = await this.usersService.getUserByEmail(body.email, set);
    const validAuth = await Bun.password.verify(body.password, user.password);

    if (!validAuth) {
      set.status = 401;
      throw new Error('Invalid credentials');
    }

    return cookie.set({
      value: await jwt.sign(body),
      httpOnly: true,
      maxAge: 7 * 86400,
      path: '/profile',
    });
  }

  async profile(jwt: any, cookie: any, set: any): Promise<string> {
    const profile = await jwt.verify(cookie);

    if (!profile) {
      set.status = 401;
      throw new Error('Unauthorized');
    }

    return profile;
  }

  async register(body: ICreateUserDto): Promise<void> {
    await this.usersService.createUser(body);
  }

  async resetPassword(email: string, set: any) {
    const user = await this.usersService.getUserByEmail(email, set);
    if (user) return { message: 'Password reset link sent' };
  }

  async logout(cookie: any): Promise<any> {
    cookie.remove();
    return { message: 'Logged out' };
  }
}

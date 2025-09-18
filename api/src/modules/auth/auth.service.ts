import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  private async issueTokens(payload: any) {
    const accessToken = this.jwtService.sign({...payload, tokenType: "access" }, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign({...payload, tokenType: "refresh" }, { expiresIn: '7d' });

    return { accessToken, refreshToken };
  }

  public async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);

    if (user && user.passwordHash === pass) {
      const { passwordHash, ...result } = user;
      return result;
    }

    return null;
  }

  public async login(user: User) {
    const payload = { email: user.email, id: user.id };

    return this.issueTokens(payload);
  }

  // async register(user: RegisterRequestDto): Promise<AccessToken> {
  //   const existingUser = await this.usersService.findOneByEmail(user.email);
  //   if (existingUser) {
  //     throw new BadRequestException('email already exists');
  //   }
  //   const hashedPassword = await bcrypt.hash(user.password, 10);
  //   const newUser: User = { ...user, password: hashedPassword };
  //   await this.usersService.create(newUser);
  //   return this.login(newUser);
  // }
}

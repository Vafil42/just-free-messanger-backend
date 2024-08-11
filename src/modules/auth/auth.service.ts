import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SignInDto, SignUpDto } from './auth.dto';
import { hashSync, compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService) private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(dto: SignUpDto) {
    const existingUser = await this.userService.findOneByUsernameUnsafe(
      dto.username,
    );
    if (existingUser) throw new BadRequestException('User already exists');

    const password = hashSync(dto.password, 10);

    const user = await this.userService.create({
      username: dto.username,
      name: dto.name,
      password,
    });

    return this.genToken(user.id, user.name);
  }

  async signIn(dto: SignInDto) {
    const user = await this.userService.findOneByUsernameUnsafe(dto.username);
    if (!user) throw new UnauthorizedException('Invalid username or password');

    if (!compareSync(dto.password, user.password))
      throw new UnauthorizedException('Invalid username or password');

    return this.genToken(user.id, user.name);
  }

  private async genToken(id: string, name: string) {
    const token = await this.jwtService.signAsync({ id, name });
    return { access_token: `Bearer ${token}` };
  }
}

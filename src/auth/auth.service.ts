import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private authRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  signIn = async (signInDto: SignInDto): Promise<{ accessToken: string }> => {
    const { username, password } = signInDto;
    const user = await this.authRepo.findOne({
      where: { username },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JWTPayload = { username };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Username or password is incorrect!');
    }
  };

  signUp = async (signUpDto: SignUpDto): Promise<void> => {
    const { username, password } = signUpDto;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const user = this.authRepo.create({
      username,
      password: passwordHash,
    });
    try {
      await this.authRepo.save(user);
    } catch (error) {
      const { errno } = error;
      if (errno === 1062) {
        throw new ConflictException('User already exists');
      } else {
        throw new InternalServerErrorException('Something went wrong!!');
      }
    }
  };
}

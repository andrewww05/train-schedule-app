import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { RegisterDto } from '../auth/dto';

@Injectable()
export class UsersService {
  constructor(
    protected readonly usersRepository: UsersRepository,
  ) {}

  public async create(createUserDto: Omit<RegisterDto, "password">, passwordHash: string): Promise<User> {
    return this.usersRepository.createUser({
      ...createUserDto,
      passwordHash,
      role: 'USER'
    });
  }

  findAll() {
    return `This action returns all users`;
  }

  public async findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findByEmail(email);
  }

  public async findOne(id: string): Promise<User | null> {
    return this.usersRepository.findById(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

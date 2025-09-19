import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from 'generated/prisma';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findById(id: string): Promise<User|null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user;
  }

  async findByEmail(email: string): Promise<User|null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user;
  }

  async updateUser(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    try {
      return await this.prisma.user.update({
        where: { id },
        data,
      });
    } catch {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await this.prisma.user.delete({ where: { id } });
    } catch {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }
}

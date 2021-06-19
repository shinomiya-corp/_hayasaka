import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserInputError } from 'apollo-server-errors';
import { PrismaService } from '../database/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { FindUsersInput } from './dto/find-users.input';
import { DecrRibbonInput, IncrRibbonInput } from './dto/update-ribbon-input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  create(createUserInput: CreateUserInput) {
    return this.prisma.user
      .create({
        data: createUserInput,
      })
      .catch((err) => {
        throw err;
      });
  }

  findMany(findUsersInput?: FindUsersInput) {
    if (!findUsersInput) return this.prisma.user.findMany();

    const { take, sort } = findUsersInput;
    let findOptions: Prisma.UserFindManyArgs = { take };
    if (sort) findOptions = { ...findOptions, orderBy: { [sort.by]: sort.in } };
    return this.prisma.user.findMany(findOptions);
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    const { ribbons } = updateUserInput;
    if (ribbons && ribbons < 0)
      throw new UserInputError('Ribbon count cannot be negative.');
    return this.prisma.user
      .update({
        where: { id },
        data: updateUserInput,
      })
      .catch((err) => {
        throw err;
      });
  }

  delete(id: string) {
    return this.prisma.user.delete({ where: { id } }).catch((err) => {
      throw err;
    });
  }

  async incrRibbon(incrRibbonInput: IncrRibbonInput) {
    const { id, tag, increment } = incrRibbonInput;
    return this.prisma.user.upsert({
      where: { id },
      update: { ribbons: { increment } },
      create: { id, tag, ribbons: increment },
    });
  }

  async decrRibbon(decrRibbonInput: DecrRibbonInput) {
    const { id, tag, decrement } = decrRibbonInput;
    const current = await this.prisma.user.findUnique({
      where: { id },
      select: { ribbons: true },
    });
    return this.prisma.user.upsert({
      where: { id },
      update: {
        ribbons: { decrement: Math.min(current?.ribbons || 0, decrement) },
      },
      create: { id, tag, ribbons: 0 },
    });
  }
}

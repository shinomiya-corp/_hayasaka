import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { DecrRibbonInput, IncrRibbonInput } from './dto/update-ribbon-input';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  create(createUserInput: CreateUserInput) {
    return this.prisma.user
      .create({
        data: createUserInput,
      })
      .catch(() => null);
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    return this.prisma.user
      .update({
        where: { id },
        data: updateUserInput,
      })
      .catch(() => null);
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  delete(id: string) {
    return this.prisma.user.delete({ where: { id } }).catch(() => null);
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
    if (!current?.ribbons) return null;
    if (current.ribbons < decrement) return null;
    return this.prisma.user.upsert({
      where: { id },
      update: { ribbons: { decrement } },
      create: { id, tag, ribbons: 0 },
    });
  }
}

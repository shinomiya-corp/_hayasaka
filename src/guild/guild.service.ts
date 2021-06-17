import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateGuildInput } from './dto/create-guild.input';
import { UpdateGuildInput } from './dto/update-guild.input';

@Injectable()
export class GuildService {
  constructor(private readonly prisma: PrismaService) {}

  create(createGuildInput: CreateGuildInput) {
    const { id, customPrefix, disabledCommands } = createGuildInput;
    return this.prisma.guild.create({
      data: {
        id,
        customPrefix,
        disabledCommands: {
          connect: disabledCommands?.map((name) => ({ name })),
        },
      },
    });
  }

  findAll() {
    return this.prisma.guild.findMany();
  }

  findOne(id: string) {
    this.prisma.guild.findUnique({ where: { id } });
  }

  async update(id: string, updateGuildInput: UpdateGuildInput) {
    const { customPrefix, disabledCommands } = updateGuildInput;
    return this.prisma.guild.update({
      where: { id },
      data: {
        id,
        customPrefix,
        disabledCommands: {
          connect: disabledCommands?.map((name) => ({ name })),
        },
      },
    });
  }

  async remove(id: string) {
    return this.prisma.guild.delete({ where: { id } });
  }
}

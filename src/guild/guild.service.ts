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
      include: { disabledCommands: true },
    });
  }

  findAll() {
    return this.prisma.guild.findMany({ include: { disabledCommands: true } });
  }

  findOne(id: string) {
    return this.prisma.guild.findUnique({
      where: { id },
      include: { disabledCommands: true },
    });
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
      include: { disabledCommands: true },
    });
  }

  async delete(id: string) {
    return this.prisma.guild.delete({
      where: { id },
      include: { disabledCommands: true },
    });
  }

  disableCommands(id: string, names: string[]) {
    return this.prisma.guild.update({
      where: { id },
      data: { disabledCommands: { connect: names.map((name) => ({ name })) } },
      include: { disabledCommands: true },
    });
  }

  enableCommands(id: string, names: string[]) {
    return this.prisma.guild.update({
      where: { id },
      data: {
        disabledCommands: { disconnect: names.map((name) => ({ name })) },
      },
      include: { disabledCommands: true },
    });
  }
}

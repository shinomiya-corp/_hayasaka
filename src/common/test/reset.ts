import { PrismaClient } from '@prisma/client';
import { ping, pong } from './commands';
import { guildA, guildB } from './guilds';

export const resetDatabase = async (prisma: PrismaClient) => {
  await prisma.$transaction([
    // commands
    prisma.command.deleteMany(),
    prisma.command.createMany({
      data: [ping, pong],
    }),
    // guilds
    prisma.guild.deleteMany(),
    prisma.guild.create({
      data: {
        ...guildA,
        disabledCommands: {
          connect: { name: 'ping' },
        },
      },
    }),
    prisma.guild.create({
      data: {
        ...guildB,
        disabledCommands: {
          connect: { name: 'pong' },
        },
      },
    }),
  ]);
};

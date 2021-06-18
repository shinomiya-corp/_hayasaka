import { PrismaClient } from '@prisma/client';
import { ping, pong } from './commands';
import { guildA, guildB } from './guilds';
import { doraemon, saber } from './users';

export const resetDatabase = async (prisma: PrismaClient) => {
  await prisma.$transaction([
    prisma.$executeRaw(`
    TRUNCATE TABLE 
    "Command", 
    "Guild",
    "User"
    RESTART IDENTITY
    CASCADE`),
    // commands
    prisma.command.createMany({
      data: [ping, pong],
    }),
    // guilds
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
    // users
    prisma.user.createMany({ data: [doraemon, saber] }),
  ]);
};

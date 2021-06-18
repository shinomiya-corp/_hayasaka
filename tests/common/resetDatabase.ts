import { PrismaClient } from '@prisma/client';
import { ping, pong } from './commands';
import { guildA, guildB } from './guilds';

export const resetDatabase = async (prisma: PrismaClient) => {
  await prisma.$transaction([
    prisma.$executeRaw(`
    TRUNCATE TABLE 
    "Command", 
    "Guild" 
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
  ]);
};

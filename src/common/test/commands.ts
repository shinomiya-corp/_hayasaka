import { Command } from '@prisma/client';

export const ping: Command = {
  id: 1,
  name: 'ping',
  category: 'UTILITY',
  description: 'Ping the bot.',
  aliases: [],
};

export const pong: Command = {
  id: 2,
  name: 'pong',
  category: 'UTILITY',
  description: 'Pong the bot.',
  aliases: [],
};

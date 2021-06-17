// import { PrismaClient } from '@prisma/client';
// import { ping, pong } from '../src/common/test/commands';
// import { guildA, guildB } from '../src/common/test/guilds';
// const prisma = new PrismaClient();

// async function main() {
//   await prisma.$transaction([
//     prisma.command.createMany({
//       data: [ping, pong],
//     }),
//     prisma.guild.create({
//       data: {
//         ...guildA,
//         disabledCommands: {
//           connect: { name: 'ping' },
//         },
//       },
//     }),
//     prisma.guild.create({
//       data: {
//         ...guildB,
//         disabledCommands: {
//           connect: { name: 'pong' },
//         },
//       },
//     }),
//   ]);
// }

// main()
//   .catch((err) => {
//     console.error(err);
//     process.exit(1);
//   })
//   .finally(() => prisma.$disconnect());

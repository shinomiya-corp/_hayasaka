import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.command.createMany({
    data: [
      { name: 'ping', category: 'UTILITY', description: 'Ping the bot.' },
      { name: 'pong', category: 'FUN', description: 'Play pong with the bot.' },
    ],
  });
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

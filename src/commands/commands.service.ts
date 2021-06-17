import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateCommandInput } from './dto/create-command.input';

@Injectable()
export class CommandsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.command.findMany();
  }

  findOne(name: string) {
    return this.prisma.command.findUnique({ where: { name } });
  }

  async create(createCommandInput: CreateCommandInput[]) {
    const res = this.prisma.$transaction(
      this.toPrismaEnumerable(createCommandInput),
    );
    return res;
  }

  async drop() {
    const res = await this.prisma.command.deleteMany();
    return res.count;
  }

  async dropAndSeed(createCommandInput: CreateCommandInput[]) {
    const res = await this.prisma.$transaction([
      this.prisma.command.deleteMany(),
      ...this.toPrismaEnumerable(createCommandInput),
    ]);
    const [c] = res;
    return c.count;
  }

  private toPrismaEnumerable(createCommandInput: CreateCommandInput[]) {
    return createCommandInput.map(
      ({ name, description, category, aliases, args }) =>
        this.prisma.command.create({
          data: {
            name,
            description,
            category,
            aliases,
            args: {
              createMany: {
                data: args || [],
              },
            },
          },
          include: { args: true },
        }),
    );
  }
}

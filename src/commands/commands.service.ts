import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateCommandInput } from './dto/create-command.input';
import { Argument } from './entities/argument.entity';
import { Command } from './entities/command.entity';

@Injectable()
export class CommandsService {
  constructor(
    @InjectRepository(Command) private commandRepo: Repository<Command>,
    @InjectRepository(Argument) private argRepo: Repository<Argument>,
    @InjectConnection() private connection: Connection,
  ) {}

  create(createCommandInput: CreateCommandInput[]) {
    const allArgs: Argument[] = [];
    const allCommands: Command[] = [];
    createCommandInput.forEach((input) => {
      const { name, description, category, aliases, args: _args } = input;
      const args = _args?.map(({ name, optional, multi }) =>
        this.argRepo.create({ name, optional, multi }),
      );
      console.log(args);
      const command = this.commandRepo.create({
        name,
        description,
        category,
        aliases,
      });
      command.args = args;
      console.log(command);
      if (args) allArgs.push(...args);
      allCommands.push(command);
    });
    return this.connection
      .transaction(async (transactionEntityManager) => {
        await transactionEntityManager.save(allArgs);
        await transactionEntityManager.save(allCommands);
      })
      .then(() => createCommandInput.length);
  }

  findAll() {
    return this.commandRepo.find();
  }

  findOne(name: string) {
    return this.commandRepo.findOneOrFail({ where: { name } });
  }
}

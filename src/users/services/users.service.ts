import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorManager } from 'src/utils/error.manager';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserDTO, UserUpdateDTO } from '../dto/user.dto';
import { UsersEntity } from '../entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
  ) {}

  public async findUsers(): Promise<UsersEntity[]> {
    try {
      const users: UsersEntity[] = await this.userRepository.find();
      if (!users.length)
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No users found',
        });
      return users;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findUserById(id: string): Promise<UsersEntity> {
    try {
      const user: UsersEntity = await this.userRepository
        .createQueryBuilder('user')
        .where({ id })
        .getOne();

      if (!user)
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'User not found',
        });
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async createUser(body: UserDTO): Promise<UsersEntity> {
    try {
      return await this.userRepository.save(body);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async updateUser(
    body: UserUpdateDTO,
    id: string,
  ): Promise<UpdateResult | undefined> {
    try {
      const user: UpdateResult = await this.userRepository.update(id, body);
      if (user.affected === 0)
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'It cannot be updated',
        });
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async deleteUser(id: string): Promise<DeleteResult> {
    try {
      const user: DeleteResult = await this.userRepository.delete(id);
      if (!user.affected)
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'It cannot be delated',
        });
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}

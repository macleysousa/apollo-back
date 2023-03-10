import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, IsNull, Not, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserAccessEntity } from './entities/user-access.entity';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(UserAccessEntity)
    private userAccessView: Repository<UserAccessEntity>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.userRepository.save({ ...createUserDto });
    return this.findById(user.id);
  }

  async find(name?: string): Promise<UserEntity[]> {
    const queryBuilder = this.userRepository.createQueryBuilder('c');
    queryBuilder.where({ id: Not(IsNull()) });
    if (name) {
      queryBuilder.andWhere({ name: ILike(`%${name}%`) });
    }
    return queryBuilder.getMany();
  }

  async findById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findByUserName(username: string): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { username } });
  }

  async findAccesses(id: number, filter?: { branchId?: number; componentId?: string }): Promise<UserAccessEntity[]> {
    return this.userAccessView.find({ where: { id, ...filter } });
  }

  async update(id: number, { password, name, role, status }: UpdateUserDto): Promise<UserEntity> {
    const user = await this.findById(id);

    if (password) {
      user.password = password;
    }
    if (name) {
      user.name = name;
    }
    if (role) {
      user.role = role;
    }
    if (status) {
      user.status = status;
    }

    await this.userRepository.save(user);

    return this.findById(id);
  }

  async validateUser(username: string, password: string): Promise<UserEntity> {
    const user = await this.findByUserName(username);

    if (!user || user.password != password) {
      throw new UnauthorizedException('username or password invalid');
    }
    return user;
  }
}

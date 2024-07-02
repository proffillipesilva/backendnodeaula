// src/services/User.service.ts
import { CreateUserDto } from '../models/dto/user.dto';
import { User } from '../models/entities/user';
import { UserRepository}  from '../models/repositories/user.repository';
import { Repository, getCustomRepository } from 'typeorm';
import crypto from 'crypto'
import Jimp from 'jimp';
import { v4 } from 'uuid';
import { GenericRepository } from '../models/repositories/generic.repository';

export class UserService {
  private userRepository: GenericRepository<User>;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(file: Express.Multer.File, userDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.email = userDto.email;
    user.name = userDto.name;
    user.password = crypto.createHash('sha256').update(userDto.password).digest('hex');
    user.picture = await this.saveImage(file);
    return await this.userRepository.save(user);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async getUserById(id: string): Promise<User | null> {
    return await this.userRepository.findOneBy({id});
  }

  async updateUser(id: string, newName: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({id});
    if (!user) {
      return null;
    }
    user.name = newName;
    return await this.userRepository.save(user);
  }

  async deleteUser(id: string): Promise<boolean> {
    return await this.userRepository.removeBy(id);
    
  }

  private async saveImage(image: Express.Multer.File): Promise<string> {
    const savedImage = await Jimp.read(image.path);
    savedImage.resize(600, 600);
    const savedImageFileName = `pic_${v4()}_${Date.now()}.png`
    savedImage.write(`uploads/${savedImageFileName}`);
    return Promise.resolve(savedImageFileName);

  }
}

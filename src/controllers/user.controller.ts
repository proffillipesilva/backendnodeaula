// src/controllers/example.controller.ts
import { Controller, Get, Post, Put, Delete, Route, Tags, Body, Path, FormField, UploadedFile, Security } from 'tsoa';
import { UserService } from '../services/user.service';
import { User } from '../models/entities/user';
import { CreateUserDto } from '../models/dto/user.dto';

@Route('users')
@Tags('Users')
export class UserController extends Controller {
  private userService = new UserService();

  @Get('/')
  public async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get('/:id')
  @Security('jwt')
  public async getUser(@Path() id: string): Promise<User | null> {
    return this.userService.getUserById(id);
  }

  @Post('/')
  public async createUser(
      @FormField() name: string,
      @FormField() email: string,
      @FormField() password: string,
      @UploadedFile() file: Express.Multer.File): Promise<User> {
      const dto = {} as CreateUserDto;
      dto.email = email;
      dto.password = password;
      dto.name = name;
    return this.userService.createUser(file, dto);
  } 

  @Put('/:id')
  public async updateUser(@Path() id: string, @Body() requestBody: { name: string }): Promise<User | null> {
    return this.userService.updateUser(id, requestBody.name);
  }

  @Delete('/:id')
  public async deleteUser(@Path() id: string): Promise<boolean> {
    return this.userService.deleteUser(id);
  }
}

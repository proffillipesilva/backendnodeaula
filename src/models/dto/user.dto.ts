import { User } from "../entities/user"

export type CreateUserDto = Pick<User, 'name' | 'email' | 'password'>
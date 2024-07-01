
import { Repository } from "typeorm";
import { User } from "../models/entities/user";
import UserRepository from "../models/repositories/user.repository";
import { LoginDto } from "../models/dto/login.dto";
import * as jwt from 'jsonwebtoken';
import logger from "../middlewares/logger";
import crypto from 'crypto'

export class AuthService {
    private readonly userRepository: Repository<User>

    constructor(){
        this.userRepository = UserRepository;
    }

    async login(dto: LoginDto): Promise<string> {
        const email = dto.email;
        const password = crypto.createHash('sha256').update(dto.password).digest('hex')
        const user = await this.userRepository.findOneBy({email, password});
        logger.info(user)
        if(!user){
            return Promise.reject();
        } else {
            const signedToken = jwt.sign({
                id: user.id,
                email: user.email,
                name: user.name
            }, 'secret', { expiresIn: '15m'})
            return Promise.resolve(signedToken);
        }
    }
}
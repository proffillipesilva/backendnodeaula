import { Body, Controller, Post, Route, Tags } from "tsoa";
import { AuthService } from "../services/auth.service";
import { LoginDto } from "../models/dto/login.dto";

@Route('auth')
@Tags('Auth')
export class AuthController extends Controller {
    private authService = new AuthService();

    @Post('/login')
    public async login(@Body() loginDto: LoginDto): Promise<string>{
        console.log('here')
        return this.authService.login(loginDto);
    }

}
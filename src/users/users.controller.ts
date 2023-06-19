import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Session, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize, SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './users.entity';
import { AuthGuard } from '../guards/auth.guard';

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
    constructor(private usersService: UsersService, private authService: AuthService) { }

    // @Get('/getme')
    // getMe(@Session() session: any) {
    //     session.useId = ""
    //     if (session) {
    //         return this.usersService.findOne(session.id)
    //     } else {
    //         return "this not regster"
    //     }
    // }

    @Get('/getme')
    @UseGuards(AuthGuard)
    getMe(@CurrentUser() user: User) {
        return user
    }


    @Post('/signup')
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signup(body.email, body.password)
        session.userId = user.id
        return user
    }
    
    @Post('/signin')
    async signin(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signin(body.email, body.password)
        session.userId = user.id
        return user
    }

    @Post('/signout')
    async signout(@Session() session: any) {
        session.userId = null
    }

    @Get('/:id')
    findUser(@Param('id') id: number) {
        return this.usersService.findOne(id)
    }

    @Get()
    findAllUsers(@Query('email') email: string) {
        return this.usersService.find(email)
    }


    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.usersService.update(parseInt(id), body)
    }

    @Delete('/:id')
    removeUser(@Param('id') id: number) {
        return this.usersService.remove(id)
    }
}

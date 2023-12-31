import {
  Body,
  Controller,
  Get,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Get('me')
  getMe(@GetUser() user: Omit<User, 'hash'>) {
    return user;
  }

  @Patch()
  editUser(
    @GetUser('id') id: number,
    @Body() dto: EditUserDto,
  ) {
    return this.userService.editUser(id, dto);
  }
}

import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { UpdateProfileDto } from './dto/updateProfile.dto';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUserProfile(@Param('id') id: string): Promise<User> {
    return this.userService.getUserProfile(id);
  }

  @Put(':id')
  async updateProfile(
    @Param('id') id: string,
    @Body() data: UpdateProfileDto,
  ): Promise<User | null> {
    return this.userService.updateProfile(id, data);
  }
}

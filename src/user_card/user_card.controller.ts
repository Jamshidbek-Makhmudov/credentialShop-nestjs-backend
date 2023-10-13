import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { UserCardService } from './user_card.service';
import { CreateUserCardDto } from './dto/create-user_card.dto';
import { UpdateUserCardDto } from './dto/update-user_card.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserCard } from './models/user_card.model';
import { ClientGuard } from '../guards/client.guard';
import { selfClientGuard } from '../guards/selfClient.guard';

@ApiTags("User card")
@Controller('user-card')
export class UserCardController {
  constructor(private readonly userCardService: UserCardService) {}

  
  @ApiOperation({ summary: 'Create Card' })
  @ApiResponse({ status: 201, type: UserCard })
  @HttpCode(HttpStatus.OK)
  @UseGuards(ClientGuard)
  @Post()
  create(@Body() createUserCardDto: CreateUserCardDto) {
    return this.userCardService.create(createUserCardDto);
  }

  @ApiOperation({ summary: 'find all cards' })
  @ApiResponse({ status: 200, type: UserCard })
  @HttpCode(HttpStatus.OK)
  @UseGuards(selfClientGuard)
  @Get(":id")
  findAll() {
    return this.userCardService.findAll();
  }

  @ApiOperation({ summary: 'find by name' })
  @ApiResponse({ status: 200, type: UserCard })
  @HttpCode(HttpStatus.OK)
  @UseGuards(selfClientGuard)
  @Get('/find/:id')
  findOne(@Body('name') name: string) {
    return this.userCardService.findOne(name);
  }

  @ApiOperation({ summary: 'update by id' })
  @ApiResponse({ status: 201, type: UserCard })
  @HttpCode(HttpStatus.OK)
  @UseGuards(selfClientGuard)
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateUserCardDto: UpdateUserCardDto) {
    return this.userCardService.update(+id, updateUserCardDto);
  }

  @ApiOperation({ summary: 'delete by id' })
  @ApiResponse({ status: 200, type: Number })
  @HttpCode(HttpStatus.OK)
  @UseGuards(selfClientGuard)
  @Delete('delete/:id')
  remove(@Param('id') id: string, @Body() body:any) {
    return this.userCardService.remove(+id, body.delete_id);
  }
}

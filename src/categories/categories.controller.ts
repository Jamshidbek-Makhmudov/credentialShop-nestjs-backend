import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Category } from './models/category.model';
import { CreateAdminDto } from './../admin/dto/create-admin.dto';
import { UpdDelAdminGuard } from '../guards/updDelAdmin.guard';
import { ClientGuard } from '../guards/client.guard';

@ApiTags('Category')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'Create Category' })
  @ApiResponse({ status: 201, type: Category })
  @HttpCode(HttpStatus.OK)
  @UseGuards(CreateAdminDto)
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @ApiOperation({ summary: 'Find All Category' })
  @ApiResponse({ status: 200, type: Category })
  @HttpCode(HttpStatus.OK)
  @UseGuards(ClientGuard)
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @ApiOperation({ summary: 'Find by name' })
  @ApiResponse({ status: 200, type: Category })
  @HttpCode(HttpStatus.OK)
  @UseGuards(ClientGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update by id' })
  @ApiResponse({ status: 201, type: Category })
  @HttpCode(HttpStatus.OK)
  @UseGuards(UpdDelAdminGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @ApiOperation({ summary: 'Delete by id' })
  @ApiResponse({ status: 200, type: Number })
  @HttpCode(HttpStatus.OK)
  @UseGuards(UpdDelAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}

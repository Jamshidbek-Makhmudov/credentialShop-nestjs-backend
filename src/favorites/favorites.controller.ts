import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Favorite } from './models/favorite.model';
import { selfClientGuard } from '../guards/selfClient.guard';

@ApiTags("Favorites")
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  
  @ApiOperation({ summary: 'Favorites yaratish' })
  @ApiResponse({ status: 201, description: 'create favorite', type: [Favorite] })
  @HttpCode(HttpStatus.OK)
  @UseGuards(selfClientGuard)
  @Post(":id")
  create(@Body() createFavoriteDto: CreateFavoriteDto) {
    return this.favoritesService.create(createFavoriteDto);
  }

  
  @ApiOperation({ summary: "Favoritesni ko'rish" })
  @ApiResponse({ status: 201, description: 'find favorites', type: [Favorite] })
  @HttpCode(HttpStatus.OK)
  @UseGuards(selfClientGuard)
  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.favoritesService.findAll(+id);
  }

  @ApiOperation({ summary: "Favoriteni o'chirish" })
  @ApiResponse({ status: 201, description: 'delete favorite', type:Number })
  @HttpCode(HttpStatus.OK)
  @UseGuards(selfClientGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Body() body:any) {
    return this.favoritesService.remove(+id, body.product_id);
  }
}

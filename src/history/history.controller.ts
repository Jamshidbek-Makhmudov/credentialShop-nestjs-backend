import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { HistoryService } from './history.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SellerAdminGuard } from '../guards/sellerAdmin.guard';
import { History } from './models/history.model';

@ApiTags('History')
@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @ApiOperation({ summary: 'Seller create history' })
  @ApiResponse({ status: 201, type: History })
  @HttpCode(HttpStatus.OK)
  @UseGuards(SellerAdminGuard)
  @Post()
  create(@Body() createHistoryDto: CreateHistoryDto) {
    return this.historyService.create(createHistoryDto);
  }

  @ApiOperation({ summary: 'Seller find all History' })
  @ApiResponse({ status: 200, type: History })
  @HttpCode(HttpStatus.OK)
  @UseGuards(SellerAdminGuard)
  @Get()
  findAll() {
    return this.historyService.findAllSeller();
  }

  @ApiOperation({ summary: 'Seller find by id' })
  @ApiResponse({ status: 200, type: History })
  @HttpCode(HttpStatus.OK)
  @UseGuards(SellerAdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historyService.findOneSeller(+id);
  }
}

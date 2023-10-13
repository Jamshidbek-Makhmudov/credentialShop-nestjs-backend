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
import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { selfClientGuard } from '../guards/selfClient.guard';
import { Contract } from './models/contract.model';
import { SellerAdminGuard } from '../guards/sellerAdmin.guard';

@ApiTags("Contract")
@Controller('contract')
export class ContractController {
  constructor(
    private readonly contractService: ContractService,
  ) {}

  
  
  @ApiOperation({ summary: 'Create Contract' })
  @ApiResponse({ status: 201, type: Contract })
  @HttpCode(HttpStatus.OK)
  @UseGuards(selfClientGuard)
  @Post(":id")
  create(@Body() createContractDto: CreateContractDto) {
    return this.contractService.create(createContractDto);
  }

  
  @ApiOperation({ summary: 'find all Client' })
  @ApiResponse({ status: 200, type: Contract })
  @HttpCode(HttpStatus.OK)
  @UseGuards(selfClientGuard)
  @Get("clients/:id")
  findAll(@Param("id") id:string) {
    console.log("---", id);
    
    return this.contractService.findAllClient(+id);
  }

  
  @ApiOperation({ summary: 'find by id' })
  @ApiResponse({ status: 200, type: Contract })
  @HttpCode(HttpStatus.OK)
  @UseGuards(selfClientGuard)
  @Get('client/:id')
  findOne(@Param('id') id: string, @Body() body:any) {
    
    return this.contractService.findOne(+id, body.contract_id);
  }

  
  @ApiOperation({ summary: 'Seller find all Client' })
  @ApiResponse({ status: 200, type: Contract })
  @HttpCode(HttpStatus.OK)
  @UseGuards(SellerAdminGuard)
  @Get("seller")
  findAllSeller() {
    return this.contractService.findAllSeller();
  }

  
  @ApiOperation({ summary: 'Seller find by id' })
  @ApiResponse({ status: 200, type: Contract })
  @HttpCode(HttpStatus.OK)
  @UseGuards(SellerAdminGuard)
  @Get('seller/:id')
  findOneSeller(@Param('id') id: string) {
    return this.contractService.findOneSeller(+id);
  }

}

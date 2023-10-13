import { Injectable } from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Contract } from './models/contract.model';
import { log } from 'console';

@Injectable()
export class ContractService {
  constructor(@InjectModel(Contract) private contractRepo: typeof Contract
  ){}

  async create(createContractDto: CreateContractDto) {
    const contract = await this.contractRepo.create(createContractDto);
    return contract

  }

  async findAllClient(id:number) {
    console.log("id:", id);
    const clients = await this.contractRepo.findAll({where:{client_id:id},include:{all:true}});
    console.log(clients);
    
    return clients
  }

  findAllSeller() {
    return this.contractRepo.findAll({include:{all:true}});
  }


  findOneSeller(id: number) {
    return this.contractRepo.findByPk(id);
  }


  findOne(id: number, contract_id:number) {
    return this.contractRepo.findOne({where:{id:contract_id}});
  }


}

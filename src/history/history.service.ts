import { Injectable } from '@nestjs/common';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { InjectModel } from '@nestjs/sequelize';
import { History } from './models/history.model';

@Injectable()
export class HistoryService {
  constructor(@InjectModel(History) private historyRepo: typeof History) {}

  create(createHistoryDto: CreateHistoryDto) {
    return this.historyRepo.create(createHistoryDto);
  }

  findAllSeller() {
    return this.historyRepo.findAll({ include: { all: true } });
  }

  findOneSeller(id: number) {
    return this.historyRepo.findByPk(id);
  }
}

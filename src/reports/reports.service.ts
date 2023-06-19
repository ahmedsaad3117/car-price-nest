import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './reports.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from 'src/users/users.entity';
import { GetEstimateDto } from './dtos/get-estimaate.dto';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private repo: Repository<Report>) {

    }

    createEstimate(query: GetEstimateDto) {
        return this.repo.createQueryBuilder()
        .select('AVG(price)','price')
        .where('make = :make',{make: query.make})
        .andWhere('model = :model', {model: query.model})
        .andWhere('lng - :lng BETWEEN -5 AND 5 ',  {lng: query.lng})
        .andWhere('lat - :lat BETWEEN -5 AND 5 ',  {lat: query.lat})
        .andWhere('lat - :lat BETWEEN -5 AND 5 ',  {lat: query.lat})
        .andWhere('approved IS TRUE')
        .orderBy('ABS(mileage - :mileage)', 'DESC')
        .limit(3)
        .getRawOne()
    }

    create(reportDto: CreateReportDto, user: User) {
        const report = this.repo.create(reportDto)
        report.user = user

        return this.repo.save(report)
    }

    findOne(id: string) {
        return this.repo.findOne({ where: { id: parseInt(id) } })
    }

    async changeApproval(id: string, isApprove: boolean) {
        const report = await this.findOne(id)

        if (!report) {
            throw new NotFoundException('report not found')
        }

        report.approved = isApprove

        return this.repo.save(report)
    }
} 
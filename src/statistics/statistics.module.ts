import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { SequelizeModule } from '@nestjs/sequelize/dist';
import { ReviewModel } from '../review/review.model';
import { MovieModel } from '../movie/movie.model';
import { ViewsModel } from '../views/views.model';

@Module({
	imports: [SequelizeModule.forFeature([ReviewModel, MovieModel, ViewsModel])],
	controllers: [StatisticsController],
	providers: [StatisticsService]
})
export class StatisticsModule {}

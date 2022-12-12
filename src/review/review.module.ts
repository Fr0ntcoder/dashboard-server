import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { ReviewModel } from 'src/review/review.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
	imports: [SequelizeModule.forFeature([ReviewModel])],
	controllers: [ReviewController],
	providers: [ReviewService]
})
export class ReviewModule {}

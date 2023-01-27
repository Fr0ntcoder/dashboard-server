import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ReviewModel } from './review.model';
import { ReviewDto } from './dto/review.dto';
import { MovieModel } from '../movie/movie.model';

@Injectable()
export class ReviewService {
	constructor(
		@InjectModel(ReviewModel)
		private readonly reviewModel: typeof ReviewModel
	) {}

	async create(userId: number, dto: ReviewDto) {
		return this.reviewModel.create({
			userId,
			...dto
		});
	}
	async byId(id: number) {
		const review = await this.reviewModel.findByPk(id);

		if (!review) throw new NotFoundException('Review not found');

		return review;
	}
	async getAll() {
		return this.reviewModel.findAll({
			order: [['createdAt', 'DESC']],
			include: [
				{
					all: true
				}
			]
		});
	}

	async delete(id: number) {
		return this.reviewModel.destroy({ where: { id } });
	}
}

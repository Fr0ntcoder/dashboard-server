import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { WhereOptions } from 'sequelize';
import { MovieDto } from 'src/movie/dto/movie.dto';
import { MovieModel } from './movie.model';
import { ViewsService } from '../views/views.service';
import { UserModel } from '../auth/auth.model';
import { ReviewModel } from '../review/review.model';

@Injectable()
export class MovieService {
	constructor(
		@InjectModel(MovieModel)
		private readonly movieModel: typeof MovieModel
	) {}

	async byId(id: number) {
		const movie = await this.movieModel.findOne({
			where: { id },
			include: [
				{
					model: ReviewModel,
					include: [UserModel]
				}
			]
		});

		if (!movie) throw new NotFoundException('Video not found');

		return movie;
	}
	async getAll(searchTerm?: string) {
		let options: WhereOptions<MovieModel> = {};

		if (searchTerm) {
			options = {
				name: { [Op.like]: `%${searchTerm}%` }
			};
		}

		return this.movieModel.findAll({
			where: {
				...options
			},
			order: [['createdAt', 'DESC']],
			include: [
				{
					all: true
				}
			]
		});
	}

	async create() {
		const movie = await this.movieModel.create();

		return movie.id;
	}

	async update(id: number, dto: MovieDto) {
		const movie = await this.byId(id);

		return movie.update({
			...movie,
			...dto
		});
	}

	async delete(id: number) {
		return this.movieModel.destroy({ where: { id } });
	}
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { col, fn, literal } from 'sequelize';
import { MovieModel } from '../movie/movie.model';
import { ReviewModel } from '../review/review.model';
import { ViewsModel } from '../views/views.model';
import { IStatisticItem } from './statistics.interface';
import * as dayjs from 'dayjs';
import * as updateLocale from 'dayjs/plugin/updateLocale';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(updateLocale);
dayjs.extend(customParseFormat);

dayjs.updateLocale('en', {
	months: [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	]
});

@Injectable()
export class StatisticsService {
	constructor(
		@InjectModel(MovieModel)
		private readonly movieModel: typeof MovieModel,
		@InjectModel(ReviewModel)
		private readonly reviewModel: typeof ReviewModel,
		@InjectModel(ViewsModel)
		private readonly viewsModel: typeof ViewsModel
	) {}

	async getMiddleStatistics() {
		const totalFees = await this.movieModel
			.findAll({
				attributes: [[fn('sum', col('fees')), 'fees']]
			})
			.then((data) => Number(data[0].fees as any));

		const viewsByMonth = await this.viewsModel.findAll({
			attributes: [
				[fn('sum', col('views')), 'views'],
				[fn('date_trunc', 'month', col('createdAt')), 'month']
			],
			group: 'month',
			order: [[col('month'), 'ASC']],
			raw: true
		});

		return {
			totalFees,
			viewsByMonth: viewsByMonth.map((item) => ({
				...item,
				// @ts-ignore
				month: dayjs(item.month).format('MMM')
			}))
		};
	}

	async getMainStatistics(): Promise<IStatisticItem[]> {
		const countReviews = await this.reviewModel.count();
		const countMovies = await this.movieModel.count();

		const views = await this.viewsModel
			.findAll({
				attributes: [[fn('sum', col('views')), 'views']]
			})
			.then((data) => Number(data[0].views as any));

		const avarageRating = await this.movieModel
			.findAll({
				attributes: [[fn('avg', col('rating')), 'rating']]
			})
			.then((data) => Number(data[0].rating as any).toFixed(1));

		return [
			{ id: 1, name: 'Просмотры', value: views },
			{
				id: 2,
				name: 'Средний рейтинг',
				value: avarageRating
			},
			{
				id: 3,
				name: 'Фильмы',
				value: countMovies
			},
			{
				id: 4,
				name: 'Рецензии',
				value: countReviews
			}
		];
	}
}

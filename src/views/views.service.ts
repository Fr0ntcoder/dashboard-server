import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { col, fn, Op, where } from 'sequelize';
import { ViewsModel } from 'src/views/views.model';
import * as dayjs from 'dayjs';

@Injectable()
export class ViewsService {
	constructor(
		@InjectModel(ViewsModel)
		private readonly viewsModel: typeof ViewsModel
	) {}

	async updateViews(movieId: number) {
		const row = await this.viewsModel.findOne({
			where: {
				[Op.and]: [
					fn('EXTRACT(MONTH from "createdAt")=', dayjs().get('month') + 1)
				]
			}
		});

		if (row) return row.increment('views');

		return this.viewsModel.create({ movieId });
	}
}

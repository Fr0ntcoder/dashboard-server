import {
	Column,
	ForeignKey,
	HasMany,
	Model,
	Table
} from 'sequelize-typescript';
import { MovieModel } from 'src/movie/movie.model';

@Table({ tableName: 'Views', deletedAt: false, version: false })
export class ViewsModel extends Model<ViewsModel> {
	@ForeignKey(() => MovieModel)
	@Column
	movieId: number;

	@Column({ defaultValue: 1 })
	views: number;

	/* @Column({ unique: true })
	name: string;

	@Column({ allowNull: true })
	rating: number;

	@Column({ defaultValue: '' })
	poster: string;

	reviews?: IReview[]
	@Column({ defaultValue: 0 })
	fees: number;

	@HasMany(() => ReviewModel)
	reviews: ReviewModel[]; */
}

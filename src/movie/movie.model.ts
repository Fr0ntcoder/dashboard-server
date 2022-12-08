import { AllowNull, Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'Movie', deletedAt: false, version: false })
export class MovieModel extends Model {
	@Column({ unique: true })
	name: string;

	@Column({ allowNull: true })
	rating: number;

	@Column({ defaultValue: '' })
	poster: string;

	/* reviews?: IReview[] */
	@Column({ defaultValue: 0 })
	fees: number;
}

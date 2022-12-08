import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'Review', deletedAt: false, version: false })
export class ReviewModel extends Model {
	@Column({ defaultValue: '' })
	description: string;
}

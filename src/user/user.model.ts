import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'User', deletedAt: false, version: false })
export class UserModel extends Model {
	@Column
	name: string;

	@Column({ unique: true })
	email: string;

	@Column({ field: 'avatar_path' })
	avatarPath: string;
}

import { IsString, IsNumber } from 'class-validator';

export class MovieDto {
	@IsString()
	name: string;

	@IsNumber()
	fees: number;

	@IsString()
	poster: string;
}

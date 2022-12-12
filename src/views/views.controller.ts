import { Controller } from '@nestjs/common';
import {
	HttpCode,
	Param,
	Patch,
	Post,
	UsePipes
} from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';
import { ViewsService } from './views.service';

@Controller('views')
export class ViewsController {
	constructor(private readonly viewsService: ViewsService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Patch('update/:movieId')
	async updateViews(@Param('movieId') movieId: string) {
		return this.viewsService.updateViews(+movieId);
	}
}

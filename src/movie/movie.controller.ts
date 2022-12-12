import { Controller } from '@nestjs/common';
import {
	Body,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	Query,
	UsePipes
} from '@nestjs/common/decorators';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { MovieService } from './movie.service';
import { ValidationPipe } from '@nestjs/common/pipes';
import { MovieDto } from './dto/movie.dto';

@Controller('movie')
export class MovieController {
	constructor(private readonly movieService: MovieService) {}

	@Get()
	async getAll(@Query('searchTerm') searchTerm?: string) {
		return this.movieService.getAll(searchTerm);
	}

	@Get(':id')
	async getVideo(@Param('id') id: string) {
		return this.movieService.byId(+id);
	}

	@HttpCode(200)
	@Post()
	@Auth()
	async createVideo() {
		return this.movieService.create();
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	@Auth()
	async updateVideo(@Param('id') id: string, @Body() dto: MovieDto) {
		return this.movieService.update(+id, dto);
	}

	@HttpCode(200)
	@Delete(':id')
	@Auth()
	async deleteVideo(@Param('id') id: string) {
		return this.movieService.delete(+id);
	}
}

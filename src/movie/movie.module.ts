import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { MovieModel } from 'src/movie/movie.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { ViewsService } from '../views/views.service';

@Module({
	imports: [SequelizeModule.forFeature([MovieModel])],
	controllers: [MovieController],
	providers: [MovieService]
})
export class MovieModule {}

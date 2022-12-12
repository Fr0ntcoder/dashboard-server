import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize/dist';
import { UserModule } from 'src/auth/auth.module';
import { getSequelizeConfig } from 'src/config/db.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieModule } from './movie/movie.module';
import { ReviewModule } from './review/review.module';
import { ViewsModule } from './views/views.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		SequelizeModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getSequelizeConfig
		}),
		UserModule,
		MovieModule,
		ReviewModule,
		ViewsModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}

import { Controller, UsePipes } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ValidationPipe } from '@nestjs/common/pipes';
import { HttpCode } from '@nestjs/common/decorators/http/http-code.decorator';
import { Post } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { ReviewDto } from './dto/review.dto';
import { CurrenUser } from 'src/auth/decorators/user.decorator';

@Controller('review')
export class ReviewController {
	constructor(private readonly reviewService: ReviewService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	@Auth()
	async createReview(@CurrenUser('id') id: string, @Body() dto: ReviewDto) {
		return this.reviewService.create(+id, dto);
	}
}

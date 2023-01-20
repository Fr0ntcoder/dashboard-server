import { Query, UploadedFile } from '@nestjs/common';
import { Controller } from '@nestjs/common/decorators/core/controller.decorator';
import { UseInterceptors } from '@nestjs/common/decorators/core/use-interceptors.decorator';
import { HttpCode } from '@nestjs/common/decorators/http/http-code.decorator';
import { Post } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { MediaService } from './media.service';

@Controller('media')
export class MediaController {
	constructor(private readonly mediaService: MediaService) {}

	@HttpCode(200)
	@Post()
	@Auth()
	@UseInterceptors(FileInterceptor('media'))
	async uploadMediaFile(
		@UploadedFile() mediaFile: Express.Multer.File,
		@Query('folder') folder?: string
	) {
		return this.mediaService.saveMedia(mediaFile, folder);
	}
}

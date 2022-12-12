import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserModel } from 'src/auth/auth.model';

export const CurrenUser = createParamDecorator(
	(data: keyof UserModel, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest();
		const user = request.user;

		return data ? user[data] : user;
	}
);

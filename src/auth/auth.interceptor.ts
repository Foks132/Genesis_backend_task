import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
    constructor(private authService: AuthService, private clsService: ClsService) { }

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        try {
            const auth = await this.authService.getAuthorization();
            this.clsService.set('baseDomain', auth?.base_domain);
            this.clsService.set('accessToken', auth?.access_token);
            return next.handle();
        } catch (error) {
            console.error('Failed to fetch authorization data:', error);
            return next.handle();
        }
    }
}

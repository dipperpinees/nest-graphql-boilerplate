import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { SECRET_KEY } from 'src/config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void) {
        try {
            const { token } = req.cookies;

            if (!token) {
                req.user = null;
            }

            const { data } = jwt.verify(token, SECRET_KEY);

            req.user = data;
        } catch (e) {
            req.user = null;
        }

        next();
    }
}

import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { authenticator } from 'otplib';
import { toDataURL } from 'qrcode';
import { Users } from 'src/entities/user.entity';

@Injectable()
export class TwoFactorAuthService {
    constructor(
		@Inject("PG_CONNECTION") private db: any,
        private jwtService: JwtService,
    ) {}

    async validateUser(email: string, pass: string): Promise<Partial<Users>> {
        const user = await this.db.query(`SELECT * FROM public.users WHERE email='${email}'`);
        try {
            // Of course, we should consider encrypting the password
            const isMatch = pass === user.password;
            if (user && isMatch) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { password: _, ...userWithoutPassword } = user;
                return userWithoutPassword;
            }
        } catch (e) {
            return null;
        }
    }

    loginWith2fa(id_42: number) {
        const payload = {
            id_42: id_42.toString(),
        };
        return {
            id_42: id_42,
            access_token: this.jwtService.sign(payload),
        };
    }

    async generateTwoFactorAuthenticationSecret(id_42: number) {
        const secret = authenticator.generateSecret();
        const otpAuthUrl = authenticator.keyuri(
            id_42.toString(),
            'AUTH_APP_NAME',
            secret,
        );
        await this.db.query(`UPDATE users SET two_factor_secret='${secret}' WHERE id_42='${id_42}'`);
        return {
            secret,
            otpAuthUrl,
        };
    }

    generateQrCodeDataURL(otpAuthUrl: string) {
        return toDataURL(otpAuthUrl);
    }

    isTwoFactorAuthenticationCodeValid(
        code: string,
        secret: string,
    ) {
        return authenticator.verify({
            token: code,
            secret: secret,
        });
    }
}

import { Body, Controller, HttpCode, Post, Response, UnauthorizedException } from '@nestjs/common';
import { TwoFactorAuthService } from '../services/two_factor_auth.service';

@Controller('2fa')
export class TwoFactorAuthController {
    constructor(
        private readonly twoFactorAuthService: TwoFactorAuthService,
    ) {}

    @Post('/generate')
    async register(@Response() response, @Body() body: { id_42: number}) {
        console.log('the id of the post is ', body.id_42);
        const { otpAuthUrl } =
            await this.twoFactorAuthService.generateTwoFactorAuthenticationSecret(
                body.id_42,
            );
        return response.json(
            await this.twoFactorAuthService.generateQrCodeDataURL(otpAuthUrl),
        );
    }

    @Post('/authenticate')
    @HttpCode(200)
    async authenticate(@Body() body: { secret: string, code: string, id_42: number }) {
        console.log('on reception having for value: ', 'code', body.code, 'secret', body.secret, 'id_42', body.id_42);
        const isCodeValid =
            await this.twoFactorAuthService.isTwoFactorAuthenticationCodeValid(
                body.code,
                body.secret,
            );

        if (!isCodeValid) {
            throw new UnauthorizedException('Wrong authentication code');
        }
        return this.twoFactorAuthService.loginWith2fa(body.id_42);
    }
}

/* eslint-disable no-undef */
describe('Basic authentication', () => {

    beforeEach( async () => {
        await page.goto('http://localhost:3000/login/email/');
    });

    it('Should not log user because email have the wrong format', async () => {
        await page.focus('div[data-testid="email-input-login"] input');
        await page.keyboard.type('demo');

        await page.focus('div[data-testid="password-input-login"] input');
        await page.keyboard.type('password');

        await page.click('button[data-testid="buttom-submit-login"]');
        expect(page.url()).toEqual('http://localhost:3000/login/email/');
    });

    it('Should not log user because email is incorrect', async () => {
        await page.focus('div[data-testid="email-input-login"] input');
        await page.keyboard.type('demo@42.com');

        await page.focus('div[data-testid="password-input-login"] input');
        await page.keyboard.type('password');

        await page.click('button[data-testid="buttom-submit-login"]');
        expect(page.url()).toEqual('http://localhost:3000/login/email/');
    });

    it('Should not log user because password is incorrect', async () => {
        await page.focus('div[data-testid="email-input-login"] input');
        await page.keyboard.type('demo@42.fr');

        await page.focus('div[data-testid="password-input-login"] input');
        await page.keyboard.type('pass');

        await page.click('button[data-testid="buttom-submit-login"]');
        expect(page.url()).toEqual('http://localhost:3000/login/email/');
    });

    it('Should log user', async () => {
        await page.focus('div[data-testid="email-input-login"] input');
        await page.keyboard.type('demo@42.fr');

        await page.focus('div[data-testid="password-input-login"] input');
        await page.keyboard.type('password');

        await page.click('button[data-testid="buttom-submit-login"]');
        await page.waitForSelector('p[data-testid=home-page-title]');
        expect(page.url()).toEqual('http://localhost:3000/home');
    });
});
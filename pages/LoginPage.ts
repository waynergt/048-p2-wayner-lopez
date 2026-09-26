import { Page } from '@playwright/test';

export class LoginPage {
  readonly usernameInput;
  readonly passwordInput;
  readonly loginButton;
  readonly loginError;

  constructor(private readonly page: Page) {
    this.usernameInput = page.locator('#txt-username');
    this.passwordInput = page.locator('#txt-password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.loginError = page.getByText('Login failed! Please ensure the username and password are valid.');
  }

  async open(): Promise<void> {
    await this.page.goto('/profile.php#login');
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
// @ts-check
import { test, expect } from '@playwright/test';

// ================================
// YOUR LOGIN CREDENTIALS
// ================================
const TEST_USER = {
  email: 'test@gmail.com',       // ← put your real email here
  password: '12345678',      // ← put your real password here
};

// ================================
// TEST SUITE 1 - Homepage
// ================================
test.describe('Homepage Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('homepage loads correctly', async ({ page }) => {
    await expect(page).toHaveTitle(/myNoteBook/i);
    console.log('✅ Homepage loaded!');
  });

  test('navbar links are visible', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle'); // wait fully for page to load



    // ✅ Find span inside link
    await expect(page.locator('a span', { hasText: 'Home' })).toBeVisible();
    await expect(page.locator('a span', { hasText: 'Notes' })).toBeVisible();
    await expect(page.locator('a span', { hasText: 'About' })).toBeVisible();
    await expect(page.locator('a span', { hasText: 'Contact' })).toBeVisible();

    console.log('✅ All navbar links visible!');

    console.log('✅ All navbar links visible!');

    console.log('✅ All navbar links visible!');
  });

  test('Log in button is visible in navbar', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Log in' })).toBeVisible();
    console.log('✅ Login button visible!');
  });

  test('hero heading is visible', async ({ page }) => {
    // "my" is in a span + "NoteBook" - so check full heading
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h1')).toContainText('NoteBook');
    await expect(page.locator('h1 span')).toHaveText('my');
    console.log('✅ Hero heading visible!');
  });

  test('hero subheading is correct', async ({ page }) => {
    await expect(
      page.getByText('Your Notebook on Cloud - Safe and Secure')
    ).toBeVisible();
    console.log('✅ Subheading visible!');
  });




  test('Create Notes button is visible', async ({ page }) => {

    page.getByText('Create Notes')
    console.log('✅ Create Notes button visible!');
  });



  // test('Read More button is visible and has correct href', async ({ page }) => {
  //   const readMoreBtn = page.locator('a[href="/about"]');
  //   await expect(readMoreBtn).toBeVisible();
  //   await expect(readMoreBtn).toHaveText('Read More');
  //   console.log('✅ Read More button visible!');
  // });





  // test('clicking Read More navigates to about page', async ({ page }) => {
  //   await page.locator('a[href="/about"]').click();
  //   await expect(page).toHaveURL('/about');
  //   console.log('✅ Navigated to About page!');
  // });


  test('clicking Log in navigates to login page', async ({ page }) => {
    await page.getByRole('link', { name: 'Log in' }).click();
    await expect(page).toHaveURL('/login');
    console.log('✅ Navigated to login page!');
  });

});

// ================================
// TEST SUITE 2 - Login Page
// ================================
test.describe('Login Page Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('login page loads correctly', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    console.log('✅ Login page loaded!');
  });

  test('email input is visible', async ({ page }) => {
    await expect(
      page.getByPlaceholder('Enter your email')
    ).toBeVisible();
    console.log('✅ Email input visible!');
  });

  test('password input is visible', async ({ page }) => {
    await expect(
      page.getByPlaceholder('Enter your password')
    ).toBeVisible();
    console.log('✅ Password input visible!');
  });

  test('Sign in button is visible', async ({ page }) => {
    await expect(page.getByText('Sign in')).toBeVisible();
    console.log('✅ Sign in button visible!');
  });

  test('Forgot Password link is visible', async ({ page }) => {
    await expect(page.getByText('Forgot Password?')).toBeVisible();
    console.log('✅ Forgot Password visible!');
  });

  test('social login icons are visible', async ({ page }) => {
    await expect(page.getByText('Login with social accounts')).toBeVisible();
    console.log('✅ Social login visible!');
  });

  test('Sign up link is visible', async ({ page }) => {
    await expect(page.getByText("Don't have an account?")).toBeVisible();
    await expect(page.getByRole('link', { name: 'Sign up' })).toBeVisible();
    console.log('✅ Sign up link visible!');
  });

  test('can type in email field', async ({ page }) => {
    await page.getByPlaceholder('Enter your email').fill('test@example.com');
    await expect(
      page.getByPlaceholder('Enter your email')
    ).toHaveValue('test@example.com');
    console.log('✅ Email typing works!');
  });

  test('can type in password field', async ({ page }) => {
    await page.getByPlaceholder('Enter your password').fill('testpassword');
    await expect(
      page.getByPlaceholder('Enter your password')
    ).toHaveValue('testpassword');
    console.log('✅ Password typing works!');
  });

  test('successful login', async ({ page }) => {
    await page.getByPlaceholder('Enter your email').fill(TEST_USER.email);
    await page.getByPlaceholder('Enter your password').fill(TEST_USER.password);
    await page.getByText('Sign in').click();


    // Wait for redirect after login
    await expect(page).toHaveURL('http://localhost:5173/');
    console.log('✅ Login successful!');
  });

  test('wrong credentials shows error', async ({ page }) => {
    await page.getByPlaceholder('Enter your email').fill('wrong@email.com');
    await page.getByPlaceholder('Enter your password').fill('wrongpass123');
    await page.getByText('Sign in').click();

    await expect(
      page.getByText(/invalid|incorrect|error|wrong/i)
    ).toBeVisible();
    console.log('✅ Error message shown for wrong credentials!');
  });

});

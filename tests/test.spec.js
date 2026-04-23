import { test, expect } from '@playwright/test'




test('www.framerspace test', async ({ page }) => {

    await page.goto('https://www.framerspace.com/')

})
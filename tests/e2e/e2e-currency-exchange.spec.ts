import { test, expect } from '@playwright/test'

test.describe('New Currency Exchange', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.click('#signin_button')
    await page.type('#user_login', 'username')
    await page.type('#user_password', 'password')
    await page.click('text=Sign in')
    await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')
  })

  test('Should exchange currency', async ({ page }) => {
    await page.click('#pay_bills_tab')
    await page.click("a[href='#ui-tabs-3']")
    await page.selectOption('#pc_currency', 'EUR')

    const sellRate = await page.locator('#sp_sell_rate')
    await expect(sellRate).toBeVisible()

    await page.type('#pc_amount', '100')
    await page.click('#pc_inDollars_true')
    await page.click('#pc_calculate_costs')

    const conversionAmount = await page.locator('#pc_conversion_amount')
    await expect(conversionAmount).toBeVisible()

    await page.click('#purchase_cash')

    const successMessage = await page.locator('#alert_content')
    await expect(successMessage).toBeVisible()
    await expect(successMessage).toContainText(
      'Foreign currency cash was successfully purchased.'
    )
  })
})

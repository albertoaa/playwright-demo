import { test, expect } from '@playwright/test'

test.describe('Show Transactions based on filter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.click('#signin_button')
    await page.type('#user_login', 'username')
    await page.type('#user_password', 'password')
    await page.click('text=Sign in')
    await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')
  })

  test('Should not show results for Brokerage', async ({ page }) => {
    await page.click('#account_activity_tab')
    await page.selectOption('#aa_accountId', '6')

    const message = await page.locator('.well')
    await expect(message).toContainText('No results')
  })

  test('Should show results for Savings', async ({ page }) => {
    await page.click('#account_activity_tab')
    await page.selectOption('#aa_accountId', '1')

    const resultsTable = await page.locator('table')
    await expect(resultsTable).toBeVisible()

    const resultsList = await page.locator(
      '#all_transactions_for_account table tbody tr'
    )
    await expect(resultsList).toHaveCount(3)
  })
})

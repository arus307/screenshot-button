import { test as setup, expect } from '@playwright/test';
import { ACCOUNT_INFO } from './constants';
import fs from 'fs';

const authFile = 'playwright/.auth/user.json';

setup('authenticate Z-aN', async ({ page }) => {


    await page.context().storageState({ path: authFile });

    const sessionStorage = await page.evaluate(() => JSON.stringify(sessionStorage));
    fs.writeFileSync('playwright/.auth/session.json', sessionStorage, 'utf-8');
});
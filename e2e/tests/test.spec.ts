import { test, expect } from './fixtures';
import { ACCOUNT_INFO } from './constants';

const SCREENSHOT_BUTTON_TESTID = 'screenshot-button';

test.describe('Take Screenshot', () => {

  test('YouTube Video', async ({ page }) => {
    await page.goto('https://www.youtube.com/watch?v=F6AzguUL-Hs');

    const screenshotButton = await page.getByTestId(SCREENSHOT_BUTTON_TESTID);
    await expect(screenshotButton).toBeVisible();

    const downloadPromise = page.waitForEvent('download');
    screenshotButton.click();
    await downloadPromise;
  });

  test('SPWN', async ({ page }) => {
    await page.goto('https://spwn.jp/streaming-test');

    const screenshotButton = await page.getByTestId(SCREENSHOT_BUTTON_TESTID);
    await expect(screenshotButton).toBeVisible();

    // 1sスリープ(動画プレイヤーの読み込み完了まで)
    await page.waitForTimeout(1000);

    const downloadPromise = page.waitForEvent('download');
    screenshotButton.click();
    await downloadPromise;
  });

  test('Z-aN', async ({ page }) => {
    /* ログイン */
    await page.goto('https://www.zan-live.com/ja/auth/login');

    await page.locator('[name=mailAddress]').fill(ACCOUNT_INFO.ZaN.id);
    await page.locator('[name=password]').fill(ACCOUNT_INFO.ZaN.pw);
    await page.locator('[name=__submit__]').click();

    await page.waitForURL('https://www.zan-live.com/ja/');

    await expect(page.locator('div.userNaviBtnBox')).toBeVisible();
    /* ここまでログイン */


    await page.goto('https://www.zan-live.com/ja/live/play/1797/663');
    const video = page.locator('video');
    await expect(video).toBeVisible();

    //メニュー出すために停止させる
    page.locator('.prism-cover-controller-collision').click();

    const screenshotButton = await page.getByTestId(SCREENSHOT_BUTTON_TESTID);
    await expect(screenshotButton).toBeVisible();

    const downloadPromise = page.waitForEvent('download');
    screenshotButton.click();
    await downloadPromise;
  });


  test('niconico', async ({ page }) => {
    await page.goto('https://live.nicovideo.jp/');

    // 配信中のchを探す
    const recommendChs = page.locator('#recommendedProgramListSection');
    const onLive = recommendChs.getByText('LIVE').first();
    await onLive.click();

    // 以下配信ページ想定

    // 3sスリープ(動画プレイヤーの読み込み完了まで)
    await page.waitForTimeout(3000);

    const screenshotButton = await page.getByTestId(SCREENSHOT_BUTTON_TESTID);
    await expect(screenshotButton).toBeVisible();

    const downloadPromise = page.waitForEvent('download');
    screenshotButton.click();
    await downloadPromise;
  });

  test('twitch', async ({ page }) => {

    await page.goto('https://twitch.tv');

    //適当な配信を開く
    const featuredContentsArea = page.locator('.featured-content-carousel');
    const featuredItem = featuredContentsArea.locator('[data-a-target="featured-item"]');

    featuredItem.locator('.click-handler').click();

    const video = page.locator('video');
    await expect(video).toBeVisible();

    const screenshotButton = await page.getByRole('region', { name: 'Player Controls' }).getByTestId(SCREENSHOT_BUTTON_TESTID);
    await expect(screenshotButton).toBeVisible();

    const downloadPromise = page.waitForEvent('download');
    screenshotButton.click();
    await downloadPromise;
  });

  test('showroom', async ({ page }) => {

    await page.goto('https://www.showroom-live.com/');

    const onLives = page.locator('.story');

    const liveLink = onLives.getByRole('link');

    console.log(liveLink);

    liveLink.click();

    const screenshotButton = await page.getByTestId(SCREENSHOT_BUTTON_TESTID);
    await expect(screenshotButton).toBeVisible();

    // UIがかぶるのでスクロール
    await page.mouse.wheel(0, 10000);

    const downloadPromise = page.waitForEvent('download');
    screenshotButton.click();
    await downloadPromise;
  });

  test('CHZZK', async ({ page }) => {
    await page.goto('https://chzzk.naver.com/');
    page.getByText('LIVE', { exact: true }).nth(0).click();

    // 広告待ち
    await page.waitForTimeout(3 * 1000);
    while (true) {
      const adSkip = page.locator('.btn_skip');
      const ad = page.locator('.skip_info');
      await page.waitForTimeout(1 * 1000);
      if (await adSkip.isVisible()) {
        adSkip.click();
      }
      if (!(await ad.isVisible()) && !(await adSkip.isVisible())) break;
    };

    const screenshotButton = await page.getByTestId(SCREENSHOT_BUTTON_TESTID);
    await expect(screenshotButton).toBeVisible();

    const downloadPromise = page.waitForEvent('download');
    screenshotButton.click();
    await downloadPromise;
  });

  test('mildom', async ({ page }) => {
    await page.goto('https://www.mildom.com/');
    page.locator('.web-push-permission-dialog__agree-btn').click();

    page.getByText('ライブ').nth(0).click();

    await expect(page).toHaveURL(new RegExp('mildom.com/\\d'));
    await page.waitForTimeout(5 * 1000);

    const screenshotButton = await page.getByTestId(SCREENSHOT_BUTTON_TESTID);
    await expect(screenshotButton).toBeVisible();

    const downloadPromise = page.waitForEvent('download');
    screenshotButton.click();
    await downloadPromise;
  });

  test('openrec', async ({ page }) => {
    await page.goto('https://www.openrec.tv/');

    page.getByText('LIVE').nth(0).click();

    await expect(page).toHaveURL(new RegExp('https://www.openrec.tv/live/'));

    const screenshotButton = await page.getByTestId(SCREENSHOT_BUTTON_TESTID);
    await expect(screenshotButton).toBeVisible();

    const downloadPromise = page.waitForEvent('download');
    screenshotButton.click();
    await downloadPromise;
  });
});

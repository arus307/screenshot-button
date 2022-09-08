const puppeteer = require('puppeteer');
const path = require('path');
const extensionPath = path.join(__dirname, "../src");// __dirname + "/../src";
const DOWNLOAD_DIR = path.join(__dirname, "download");// __dirname + "/download";
const CAPTURE_DIR = path.join(__dirname, "puppeteerScreenShot");// __dirname + "/puppeteerScreenShot";
const sleep = time => new Promise(resolve => setTimeout(resolve, time));

jest.setTimeout(30000);

describe('Take Screenshot Test', () => {
    let browser = null;
    let page = null;

    beforeAll(async () => {

        browser = await puppeteer.launch({
            headless: false,
            args: [
                '--disable-extensions-except=' + extensionPath,
                '--load-extension=' + extensionPath,
                '--no-sandbox', '--disabled-setuid-sandbox'
            ],
            executablePath: process.env.PUPPETEER_EXEC_PATH, // set by docker container
        });
        page = await browser.newPage();

        //DLフォルダを設定
        const cdpSession = await page.target().createCDPSession();
        await cdpSession.send("Browser.setDownloadBehavior", {
            behavior: "allow",
            downloadPath: DOWNLOAD_DIR,
            eventsEnabled: true,
        });
    });

    afterAll(async () => {
        //完了後にブラウザを閉じる
        await browser.close();
    });

    //YouTubeでのスクショ撮影
    test('YouTube', async () => {
        await page.goto('https://www.youtube.com/watch?v=-bNMq1Nxn5o');

        //1s待つ
        await sleep(3000);

        await page.screenshot({ path: path.join(CAPTURE_DIR, 'YouTube.png') });

        //スクショボタンが追加されているかチェック
        const isButtonAdded = await page.$('.screenshotButton').then(res => !!res);

        if (isButtonAdded) {
            console.log("YouTubeでボタンが表示された");
        } else {
            console.log("YouTubeでボタンが表示されていない");
            throw Error("YouTubeでボタンが表示されていない");
        }

        await page.click(".screenshotButton");

        //DL完了を待つ
        await sleep(5000);
    });

});

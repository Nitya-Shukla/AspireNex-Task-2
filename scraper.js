
const Tesseract = require("tesseract.js");
const fs = require("fs");
const puppeteer = require("puppeteer-extra");
const pluginStealth = require("puppeteer-extra-plugin-stealth");
const ChatGPT = require('./gptSummarizer');

class WebScraper {
  constructor() {
    puppeteer.use(pluginStealth());
  }

  async scrapeData(url) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });

    const screenshotPath = 'screenshot.png';
    await page.screenshot({ path: screenshotPath, fullPage: true });

    let finalTextData = "";

    try {
      const { data: { text } } = await Tesseract.recognize(screenshotPath, 'eng', { logger: e => console.log(e) });
      finalTextData = text;
    } catch (error) {
      console.error("Error during OCR:", error);
    }

    await browser.close();

    if (finalTextData) {
      const chatGPT = new ChatGPT();
      let summarizedData = await chatGPT.gptSearch(finalTextData, `Organize the following scraped product data in a well stuctured and detailed json format with validations, containing every information related to product in a well structured manner and the output will contain only json, i dont want any text other than the json document in the output, 

Scraped Product Data:\n\n`);
      
      // Remove the "ChatGPTChatGPT" prefix if it exists
      summarizedData = summarizedData.replace(/^ChatGPTChatGPT/, '');
      summarizedData = summarizedData.replace(/^jsonCopy code/, '');

      return summarizedData;
    }

    return finalTextData;
  }
}

module.exports = WebScraper;


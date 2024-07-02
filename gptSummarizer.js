const puppeteer = require("puppeteer-extra");

class ChatGPT {
  constructor() {}

  async gptSearch(inputData, pre = "", msec = 60000, trainData = "") {
    try {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();

      const searchUrl = `https://chat.openai.com/`;
      await page.goto(searchUrl, { waitUntil: "networkidle0", timeout: 30000 });

      // Set the textarea value using evaluate
      await page.evaluate((pre, inputData) => {
        const textarea = document.querySelector("#prompt-textarea");
        textarea.value = pre + inputData;
        textarea.dispatchEvent(new Event('input', { bubbles: true })); // Dispatch input event
      }, pre, inputData);

      // Simulate pressing "Enter" key to send the prompt
      await page.keyboard.press('Enter');

      // Wait for the GPT-3 response (adjust the timeout as needed)
      await page.evaluate((msec) => new Promise(resolve => setTimeout(resolve, msec)), msec);

      // Wait for the response selector to appear
      await page.waitForSelector(".w-full.text-token-text-primary");

      // Retrieve the response
      const results = await page.evaluate(() => {
        const elements = document.querySelectorAll(".w-full.text-token-text-primary")[1];
        return elements ? elements.textContent.trim() : null;
      });

      await browser.close();

      return results ? results : "";
    } catch (error) {
      console.error("Error during data scraping:", error);
      return "";
    }
  }
}

module.exports = ChatGPT;

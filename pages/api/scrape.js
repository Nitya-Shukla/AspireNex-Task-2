import WebScraper from '../../scraper';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { url } = req.body;

    if (!url) {
      res.status(400).json({ error: 'URL is required' });
      return;
    }

    const scraper = new WebScraper();
    try {
      const data = await scraper.scrapeData(url);
      res.status(200).json({ data });
    } catch (error) {
      console.error('Scraping error:', error);
      res.status(500).json({ error: 'Failed to scrape data' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};


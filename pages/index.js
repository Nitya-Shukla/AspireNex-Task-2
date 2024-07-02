import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await fetch('/api/scrape', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });

    const result = await response.json();
    if (response.ok) {
      setData((prevData) => [...prevData, { url, data: result.data }]);
    } else {
      alert(result.error);
    }

    setLoading(false);
    setUrl('');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">eCommerce Scraper</h1>
        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4 mb-8">
          <input
            type="url"
            placeholder="Enter product URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-md"
          />
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 font-medium text-white rounded-md shadow-sm ${loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}
          >
            {loading ? 'Scraping...' : 'Scrape'}
          </button>
        </form>
        {data.length > 0 && (
          <div className="space-y-6">
            {data.map((item, index) => (
              <div key={index} className="p-6 bg-white shadow rounded-md">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">Scraped Data for <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{item.url}</a></h2>
                <pre className="whitespace-pre-wrap text-gray-700">{item.data}</pre>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


import { useState } from 'react';

function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');
    setShortUrl('');

    try {
      const response = await fetch('/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Unable to shorten URL');
      }

      setShortUrl(data.shortUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app-shell">
      <div className="card">
        <h1>URL Shortener</h1>
        <p>Paste a long URL and create a short one instantly.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="url"
            placeholder="https://example.com"
            value={originalUrl}
            onChange={(event) => setOriginalUrl(event.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Shortening...' : 'Shorten'}
          </button>
        </form>

        {error ? <p className="message error">{error}</p> : null}

        {shortUrl ? (
          <div className="result">
            <p>Your short URL:</p>
            <a href={shortUrl} target="_blank" rel="noreferrer">
              {shortUrl}
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;

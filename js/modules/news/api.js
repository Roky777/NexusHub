import { API_KEY, BASE_URL } from "./config.js";

// Fetch news through our Vercel serverless proxy ("/api/news"), which
// caches results and hides the API key. If the proxy isn't available
// (e.g. local development without Vercel), fall back to calling GNews
// directly so the app still works.
async function getNews(params) {
  try {
    const proxied = await fetch(`/api/news?${params}`);
    if (proxied.ok) return await proxied.json();
  } catch (error) {
    // Proxy unreachable — fall through to a direct request.
  }

  const directUrl = params.startsWith("q=")
    ? `${BASE_URL}/search?${params}&lang=en&max=10&apikey=${API_KEY}`
    : `${BASE_URL}/top-headlines?${params}&lang=en&country=us&max=10&apikey=${API_KEY}`;

  const response = await fetch(directUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch news");
  }
  return await response.json();
}

export async function fetchTopNews(category = "general") {
  return getNews(`category=${encodeURIComponent(category)}`);
}

export async function searchNews(keyword) {
  return getNews(`q=${encodeURIComponent(keyword)}`);
}

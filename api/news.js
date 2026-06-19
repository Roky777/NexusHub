// =====================================
//  VERCEL SERVERLESS FUNCTION:  /api/news
//  Proxies requests to GNews so that:
//    1. The API key stays on the server (set GNEWS_API_KEY in
//       Vercel project settings; the fallback below is only for
//       convenience).
//    2. Responses are cached at Vercel's CDN, so many visitors
//       share a single upstream GNews request — which keeps us
//       well under the free plan's daily limit.
//
//  Query params:  ?category=technology   or   ?q=search+term
// =====================================

module.exports = async (req, res) => {
  const { category = "general", q = "" } = req.query;

  const key = process.env.GNEWS_API_KEY || "712f1ca9a8f760b7737f4bf0e2b2d017";
  const base = "https://gnews.io/api/v4";

  const url = q
    ? `${base}/search?q=${encodeURIComponent(q)}&lang=en&max=10&apikey=${key}`
    : `${base}/top-headlines?category=${encodeURIComponent(
        category
      )}&lang=en&country=us&max=10&apikey=${key}`;

  try {
    const upstream = await fetch(url);
    const data = await upstream.json();

    if (!upstream.ok) {
      res.status(upstream.status).json(data);
      return;
    }

    // Cache at the CDN for 6 hours (the free plan's data is already
    // ~12h delayed, so this costs nothing in freshness) and serve
    // stale content for up to a day while revalidating.
    res.setHeader(
      "Cache-Control",
      "s-maxage=21600, stale-while-revalidate=86400"
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
};

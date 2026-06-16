// We use GNews instead of NewsAPI.org.
// NewsAPI's free plan only allows requests from localhost, so the
// deployed (frontend) site could never fetch news. GNews allows
// requests straight from the browser.
//
// Get a free API key at https://gnews.io/ and paste it below.
export const API_KEY = "YOUR_GNEWS_API_KEY";

export const BASE_URL = "https://gnews.io/api/v4";
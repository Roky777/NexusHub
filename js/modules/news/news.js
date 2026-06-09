
import { fetchTopNews, searchNews } from "./api.js";
import { renderArticles } from "./ui.js";
import { showLoader, hideLoader, showError, clearError } from "./loader.js";

// Getting elements from HTML

const loader = document.getElementById("news-loader");
const errorBox = document.getElementById("news-error");
const newsContainer = document.getElementById("news-container");
const categoryButtons = document.querySelectorAll(".category-btn");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

// Function to load category news

async function loadNews(category = "general") {
  try {
    showLoader(loader);
    clearError(errorBox);
    const data = await fetchTopNews(category);
    renderArticles(newsContainer, data.articles);
  } catch (error) {
    showError(errorBox, error.message);
  } finally {
    hideLoader(loader);
  }
}

// Function to search news


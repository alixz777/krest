import '../styles/main.css'
import { getNewsArticle, formatDate, getCategoryName } from './news.js'

async function loadArticle() {
  const urlParams = new URLSearchParams(window.location.search)
  const slug = urlParams.get('slug')

  if (!slug) {
    showError('Статья не найдена')
    return
  }

  const article = await getNewsArticle(slug)

  if (!article) {
    showError('Статья не найдена')
    return
  }

  document.title = `${article.title} - Русский крест`

  const breadcrumbTitle = document.getElementById('breadcrumb-title')
  breadcrumbTitle.textContent = article.title

  const articleContent = document.getElementById('article-content')
  articleContent.innerHTML = `
    <div class="article-header">
      <div class="article-meta">
        <span class="article-category">${getCategoryName(article.category)}</span>
        <span class="article-date">${formatDate(article.published_at)}</span>
      </div>
      <h1 class="article-title">${article.title}</h1>
    </div>

    <div class="article-image">
      <img src="${article.image_url}" alt="${article.title}">
    </div>

    <div class="article-body">
      ${formatContent(article.content)}
    </div>
  `
}

function formatContent(content) {
  return content
    .split('\n\n')
    .map(paragraph => `<p>${paragraph.replace(/\n/g, '<br>')}</p>`)
    .join('')
}

function showError(message) {
  const articleContent = document.getElementById('article-content')
  articleContent.innerHTML = `
    <div class="error-message">
      <h2>${message}</h2>
      <p>Вернитесь на <a href="news.html">страницу пресс-центра</a></p>
    </div>
  `
}

document.addEventListener('DOMContentLoaded', () => {
  loadArticle()
})

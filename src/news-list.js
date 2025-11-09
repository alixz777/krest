import '../styles/main.css'
import { getNewsList, formatDate, getCategoryName } from './news.js'

let currentCategory = 'all'
let currentOffset = 0
const limit = 12

async function loadNews(append = false) {
  const newsList = document.getElementById('news-list')
  const loadMoreWrapper = document.querySelector('.load-more-wrapper')

  if (!append) {
    newsList.innerHTML = '<li class="loading">Загрузка новостей...</li>'
    currentOffset = 0
  }

  const options = {
    limit,
    offset: currentOffset
  }

  if (currentCategory !== 'all') {
    options.category = currentCategory
  }

  const articles = await getNewsList(options)

  if (articles.length === 0 && !append) {
    newsList.innerHTML = '<li class="no-results">Новостей не найдено</li>'
    loadMoreWrapper.style.display = 'none'
    return
  }

  if (!append) {
    newsList.innerHTML = ''
  } else {
    const loading = newsList.querySelector('.loading')
    if (loading) loading.remove()
  }

  articles.forEach((article, index) => {
    const li = document.createElement('li')

    if (index === 0 && currentOffset === 0) {
      li.className = 'press-list__item--featured'
      li.innerHTML = `
        <a href="/article.html?slug=${article.slug}">
          <picture>
            <img src="${article.image_url}" alt="${article.title}">
          </picture>
          <div class="badge">${getCategoryName(article.category)}</div>
          <h6>${article.title}</h6>
          <div class="row">
            <p>${formatDate(article.published_at)}</p>
          </div>
        </a>
      `
    } else {
      li.innerHTML = `
        <a href="/article.html?slug=${article.slug}">
          <picture>
            <img src="${article.image_url}" alt="${article.title}">
          </picture>
          <div class="badge">${getCategoryName(article.category)}</div>
          <h6>${article.title}</h6>
          <div class="row">
            <p>${formatDate(article.published_at)}</p>
          </div>
        </a>
      `
    }

    newsList.appendChild(li)
  })

  if (articles.length < limit) {
    loadMoreWrapper.style.display = 'none'
  } else {
    loadMoreWrapper.style.display = 'flex'
    loadMoreWrapper.style.justifyContent = 'center'
    loadMoreWrapper.style.marginTop = '40px'
  }

  currentOffset += articles.length
}

document.addEventListener('DOMContentLoaded', () => {
  loadNews()

  const filterButtons = document.querySelectorAll('.filter-btn')
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'))
      btn.classList.add('active')
      currentCategory = btn.dataset.category
      loadNews()
    })
  })

  const loadMoreBtn = document.getElementById('load-more')
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      loadNews(true)
    })
  }
})

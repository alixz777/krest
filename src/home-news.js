import { getNewsList, formatDate } from './news.js'

export async function loadHomeNews() {
  const pressList = document.querySelector('.press .press-list')

  if (!pressList) return

  const articles = await getNewsList({ limit: 5 })

  if (articles.length === 0) {
    return
  }

  pressList.innerHTML = ''

  articles.forEach((article, index) => {
    const li = document.createElement('li')

    if (index === 0) {
      li.innerHTML = `
        <a href="/article.html?slug=${article.slug}"></a>
        <picture>
          <img src="${article.image_url}" alt="${article.title}">
        </picture>
        <p class="badge">Новости</p>
        <h6>${article.title}</h6>
        <div class="row">
          <p class="date">${formatDate(article.published_at)}</p>
          <p class="link">Подробнее</p>
        </div>
      `
    } else {
      li.innerHTML = `
        <a href="/article.html?slug=${article.slug}"></a>
        <picture>
          <img src="${article.image_url}" alt="${article.title}">
        </picture>
        <p class="badge">Новости</p>
        <h6>${article.title}</h6>
        <div class="row">
          <p class="date">${formatDate(article.published_at)}</p>
          <p class="link">Подробнее</p>
        </div>
      `
    }

    pressList.appendChild(li)
  })
}

import { supabase } from './supabase.js'

export async function getNewsList(options = {}) {
  const { category, limit = 20, offset = 0, featured = false } = options

  let query = supabase
    .from('news_articles')
    .select('id, title, slug, excerpt, image_url, category, published_at, is_featured')
    .lte('published_at', new Date().toISOString())
    .order('published_at', { ascending: false })

  if (category) {
    query = query.eq('category', category)
  }

  if (featured) {
    query = query.eq('is_featured', true)
  }

  if (limit) {
    query = query.range(offset, offset + limit - 1)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching news:', error)
    return []
  }

  return data
}

export async function getNewsArticle(slug) {
  const { data, error } = await supabase
    .from('news_articles')
    .select('*')
    .eq('slug', slug)
    .lte('published_at', new Date().toISOString())
    .maybeSingle()

  if (error) {
    console.error('Error fetching article:', error)
    return null
  }

  return data
}

export function formatDate(dateString) {
  const date = new Date(dateString)
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return date.toLocaleDateString('ru-RU', options)
}

export function getCategoryName(category) {
  const categories = {
    news: 'Новости',
    media: 'СМИ о Фонде',
    events: 'События Фонда'
  }
  return categories[category] || category
}

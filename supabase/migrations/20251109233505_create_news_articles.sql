/*
  # News Articles Schema

  ## New Tables
    - `news_articles`
      - `id` (uuid, primary key) - Unique identifier
      - `title` (text) - Article title
      - `slug` (text, unique) - URL-friendly identifier
      - `excerpt` (text) - Short description/preview
      - `content` (text) - Full article content
      - `image_url` (text) - Main image URL
      - `category` (text) - Article category (news, media, events)
      - `published_at` (timestamptz) - Publication date
      - `is_featured` (boolean) - Mark as featured article
      - `created_at` (timestamptz) - Record creation date
      - `updated_at` (timestamptz) - Record update date

  ## Security
    - Enable RLS on `news_articles` table
    - Add policy for public read access
    - Add policy for authenticated admin insert/update/delete
*/

CREATE TABLE IF NOT EXISTS news_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  image_url text NOT NULL,
  category text NOT NULL DEFAULT 'news',
  published_at timestamptz DEFAULT now(),
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published news articles"
  ON news_articles
  FOR SELECT
  TO public
  USING (published_at <= now());

CREATE POLICY "Authenticated users can insert news articles"
  ON news_articles
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update news articles"
  ON news_articles
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete news articles"
  ON news_articles
  FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_news_articles_slug ON news_articles(slug);
CREATE INDEX IF NOT EXISTS idx_news_articles_category ON news_articles(category);
CREATE INDEX IF NOT EXISTS idx_news_articles_published_at ON news_articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_news_articles_featured ON news_articles(is_featured, published_at DESC);

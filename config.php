<?php

define('SUPABASE_URL', getenv('VITE_SUPABASE_URL') ?: 'https://0ec90b57d6e95fcbda19832f.supabase.co');
define('SUPABASE_ANON_KEY', getenv('VITE_SUPABASE_ANON_KEY') ?: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJib2x0IiwicmVmIjoiMGVjOTBiNTdkNmU5NWZjYmRhMTk4MzJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4ODE1NzQsImV4cCI6MTc1ODg4MTU3NH0.9I8-U0x86Ak8t2DGaIk0HfvTSLsAyzdnz-Nw00mMkKw');

function supabaseRequest($endpoint, $method = 'GET', $data = null) {
    $url = SUPABASE_URL . '/rest/v1/' . $endpoint;

    $headers = [
        'apikey: ' . SUPABASE_ANON_KEY,
        'Authorization: Bearer ' . SUPABASE_ANON_KEY,
        'Content-Type: application/json',
        'Prefer: return=representation'
    ];

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    if ($method === 'POST') {
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    }

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode >= 200 && $httpCode < 300) {
        return json_decode($response, true);
    }

    return null;
}

function getNewsList($category = null, $limit = 20, $offset = 0, $featured = false) {
    $endpoint = 'news_articles?select=id,title,slug,excerpt,image_url,category,published_at,is_featured';
    $endpoint .= '&published_at=lte.' . date('c');
    $endpoint .= '&order=published_at.desc';

    if ($category && $category !== 'all') {
        $endpoint .= '&category=eq.' . urlencode($category);
    }

    if ($featured) {
        $endpoint .= '&is_featured=eq.true';
    }

    if ($limit) {
        $endpoint .= '&limit=' . $limit . '&offset=' . $offset;
    }

    return supabaseRequest($endpoint);
}

function getNewsArticle($slug) {
    $endpoint = 'news_articles?slug=eq.' . urlencode($slug);
    $endpoint .= '&published_at=lte.' . date('c');
    $endpoint .= '&limit=1';

    $result = supabaseRequest($endpoint);
    return $result && count($result) > 0 ? $result[0] : null;
}

function formatDate($dateString) {
    $date = new DateTime($dateString);
    $months = [
        1 => 'января', 2 => 'февраля', 3 => 'марта', 4 => 'апреля',
        5 => 'мая', 6 => 'июня', 7 => 'июля', 8 => 'августа',
        9 => 'сентября', 10 => 'октября', 11 => 'ноября', 12 => 'декабря'
    ];

    $day = $date->format('j');
    $month = $months[(int)$date->format('n')];
    $year = $date->format('Y');

    return "$day $month $year г.";
}

function getCategoryName($category) {
    $categories = [
        'news' => 'Новости',
        'media' => 'СМИ о Фонде',
        'events' => 'События Фонда'
    ];

    return isset($categories[$category]) ? $categories[$category] : $category;
}

function escapeHtml($text) {
    return htmlspecialchars($text, ENT_QUOTES, 'UTF-8');
}

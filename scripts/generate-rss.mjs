// scripts/generate-rss.mjs
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = 'content/blog';
const OUT_DIR = 'out';
const BASE_URL = 'https://hariz-harisun.github.io';
const SITE_TITLE = 'M. Hariz Hazril — Software Engineer';
const SITE_DESCRIPTION = 'Software engineer and technologist focused on Industrial IoT, AI integration, MES/ERP/MIS enterprise systems, and legacy modernisation.';
const AUTHOR_NAME = 'M. Hariz Hazril';
const AUTHOR_EMAIL = 'harizhazril@gmail.com';
const AUTHOR_URI = 'https://hariz-harisun.github.io';

function getAllPosts() {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.mdx'));
  const posts = [];
  
  for (const file of files) {
    const fullPath = path.join(CONTENT_DIR, file);
    const content = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(content);
    
    if (data.draft === true) continue;
    
    const slug = file.replace(/\.mdx$/, '');
    posts.push({
      slug,
      title: data.title,
      summary: data.summary,
      date: data.date,
      tags: data.tags || [],
      content: content.split('---').slice(2).join('---').trim(),
    });
  }
  
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

function escapeXml(str) {
  return str
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, '&apos;');
}

function generateRSS(posts) {
  const latestDate = posts.length > 0 ? new Date(posts[0].date).toUTCString() : new Date().toUTCString();
  
  const items = posts.slice(0, 20).map((post) => {
    const postUrl = `${BASE_URL}/blog/${post.slug}`;
    const pubDate = new Date(post.date).toUTCString();
    
    // Strip frontmatter from content for description
    const description = escapeXml(post.summary || post.content.slice(0, 300) + '...');
    
    return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${post.summary}]]></description>
      <author>${AUTHOR_EMAIL} (${AUTHOR_NAME})</author>
      ${post.tags.map((tag) => `      <category>${escapeXml(tag)}</category>`).join('\n')}
    </item>`;
  }).join('\n');
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title><![CDATA[${SITE_TITLE}]]></title>
    <link>${BASE_URL}</link>
    <description><![CDATA[${SITE_DESCRIPTION}]]></description>
    <language>en-US</language>
    <lastBuildDate>${latestDate}</lastBuildDate>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <managingEditor>${AUTHOR_EMAIL} (${AUTHOR_NAME})</managingEditor>
    <webMaster>${AUTHOR_EMAIL} (${AUTHOR_NAME})</webMaster>
    <copyright>Copyright ${new Date().getFullYear()} ${AUTHOR_NAME}</copyright>
    <ttl>60</ttl>
${items}
  </channel>
</rss>`;
}

async function main() {
  console.log('📡 Generating RSS feed...');
  
  const posts = getAllPosts();
  const rss = generateRSS(posts);
  
  fs.writeFileSync(path.join(OUT_DIR, 'rss.xml'), rss);
  
  console.log(`✅ Generated rss.xml with ${posts.length} posts`);
}

main().catch((err) => {
  console.error('💥 Error:', err);
  process.exit(1);
});
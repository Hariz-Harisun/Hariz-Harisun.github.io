// scripts/generate-sitemap.mjs
import fs from 'fs';
import path from 'path';

const OUT_DIR = 'out';
const BASE_URL = 'https://hariz-harisun.github.io';

const STATIC_ROUTES = [
  '',
  '/about',
  '/skills',
  '/work',
  '/blog',
  '/contact',
  '/resume',
];

async function getBlogPostSlugs() {
  const blogDir = path.join(OUT_DIR, 'blog');
  if (!fs.existsSync(blogDir)) return [];
  
  const entries = fs.readdirSync(blogDir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => `/blog/${entry.name}`);
}

async function getWorkSlugs() {
  const workDir = path.join(OUT_DIR, 'work');
  if (!fs.existsSync(workDir)) return [];
  
  const entries = fs.readdirSync(workDir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => `/work/${entry.name}`);
}

function generateSitemap(routes) {
  const today = new Date().toISOString().split('T')[0];
  
  const urls = routes.map((route) => {
    const url = route === '' ? BASE_URL : `${BASE_URL}${route}`;
    return `  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>`;
  }).join('\n');
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

function generateRobots() {
  return `# robots.txt for ${BASE_URL}
User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
`;
}

async function main() {
  console.log('🗺️  Generating sitemap.xml and robots.txt...');
  
  const blogRoutes = await getBlogPostSlugs();
  const workRoutes = await getWorkSlugs();
  
  const allRoutes = [
    ...STATIC_ROUTES,
    ...blogRoutes,
    ...workRoutes,
  ].sort();
  
  const sitemap = generateSitemap(allRoutes);
  const robots = generateRobots();
  
  fs.writeFileSync(path.join(OUT_DIR, 'sitemap.xml'), sitemap);
  fs.writeFileSync(path.join(OUT_DIR, 'robots.txt'), robots);
  
  console.log(`✅ Generated sitemap.xml with ${allRoutes.length} URLs`);
  console.log(`✅ Generated robots.txt`);
}

main().catch((err) => {
  console.error('💥 Error:', err);
  process.exit(1);
});
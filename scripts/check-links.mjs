// scripts/check-links.mjs
import fs from 'fs';
import path from 'path';

const OUT_DIR = 'out';
const BASE_URL = 'https://hariz-harisun.github.io';

function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      getAllHtmlFiles(fullPath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

function extractLinks(html, basePath) {
  const links = [];
  
  // Anchor tags
  const anchorRegex = /<a\s+[^>]*href=["']([^"']+)["'][^>]*>/gi;
  let match;
  while ((match = anchorRegex.exec(html)) !== null) {
    links.push({ href: match[1], type: 'anchor' });
  }
  
  // Link tags (canonical, etc.)
  const linkRegex = /<link\s+[^>]*href=["']([^"']+)["'][^>]*>/gi;
  while ((match = linkRegex.exec(html)) !== null) {
    links.push({ href: match[1], type: 'link' });
  }
  
  // Image tags
  const imgRegex = /<img\s+[^>]*src=["']([^"']+)["'][^>]*>/gi;
  while ((match = imgRegex.exec(html)) !== null) {
    links.push({ href: match[1], type: 'image' });
  }
  
  // Script tags
  const scriptRegex = /<script\s+[^>]*src=["']([^"']+)["'][^>]*>/gi;
  while ((match = scriptRegex.exec(html)) !== null) {
    links.push({ href: match[1], type: 'script' });
  }
  
  return links;
}

function resolveUrl(href, fromFile) {
  // Strip query strings and fragments for file resolution
  const cleanHref = href.split('?')[0].split('#')[0];
  
  // Skip external URLs, mailto, tel, anchors
  if (cleanHref.startsWith('http://') || cleanHref.startsWith('https://') || 
      cleanHref.startsWith('mailto:') || cleanHref.startsWith('tel:') ||
      cleanHref.startsWith('#') || cleanHref.startsWith('data:')) {
    return { url: href, isExternal: true };
  }

  // Handle absolute paths (from root) - check local filesystem
  if (cleanHref.startsWith('/')) {
    // Remove leading slash and resolve relative to OUT_DIR
    const localPath = path.join(OUT_DIR, cleanHref.replace(/^\//, ''));
    return { url: href, isExternal: false, localPath };
  }

  // Relative paths
  const fromDir = path.dirname(fromFile);
  const resolved = path.resolve(fromDir, cleanHref);
  const relativeToOut = path.relative(OUT_DIR, resolved);

  if (relativeToOut.startsWith('..')) {
    return { url: href, isExternal: false, broken: true, reason: 'Points outside output directory' };
  }

  return { url: href, isExternal: false, localPath: resolved };
}

function checkFileExists(localPath) {
  if (!localPath) return false;
  // For directories, check for index.html
  if (fs.existsSync(localPath)) {
    const stat = fs.statSync(localPath);
    if (stat.isDirectory()) {
      return fs.existsSync(path.join(localPath, 'index.html'));
    }
    return true;
  }
  // Try with .html extension
  if (fs.existsSync(localPath + '.html')) return true;
  // Try with /index.html
  if (fs.existsSync(path.join(localPath, 'index.html'))) return true;
  return false;
}

async function main() {
  console.log('🔍 Checking links in', OUT_DIR, '...\n');
  
  if (!fs.existsSync(OUT_DIR)) {
    console.error('❌ Output directory not found. Run `npm run build` first.');
    process.exit(1);
  }
  
  const htmlFiles = getAllHtmlFiles(OUT_DIR);
  console.log(`📄 Found ${htmlFiles.length} HTML files\n`);
  
  let totalLinks = 0;
  let brokenLinks = [];
  let externalLinks = 0;
  
  for (const file of htmlFiles) {
    const html = fs.readFileSync(file, 'utf8');
    const links = extractLinks(html, file);
    const relativeFile = path.relative(OUT_DIR, file);
    
    for (const link of links) {
      totalLinks++;
      const resolved = resolveUrl(link.href, file);
      
      if (resolved.isExternal) {
        externalLinks++;
        continue;
      }
      
      if (resolved.broken || !checkFileExists(resolved.localPath)) {
        brokenLinks.push({
          file: relativeFile,
          href: link.href,
          resolved: resolved.url,
          type: link.type,
          reason: resolved.reason || 'File not found',
        });
      }
    }
  }
  
  // Summary
  console.log('📊 Summary:');
  console.log(`   Total links checked: ${totalLinks}`);
  console.log(`   External links (skipped): ${externalLinks}`);
  console.log(`   Internal links checked: ${totalLinks - externalLinks}`);
  console.log(`   Broken links: ${brokenLinks.length}`);
  
  if (brokenLinks.length > 0) {
    console.log('\n❌ Broken links found:\n');
    for (const broken of brokenLinks) {
      console.log(`   📄 ${broken.file}`);
      console.log(`      Type: ${broken.type}`);
      console.log(`      Href: ${broken.href}`);
      console.log(`      Resolved: ${broken.resolved}`);
      console.log(`      Reason: ${broken.reason}`);
      console.log('');
    }
    process.exit(1);
  } else {
    console.log('\n✅ All internal links OK!');
    process.exit(0);
  }
}

main().catch((err) => {
  console.error('💥 Error:', err);
  process.exit(1);
});
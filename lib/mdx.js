// lib/mdx.js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export function getPostSlugs() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  return fs.readdirSync(postsDirectory)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
}

export async function getPostBySlug(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content: rawContent } = matter(fileContents);
  
  const { content: mdxContent } = await compileMDX({
    source: rawContent,
    components: {},
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'wrap' }],
          [rehypePrettyCode, {
            theme: 'github-dark',
            keepBackground: true,
            onVisitLine(node) {
              if (node.children.length === 0) {
                node.children = [{ type: 'text', value: ' ' }];
              }
            },
            onVisitHighlightedLine(node) {
              node.properties.className.push('highlighted');
            },
            onVisitHighlightedWord(node) {
              node.properties.className = ['highlighted-word'];
            },
          }],
        ],
      },
    },
  });
  
  return {
    slug,
    frontmatter: data,
    content: mdxContent,
    rawContent,
  };
}

export async function getAllPosts() {
  const slugs = getPostSlugs();
  const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug)));
  return posts
    .filter((post) => post && post.frontmatter.draft !== true)
    .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));
}

export function getAllTags(posts) {
  const tags = new Set();
  posts.forEach((post) => {
    if (post.frontmatter.tags) {
      post.frontmatter.tags.forEach((tag) => tags.add(tag));
    }
  });
  return Array.from(tags).sort();
}

export function getPostsByTag(posts, tag) {
  return posts.filter((post) => post.frontmatter.tags?.includes(tag));
}
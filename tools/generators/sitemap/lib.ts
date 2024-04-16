import { ChangeFreq, Priority } from './sitemap.type';

export const sitemapFileTemplate = (entries: string) => {
  const str1 = '<?xml version="1.0" encoding="UTF-8"?>';
  const str2 = `<urlset
xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${entries}
</urlset>`;
  return str1.concat('', str2);
};
export const pageEntryTemplate = (
  pageLink: string,
  updatesAt: string,
  changeFreq: ChangeFreq = 'daily',
  priority: Priority = '0.5'
) => {
  const tags = `
    <url>
        <loc>${pageLink}</loc>
        <changefreq>${changeFreq}</changefreq>
        <priority>${priority}</priority>
        <lastmod>${updatesAt}</lastmod>
    </url>
    `.replace(/\s\s+/g, ' ');
  return tags;
};

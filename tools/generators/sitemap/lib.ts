import { ChangeFreq, Priority } from './sitemap.type';

export const sitemapFileTemplate = (entries: string) => {
  return `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset
	    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${entries}
    </urlset>
    `;
};
export const pageEntryTemplate = (
  pageLink: string,
  updatesAt: string,
  changeFreq: ChangeFreq = 'daily',
  priority: Priority = '0.5'
) => {
  return `
    <url>
        <loc>${pageLink}</loc>
        <changeFreq>${changeFreq}</changeFreq>
        <priority>${priority}</priority>
        <lastmod>${updatesAt}</lastmod>
    </url>
    `;
};

import { writeFileSync } from 'fs';
import { formatDate } from '../../utils/date.util';
import { pageEntryTemplate, sitemapFileTemplate } from './lib';
import * as minimist from 'minimist';
const argv = minimist(process.argv.slice(2));
const outputPath = argv['_']?.[0] || './sitemap.xml';
const site = 'https://clutterfreefinds.com';
const main = async () => {
  const websiteEntriesHighPriority = [
    `${site}`,
    `${site}/services`,
    `${site}/mess-vs-yess`,
    `${site}/about`,
  ].map((item) =>
    pageEntryTemplate(item, formatDate(new Date()), 'daily', '1.0')
  );

  const websiteEntriesMediumPriority = [
    `${site}/how-it-works`,
    `${site}/pricing`,
    `${site}/resources`,
    `${site}/privacy-policy`,
    `${site}/service-agreement`,
    `${site}/instant-quote`,
  ].map((item) =>
    pageEntryTemplate(item, formatDate(new Date()), 'daily', '0.8')
  );
  const AllEntries = [
    ...websiteEntriesHighPriority,
    ...websiteEntriesMediumPriority,
  ];
  writeFileSync(outputPath, sitemapFileTemplate(AllEntries.join('')));
};

main().catch((e) => console.log(e));

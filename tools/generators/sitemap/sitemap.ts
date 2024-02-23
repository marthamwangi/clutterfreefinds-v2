import { writeFileSync } from 'fs';
import { formatDate } from '../../utils/date.util';
import { pageEntryTemplate, sitemapFileTemplate } from './lib';
import * as minimist from 'minimist';
const argv = minimist(process.argv.slice(2));
const outputPath = argv['_']?.[0] || './sitemap.xml';
const main = async () => {
  const websiteEntriesHighPriority = [
    'https://clutterfreefinds.com',
    'https://clutterfreefinds.com/services',
    'https://clutterfreefinds.com/mess-vs-yess',
    'https://clutterfreefinds.com/about',
  ].map((item) =>
    pageEntryTemplate(item, formatDate(new Date()), 'daily', '1.0')
  );

  const websiteEntriesMediumPriority = [
    'https://clutterfreefinds.com/pricing',
    'https://clutterfreefinds.com/privacy-policy',
    'https://clutterfreefinds.com/service-agreement',
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

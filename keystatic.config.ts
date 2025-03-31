import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    // kind: 'local',
    kind: 'github',
    repo: {
      owner: 'mceryak',
      name: 'haa-astro'
    }
  },
  collections: {
    posts: collection({
      label: 'Metadata',
      slugField: 'id',
      columns: ['value'],
      path: 'src/content/metadata/*',
      format: { data: 'json' },
      schema: {
        id: fields.slug({ name: { label: 'ID', description: 'Do not change the id or the auto-generated slug', validation: { isRequired: true } } }),
        value: fields.text({ label: 'Value', validation: { isRequired: true } })
      },
    }),
  },
});
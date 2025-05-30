import withMarkdoc from '@markdoc/next.js'

import withSearch from './src/markdoc/search.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'ts', 'tsx'],
  images: { unoptimized: true },
  basePath: '/braid-docs',
  output: 'export',
  env: {
    NEXT_PUBLIC_SITE_PASSWORD: process.env.SITE_PASSWORD,
  },
}

export default withSearch(
  withMarkdoc({ schemaPath: './src/markdoc' })(nextConfig),
)

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@config': './src/config',
        '@schema': './src/schema',
        '@resolvers': './src/resolvers',
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}

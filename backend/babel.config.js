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
        '@controller': './controller',
        '@model': './model'
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}

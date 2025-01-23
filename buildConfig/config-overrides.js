const { override, addWebpackAlias, addLessLoader, adjustStyleLoaders } = require('customize-cra');
const path = require('path');

module.exports = override(
  addLessLoader({
    lessOptions: {
      // 如果需要，可以在这里添加 LESS 的选项
      javascriptEnabled: true,
      modifyVars: { '@primary-color': '#1DA57A' } // 例如，修改主题颜色
    }
  }),
  // ↓加了这么个配置
  adjustStyleLoaders(({ use: [, , postcss] }) => {
    const postcssOptions = postcss.options;
    postcss.options = { postcssOptions };
  }),
  addWebpackAlias({
    // '@components': path.resolve(__dirname, 'src/components/'),
    '@': path.resolve(__dirname, '../src')
  })
);

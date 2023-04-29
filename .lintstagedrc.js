const path = require('path');

const buildEslintCommand = filenames =>
  `eslint --fix ${filenames
    .map(f => path.relative(process.cwd(), f))
    .join(' --fix ')}`;

module.exports = {
  '*.json': ['prettier --write'],
  '*.{js,jsx,ts,tsx}': ['prettier --write', buildEslintCommand],
};

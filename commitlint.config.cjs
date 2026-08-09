module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // fix = Correção, feat = Nova função, refactor/perf/style = Melhoria
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'refactor', 'perf', 'style', 'docs', 'test', 'chore', 'ci'],
    ],
  },
};

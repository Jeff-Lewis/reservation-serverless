module.exports = function (wallaby) {
  return {
    files: [
      'src/**/*.ts',
      'src/**/*.graphql'
    ],
    tests: [
      'test/**/*.ts'
    ],
    env: {
      type: 'node',
      runner: 'node'
    },
    compilers: {
      '**/*.js': wallaby.compilers.babel({
        // Tell Wallaby to use Ava's Babel preset, necessary if your project doesn't use Babel otherwise.
        presets: ['@ava/babel-preset-stage-4']
      })
    },
    testFramework: 'ava',
    debug: true
  };
};

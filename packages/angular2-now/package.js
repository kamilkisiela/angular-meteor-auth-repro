Package.describe({
  name: 'pbastowski:angular2-now',
  version: '1.1.6',
  summary: 'Angular 2 @Component syntax for Meteor 1.2 and AngularJS',
  git: 'https://github.com/pbastowski/angular2-now.git',
  documentation: 'README.md'
});

Npm.depends({
  'angular2-now': '1.1.6'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.1');
  api.use('angular@1.3.4', 'client');

  api.addFiles([
    '.npm/package/node_modules/angular2-now/dist/angular2-now.js',
    'exports.js'
  ], 'client', {
    transpile: false
  });

  api.export(['angular2now']);
});

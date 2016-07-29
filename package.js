/* eslint-disable */
Package.describe({
  name: 'pushplaybang:offensive',
  version: '0.0.4',
  summary: 'Simple client side validation for any form using collection2',
  git: '#',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3.5');
  api.use('aldeed:collection2@2.9.1', {weak: true});
  api.use([
    'blaze-html-templates',
    'standard-minifier-css',
    'standard-minifier-js',
    'es5-shim',
    'ecmascript',
    'reactive-dict',
    'dburles:mongo-collection-instances@0.3.5',
    'pushplaybang:common-polyfills@0.0.1'
  ]);

  api.addFiles([
    'offensive.css',
    'templates.html',
    'helpers.js',
    'offensive.js'
  ], 'client');

  api.export('Offensive', 'client');
});



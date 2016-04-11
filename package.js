/* eslint-disable */
Package.describe({
  name: 'pushplaybang:offensive',
  version: '0.0.1',
  summary: 'Simple client side validation for any form using collection2',
  git: '#',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('blaze-html-templates');
  api.use('standard-minifier-css@1.0.5');
  api.use('standard-minifier-js@1.0.5');
  api.use('es5-shim');
  api.use('ecmascript');
  api.use('reactive-dict@1.1.6');
  api.use('pushplaybang:common-polyfills@0.0.1');
  api.addFiles('offensive.css', 'client');
  api.addFiles('templates.html', 'client');
  api.addFiles('helpers.js', 'client');
  api.addFiles('offensive.js', 'client');
  api.export('Offensive', 'client');
});



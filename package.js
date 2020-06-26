Package.describe({
  name: 'svelte:blaze-integration',
  version: '0.4.0',
  summary: 'Render Blaze templates inside your Svelte components and vice versa.',
  git: 'https://github.com/meteor-svelte/blaze-integration',
  documentation: 'README.md',
});

Package.onUse(function(api) {
  api.versionsFrom('1.4.1');
  api.use('ecmascript');
  api.use('blaze');
  api.use('templating');
  api.use('reactive-var');
  api.use('underscore@1.0.9');
  api.mainModule('index.js', 'client');
});

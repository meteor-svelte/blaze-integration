Package.describe({
  name: 'svelte:blaze-integration',
  version: '0.1.0',
  summary: 'Render Blaze templates inside your Svelte components.',
  git: 'https://github.com/meteor-svelte/blaze-integration',
  documentation: 'README.md',
});

Package.onUse(function(api) {
  api.versionsFrom('1.4.1');
  api.use('ecmascript');
  api.use('blaze');
  api.use('templating', {weak: true});
  api.use('reactive-var');
  api.mainModule('index.js', 'client');
});

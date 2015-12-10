Package.describe({
  name: 'brewhk:visits-tracker',
  version: '1.1.0',
  summary: 'A very simple visits tracker',
  git: 'https://github.com/brewhk/visits-tracker.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.use('mongo');
  api.use('aldeed:collection2@2.5.0');
  api.use('stevezhu:lodash@0.0.0 || 1.0.0 || 3.0.0');
  api.use(['templating'], 'client');
  api.addFiles('lib/functions.js');
  api.addFiles('lib/collections.js');
  api.addFiles('server/defaults.js', 'server');
  api.addFiles('server/startup.js', 'server');
  api.addFiles('server/collections.js', 'server');
  api.addFiles('server/publications.js', 'server');
  api.addFiles('server/visits-tracker.js', 'server');
  api.addFiles('client/visits-tracker.js', 'client');
  api.export('VisitsTracker', 'client');
  api.export('BrewCount');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('brewhk:visits-tracker');
  api.addFiles('visits-tracker-tests.js');
});

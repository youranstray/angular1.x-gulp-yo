module.exports = (function() {
    'use strict';

    // config vars
    var base = './app';
    var scripts = base + '/scripts';
    var assets = base + '/assets';
    var sass = assets + '/styles';
    var dist = 'www';
    
    var data = {
        browserSyncPort: 3000,
        // cordovaPath: 'cordova',
        // defaultPlatform: 'ios',
        excludedBowerComponents: ['es5-shim', 'json3'],
        base: base,
        mainFile: base + '/index.html',
        mainSassFile: sass + '/main.scss',
        routesFiles: base + '/scripts/_routes.js',
        e2eBaseUrl: 'http://localhost:3000/',
        styles: assets + '/styles/',
        stylesF: [
            assets + '/styles/**/_*.{scss,sass,less}',
            scripts + '/**/*.{scss,sass,less}'
        ],
        stylesAllF: [
            base + '/styles/**/*.{scss,sass,less}',
            scripts + '/**/*.{scss,sass,less}'
        ],
        scripts: base + '/scripts/',
        scriptsF: [
            // modules first
            base + '/scripts/**/_*.js',
            base + '/scripts/**/*.js',
            '!' + base + '/scripts/**/*.spec.js'
        ],
        scriptsAllF: base + '/scripts/**/*.js',
        scriptTestsF: base + '/scripts/**/*.spec.js',
        html: base + '/scripts/',
        htmlF: [
            base + '/scripts/**/*.html'
        ],
        images: assets + '/images/',
        imagesF: assets + '/images/**/*.*',
        fonts: assets + '/fonts/',
        fontsF: assets + '/fonts/**/*.*',
        translations: scripts + '/translations/',
        translationsF: scripts + '/translations/**/*.json',
        tmp: './.tmp',
        dist: dist,
        wwwDestination: '',
        karmaConf: './karma.conf.js',
        karmaConfE2E: './karma-e2e.conf.js',
        constantsDev: base + '/constants',
        constantsDist: dist + '/constants',
        envF: './_constants.env.json'
    };

    data.allHtmlF = data.htmlF.slice();
    data.allHtmlF.push(data.mainFile);

    return data;
})();

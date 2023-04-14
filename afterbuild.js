const fs = require('fs')
const Package = require('./package.json')

fs.unlinkSync('build/asset-manifest.json')
fs.rmSync('build/static', {recursive: true, force: true})
fs.renameSync('build/index.html', `build/Simul v${Package.version}.html`)
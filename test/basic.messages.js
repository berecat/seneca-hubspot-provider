const Pkg = require('../package.json')

module.exports = {
  print: false,
  pattern: 'sys:provider,provider:hubspot',
  allow: { missing: true },

  calls: [
    {
      pattern: 'get:info',
      out: {
        ok: true,
        name: 'hubspot',
        version: Pkg.version,
        sdk: {
          name: 'hubspot',
          version: Pkg.dependencies['hubspot'],
        }
      },
    }
  ]
}

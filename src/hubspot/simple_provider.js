const Seneca = require('seneca');

Seneca().quiet()
  .use('promisify')
  .use('entity')
  .use('provider', {
    provider: {
      hubspot: {
        keys: {
          accessToken: {
            value: ''
          },
        }
      }
    }
  })
  .use('hubspot-provider')
  .ready(async function() {
    const seneca = this

    // console.log('SDK:', seneca.export('HubspotProvider/sdk')())

    console.log(await seneca.post('sys:provider,provider:hubspot,get:info'))
    
    const list = await seneca.entity("provider/hubspot/company").list$()
    console.log(list)
    const repo = await seneca.entity("provider/hubspot/company").load$('id/type/name/city/state/description'); // customize properties you want to get from a given company e.g. "id/name/domain/description"

    // editing description examples
    // repo.properties.description = `Founded in ${repo.properties.city}...`
    // repo.save$();
    console.log('REPO DATA: ', repo);
  });

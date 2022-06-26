const Seneca = require('seneca');

Seneca({legacy: false})
  .test()
  .use('promisify')
  .use('entity')
  .use('env', {
    // debug: true,
    file: [__dirname + '/local-env.js;?'],
    var: {
      $HUBSPOT_ACCESS_TOKEN: String,
    }
  })
  .use('provider', {
    provider: {
      hubspot: {
        keys: {
          accessToken: {
            value: '$HUBSPOT_ACCESS_TOKEN'
          },
        }
      }
    }
  })
  .use('../')
  .ready(async function() {
    const seneca = this

    console.log('SDK:', seneca.export('HubspotProvider/sdk')())

    console.log(await seneca.post('sys:provider,provider:hubspot,get:info'))

    const list = await seneca.entity("provider/hubspot/company").list$()
    console.log(list)
    const company = await seneca.entity("provider/hubspot/company").load$('<id>/type/name/city/state/description'); // customize properties you want to get from a given company e.g. "id/name/domain/description"

    // editing description examples
    company.properties.description = `Founded in ${company.properties.city}...`
    await company.save$();
    console.log('COMPANY DATA: ', company);
   /*
   this.act('sys:provider,get:info,provider:hubspot', async(err, reply)=>{
           console.log(reply);
   }); 
   this.act('role:entity,base:hubspot,cmd:load,name:company,zone:provider', {q: {id: '<id>/state/city/description'}}, async(err, reply)=>{
           console.log(reply);
   });

   this.act('role:entity,base:hubspot,cmd:save,name:company,zone:provider', {ent: {id: '<id>', properties: {description: "<TEXT>"}}}, async(err, reply)=>{
           if(!err)
                   console.log(reply);
   });
    */
  });

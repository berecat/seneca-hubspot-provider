import * as Fs from 'fs'

const Seneca = require('seneca');
const SenecaMsgTest = require('seneca-msg-test');

import HubspotProvider from '../src/hubspot-provider'
import HubspotProviderDoc from '../src/HubspotProvider-doc'

const BasicMessages = require('./basic.messages.js');

// Only run some tests locally (not on Github Actions).
let Config = undefined
if (Fs.existsSync(__dirname + '/local-config.js')) {
  Config = require('./local-config')
}

describe('hubspot-provider', () => {
	test('happy', async ()=>{
		expect(HubspotProvider).toBeDefined();
		expect(HubspotProviderDoc).toBeDefined();
		const seneca = await makeSeneca();

		let sdk = seneca.export('HubspotProvider/sdk')()
		expect(sdk).toBeDefined()
		
		expect(await seneca.post('sys:provider,provider:hubspot,get:info')).toMatchObject({
			ok: true,
			name: 'hubspot',
		})

	});

	test('messages', async () => {
		const seneca = await makeSeneca()
		await (SenecaMsgTest(seneca, BasicMessages)())
	})

	test('company-basic', async () => {
		if(!Config) return;
		const seneca = await makeSeneca();

		const list = await seneca.entity('provider/hubspot/company').list$();
		expect(list.length > 0).toBeTruthy();

		const company0 = await seneca.entity('provider/hubspot/company')
				.load$(Config.company0.id);
		expect(company0.properties.name).toEqual('MyCompany');

		company0.properties.description = "Value: " + Math.random();
		let company0r = await company0.save$();
		expect(company0r.id).toEqual(company0.id);
		expect(company0r.properties.description).toEqual(company0.properties.description);

		const company0u = await seneca.entity("provider/hubspot/company")
						.load$(Config.company0.id)
    		expect(company0u.properties.name).toEqual('MyCompany');
    		expect(company0u.properties.description).toEqual(company0u.properties.description);
	});
});

async function makeSeneca() {
  const seneca = Seneca({ legacy: false })
    .test()
    .use('promisify')
    .use('entity')
    .use('env', {
      // debug: true,
      file: [__dirname + '/local-env.js;?'],
      var: {
	$HUBSPOT_ACCESS_TOKEN: String
      }
    })
    .use('provider', {
      provider: {
        hubspot: {
          keys: {
            accessToken: { value: '$HUBSPOT_ACCESS_TOKEN' }
          }
        }
      }
    })
    .use(HubspotProvider)

  return seneca.ready()
}

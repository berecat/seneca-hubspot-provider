const hubspot = require('@hubspot/api-client');

async function load(client, id, {properties, propertiesWithHistory, associations, archived, idProperty}){ // GET - load a company
        try {
          const apiResponse = await client.crm.companies.basicApi.getById(id, properties, propertiesWithHistory, associations, archived, idProperty);
          return apiResponse;
        } catch (e) {
          if(e.message === 'HTTP request failed'){
                throw JSON.stringify(e.response, null, 2);
          }else{
                throw e;
          }
        }
};

async function edit_desc(client, id, {description, idProperty}){ // PATCH - edit the description of a company
        const apiResponse = await client.crm.companies.basicApi.update(id, {properties: {description}}, idProperty);
        return 'success';
};

function HubspotProvider(options) {
	const seneca = this;

	const entityBuilder = this.export('provider/entityBuilder');

	seneca.message('sys:provider,provider:hubspot,get:info', get_info)
	async function get_info(_msg) {
		return {
			ok: true,
			name: 'hubspot',
			version: '', // Pkg.version,
			sdk: {
				name: 'hubspot-node',
				version: '', // Pkg.dependencies['hubspot'],
			}
		}
	}
	entityBuilder(this, {
	  provider: {
		  name: 'hubspot'
	  },
	  entity: {
		  company: {
			  cmd: {
				  list: {
					  action: async function(entize, msg) {
						  let res = (await this.shared.sdk.crm.companies.basicApi.getPage(10, undefined, undefined, undefined, undefined, false)).results;
						  let _list = res.map((data) => entize(data))
						  return _list;
					  }
				  },
				  load: {
					  action: async function(entize, msg) {
						  let data = (msg.q.id.split('/'));
						  let id = data[0];
						  data = data.slice(1);
						  let obj = await load(this.shared.sdk, id, {properties: data.length != 0 ? data : undefined});
						  return entize(obj);
					  }
				  },
				  save: {
					  action: async function(entize, msg) {
						  let ent = msg.ent;
						  let id = ent.id;
						  let desc = ent.properties.description;
						  await edit_desc(this.shared.sdk, id, {description: desc});
					  }
				  }
			  }
		  }
	  }
	  })








	this.prepare(async function() {
		let accTok = await this.post('sys:provider,get:key,provider:hubspot,key:accessToken');
		if (!accTok.ok) {
			this.fail('api-key-missing');
		 }
		this.shared.sdk = new hubspot.Client({accessToken: accTok.value});
	})

	return{
	 	exports: {
		 	sdK: () => this.shared.sk
	 	}
	}
} 

if ('undefined' !== typeof (module)) {
  module.exports = HubspotProvider;
}

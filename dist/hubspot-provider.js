"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Pkg = require('../package.json');
const Hubspot = require('@hubspot/api-client');

function HubspotProvider(options) {
    const seneca = this;
    const entityBuilder = this.export('provider/entityBuilder');
    seneca.message('sys:provider,provider:hubspot,get:info', get_info);
    async function get_info(_msg) {
        return {
            ok: true,
            name: 'hubspot',
            version: Pkg.version,
            sdk: {
                name: 'hubspot',
                version: Pkg.dependencies['hubspot'],
            }
        };
    }
    entityBuilder(this, {
        provider: {
            name: 'hubspot'
        },
        entity: {
            company: {
                cmd: {
                    list: {
                        action: async function (entize, msg) {
				const limit = msg.q.limit || 10; // The maximum number of results to display per page
				let res = (await this.shared.sdk.crm.companies.basicApi.getPage(limit)).results;
				let list = res.map((data) => entize(data))
				return list;
                        }
                    },
                    load: {
                        action: async function (entize, msg) {
				let idParts = msg.q.id.split('/');
				let id = idParts[0];
				idParts = idParts.slice(1);
				let obj = await this.shared.sdk.crm.companies.basicApi.getById(id, idParts.length != 0 ? idParts : undefined); // docs for the usage: https://developers.hubspot.com/docs/api/crm/companies
				return entize(obj);
                        }
                    },
                    save: {
                        action: async function (entize, msg) {
				let ent = msg.ent;
				let id = ent.id;
				let desc = ent.properties.description;
				let obj;
				try{
					obj = await this.shared.sdk.crm.companies.basicApi.update(id, {properties: {description: desc}});
				}catch(err){
					if(err.code >= 400 && err.code < 500)
						return null;
					throw err;
				}
				return entize(obj);
                        }
                    }
                }
            }
        }
    });
    this.prepare(async function () {
        let accTok = await this.post('sys:provider,get:key,provider:hubspot,key:accessToken');
        if (!accTok.ok) {
            this.fail('api-key-missing');
        }
        this.shared.sdk = new Hubspot.Client({ accessToken: accTok.value });
    });
    return {
        exports: {
            sdk: () => this.shared.sdk
        }
    };
}
const defaults = {
    debug: false
};
Object.assign(HubspotProvider, { defaults });
exports.default = HubspotProvider;
if (typeof (module) !== 'undefined') {
    module.exports = HubspotProvider;
}
//# sourceMappingURL=hubspot-provider.js.map

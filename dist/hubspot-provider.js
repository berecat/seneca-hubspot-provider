"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Pkg = require('../package.json');
const hubspot = require('@hubspot/api-client');

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
                name: 'hubspot-node',
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
				let res, list;
				res = (await this.shared.sdk.crm.companies.basicApi.getPage(10)).results;
				list = res.map((data) => entize(data))
				return list;
                        }
                    },
                    load: {
                        action: async function (entize, msg) {
				let data = (msg.q.id.split('/'));
				let id = data[0];
				let obj = {};
				data = data.slice(1);
				try{
					obj = await this.shared.sdk.crm.companies.basicApi.getById(id, data.length != 0 ? data : undefined);
				}catch(err){
					if(err.code >= 400 && err.code < 500)
						return null;
					throw err;
				}
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
        this.shared.sdk = new hubspot.Client({ accessToken: accTok.value });
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

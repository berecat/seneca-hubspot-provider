const hubspot = require('@hubspot/api-client');

const ACCESS_TOKEN = '';

const hubspotClient = new hubspot.Client({ accessToken: ACCESS_TOKEN });

async function list(){ 
        const response = await hubspotClient.apiRequest({
                method: 'get',
                path: '/crm/v3/objects/companies/',
        })

        return (await response.json()).results;
}

async function load(id){
        let _list = await list();
        for(let i of _list)
                if(i.id === id)
                        return i;
}


// list();

/*

const hubspot = require('@hubspot/api-client');

(async()=>{ // GET list
        const hubspotClient = new hubspot.Client({accessToken: ''});
        const [limit, after, properties, propertiesWithHistory, associations, archived] = [10, undefined, undefined, undefined, undefined, false];
        try {
          const apiResponse = await hubspotClient.crm.companies.basicApi.getPage(limit, after, properties, propertiesWithHistory, associations, archived);
          console.log(apiResponse.results); // apiResponse.results instanceof Array
        } catch (e) {
          e.message === 'HTTP request failed'
                ? console.error(JSON.stringify(e.response, null, 2))
                : console.error(e)
}
})

const hubspot = require('@hubspot/api-client');

const hubspotClient = new hubspot.Client({accessToken:""});

async function load(client, id, {properties, propertiesWithHistory, associations, archived, idProperty}){
        try {
          const apiResponse = await client.crm.companies.basicApi.getById(id, properties, propertiesWithHistory, associations, archived, idProperty);
                return apiResponse;
        } catch (e) {
          let _e;
          e.message === 'HTTP request failed'
            ? _e = JSON.stringify(e.response, null, 2)
            : _e = e;
          throw _e;
        }
};

// load(hubspotClient, '', {properties: undefined, propertiesWithHistory: undefined, associations: undefined, archived: false, idProperty: undefined}).then(console.log); // complete example
load(hubspotClient, '', {properties: ['state', 'city']}).then(console.log); // "extended properties" example

*/

const hubspot = require('@hubspot/api-client');

function newClient({accessToken, apiKey}){
        if(accessToken && apiKey)
                throw "Specify only one method"; 
        if(accessToken)
                return new hubspot.Client({accessToken: accessToken});
        return new hubspot.Client({apiKey: apiKey});
}

const hubspotClient = newClient({accessToken: ''});

async function list(client, {limit = 10, after, properties, propertiesWithHistory, associations, archived}){ // GET list
        try {
          const apiResponse = await client.crm.companies.basicApi.getPage(limit, after, properties, propertiesWithHistory, associations, archived);
          return apiResponse.results; // apiResponse.results instanceof Array
        } catch (e) {
          if(e.message === 'HTTP request failed'){
                throw JSON.stringify(e.response, null, 2);
          }else{
                throw e;
          }
        }
}

async function load(client, id, {properties, propertiesWithHistory, associations, archived, idProperty}){ // GET load
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

// examples

list(hubspotClient, {properties: ['city', 'state', 'name', 'domain', 'type']}).then(console.log);

// load(hubspotClient, '', {properties: undefined, propertiesWithHistory: undefined, associations: undefined, archived: false, idProperty: undefined}).then(console.log); // complete example
load(hubspotClient, '', {properties: ['state', 'city']}).then(console.log); // "extended properties" example

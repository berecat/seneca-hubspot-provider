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

(async()=>{ // get
        const hubspotClient = new hubspot.Client({accessToken: ''});
        const [limit, after, properties, propertiesWithHistory, associations, archived] = [10, undefined, undefined, undefined, undefined, false];
        try {
          const apiResponse = await hubspotClient.crm.companies.basicApi.getPage(limit, after, properties, propertiesWithHistory, associations, archived);
  console.log(apiResponse.results);
        } catch (e) {
          e.message === 'HTTP request failed'
                ? console.error(JSON.stringify(e.response, null, 2))
                : console.error(e)
}
})

*/

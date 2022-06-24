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

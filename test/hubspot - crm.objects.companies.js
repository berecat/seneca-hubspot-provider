const hubspot = require('@hubspot/api-client');

const ACCESS_TOKEN = '';

const hubspotClient = new hubspot.Client({ accessToken: ACCESS_TOKEN });

async function s(){
        const response = await hubspotClient.apiRequest({
        method: 'get',
        path: '/crm/v3/objects/companies/',
        })

        const json = await response.json()
        console.log(json['results'])
}

// s();

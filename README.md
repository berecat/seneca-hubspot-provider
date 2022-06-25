![Seneca Hubspot-Provider](http://senecajs.org/files/assets/seneca-logo.png)

> _Seneca Hubspot-Provider_ is a plugin for [Seneca](http://senecajs.org)


Provides access to the Hubspot API using the Seneca *provider*
convention. Hubspot API entities are represented as Seneca entities so
that they can be accessed using the Seneca entity API and messages.


[![npm version](https://img.shields.io/npm/v/@seneca/trello-provider.svg)](https://npmjs.com/package/@seneca/trello-provider)
[![build](https://github.com/senecajs/seneca-trello-provider/actions/workflows/build.yml/badge.svg)](https://github.com/senecajs/seneca-trello-provider/actions/workflows/build.yml)
[![Coverage Status](https://coveralls.io/repos/github/senecajs/seneca-trello-provider/badge.svg?branch=main)](https://coveralls.io/github/senecajs/seneca-trello-provider?branch=main)
[![Known Vulnerabilities](https://snyk.io/test/github/senecajs/seneca-trello-provider/badge.svg)](https://snyk.io/test/github/senecajs/seneca-trello-provider)
[![DeepScan grade](https://deepscan.io/api/teams/5016/projects/19462/branches/505954/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=5016&pid=19462&bid=505954)
[![Maintainability](https://api.codeclimate.com/v1/badges/f76e83896b731bb5d609/maintainability)](https://codeclimate.com/github/senecajs/seneca-trello-provider/maintainability)


| ![Voxgig](https://www.voxgig.com/res/img/vgt01r.png) | This open source module is sponsored and supported by [Voxgig](https://www.voxgig.com). |
|---|---|


## Quick Example


```js

// Setup - get the key value (<SECRET>) separately from a vault or
// environment variable.
Seneca()
  .use('provider', {
    provider: {
      hubspot: {
        keys: {
          accessToken: {
            value: ''
          },
        }
      }
    }
  })
  .use('hubspot-provider')

let repo = await seneca.entity('provider/hubspot/company')
  .load$('id/type/name/city/state/description')

Console.log('COMPANY DATA', repo)

repo.description = 'New description'
repo = await repo.save$()

Console.log('UPDATED DATA', repo)

```

## Install

```sh
$ npm install @seneca/hubspot-provider
```



<!--START:options-->


## Options

* `debug` : boolean <i><small>false</small></i>


Set plugin options when loading with:
```js


seneca.use('TrelloProvider', { name: value, ... })


```


<small>Note: <code>foo.bar</code> in the list above means 
<code>{ foo: { bar: ... } }</code></small> 



<!--END:options-->

<!--START:action-list-->


## Action Patterns

* [role:entity,base:trello,cmd:load,name:repo,zone:provider](#-roleentitybasetrellocmdloadnamerepozoneprovider-)
* [role:entity,base:trello,cmd:save,name:repo,zone:provider](#-roleentitybasetrellocmdsavenamerepozoneprovider-)
* [sys:provider,get:info,provider:trello](#-sysprovidergetinfoprovidertrello-)


<!--END:action-list-->

<!--START:action-desc-->


## Action Descriptions

### &laquo; `role:entity,base:trello,cmd:load,name:repo,zone:provider` &raquo;

Load Trello repository data into an entity.



----------
### &laquo; `role:entity,base:trello,cmd:save,name:repo,zone:provider` &raquo;

Update Trello repository data from an entity.



----------
### &laquo; `sys:provider,get:info,provider:trello` &raquo;

Get information about the provider.



----------


<!--END:action-desc-->

/* Copyright © 2022 Seneca Project Contributors, MIT License. */

import * as Fs from 'fs'



const Seneca = require('seneca')
const SenecaMsgTest = require('seneca-msg-test')

import TrelloProvider from '../src/trello-provider'
import TrelloProviderDoc from '../src/TrelloProvider-doc'

const BasicMessages = require('./basic.messages.js')


// Only run some tests locally (not on Github Actions).
let Config = undefined
if (Fs.existsSync(__dirname + '/local-config.js')) {
  Config = require('./local-config')
}


describe('trello-provider', () => {

  test('happy', async () => {
    expect(TrelloProvider).toBeDefined()
    expect(TrelloProviderDoc).toBeDefined()

    const seneca = await makeSeneca()
    let sdk = seneca.export('TrelloProvider/sdk')()
    expect(sdk).toBeDefined()

    expect(await seneca.post('sys:provider,provider:trello,get:info'))
      .toMatchObject({
        ok: true,
        name: 'trello',
      })
  })


  test('messages', async () => {
    const seneca = await makeSeneca()
    await (SenecaMsgTest(seneca, BasicMessages)())
  })


  test('board-basic', async () => {
    if (!Config) return;
    const seneca = await makeSeneca()

    const list = await seneca.entity("provider/trello/board").list$()
    expect(list.length > 0).toBeTruthy()

    const board0 = await seneca.entity("provider/trello/board")
      .load$(Config.board0.id)
    expect(board0.name).toContain('Welcome Board')

    board0.desc = 'DESC:' + Math.random()
    let board0r = await board0.save$()
    expect(board0r.id).toEqual(board0.id)
    expect(board0r.desc).toEqual(board0.desc)

    const board0u = await seneca.entity("provider/trello/board")
      .load$(Config.board0.id)
    expect(board0u.name).toContain('Welcome Board')
    expect(board0u.desc).toEqual(board0r.desc)

  })


  /*
  test('card-load', async () => {
    if (!Config) return;
    const seneca = await makeSeneca()

    let card = await seneca.entity('provider/trello/card')
      .load$(Config.board0.id + "/" + Config.board0.card0.id)

    expect(card).toBeDefined()
    expect(card.id).toEqual(Config.board0.card0.id)
    expect(card.entity$).toBe('provider/trello/card')
  })
  */

  /*
  test('entity-save', async () => {
    if (!missingKeys) {
      const provider_options = {
        provider: {
          trello: {
            keys: {
              api: {
                value: CONFIG.key,
              },
              user: {
                value: CONFIG.token
              },
            }
          }
        }
      }
  
      const seneca = Seneca({ legacy: false })
        .test()
        .use('promisify')
        .use('entity')
        .use('provider', provider_options)
        .use(TrelloProvider)
  
      const cardAndBoardId = CONFIG.boardId + "/" + CONFIG.cardId
      let card = await seneca.entity('provider/trello/card')
        .load$(cardAndBoardId)
  
      expect(card).toBeDefined()
      card.desc = card.desc + 'M'
  
      card = await card.save$(CONFIG.cardId + `/desc/Teste`)
      expect(card).toBeDefined()
      expect(card.desc.endsWith('M')).toBeTruthy()
    }
  })
  */
})




async function makeSeneca() {
  const seneca = Seneca({ legacy: false })
    .test()
    .use('promisify')
    .use('entity')
    .use('env', {
      // debug: true,
      file: [__dirname + '/local-env.js;?'],
      var: {
        $TRELLO_APIKEY: String,
        $TRELLO_USERTOKEN: String,
      }
    })
    .use('provider', {
      provider: {
        trello: {
          keys: {
            apikey: { value: '$TRELLO_APIKEY' },
            usertoken: { value: '$TRELLO_USERTOKEN' },
          }
        }
      }
    })
    .use(TrelloProvider)

  return seneca.ready()
}


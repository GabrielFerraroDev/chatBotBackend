process.env.PORT = '3000'

import request from 'supertest'
import app from '../app/api'
import botRepository from '../app/repositories/botRepository'

describe('Test the /bots path', () => {
  beforeEach(async () => {
    await botRepository.create({
      name: 'test-bot',
      id: '36b9f842-ee97-11e8-9443-0242ac120002',
    })
  })

  afterEach(async () => {
    await botRepository.findByIdAndDelete(
      '36b9f842-ee97-11e8-9443-0242ac120002'
    )
  })
  afterAll(async () => {
    await botRepository.clearDatabase()
  })

  test('It should return all bots', async () => {
    const response = await request(app).get('/bots')
    expect(response.statusCode).toBe(200)
    expect(response.body.length).toBeGreaterThan(0)
  })

  test('It should create a bot', async () => {
    const response = await request(app)
      .post('/bots')
      .send({ name: 'test-bot-2', id: '36b9f842-ee97-11e8-9443-0242ac120003' })
    expect(response.statusCode).toBe(201)
    expect(response.body.name).toBe('test-bot-2')
  })

  test('It should update a bot', async () => {
    const response = await request(app)
      .put(`/bots/36b9f842-ee97-11e8-9443-0242ac120002`)
      .send({ name: 'test-bot-updated' })
    expect(response.statusCode).toBe(200)
    expect(response.body.name).toBe('test-bot-updated')
  })

  test('It should get a bot by id', async () => {
    const response = await request(app).get(
      '/bots/36b9f842-ee97-11e8-9443-0242ac120002'
    )
    expect(response.statusCode).toBe(200)
    expect(response.body.name).toBe('test-bot')
  })

  test('It should delete a bot', async () => {
    const response = await request(app).delete(
      '/bots/36b9f842-ee97-11e8-9443-0242ac120002'
    )
    expect(response.statusCode).toBe(204)
  })
})

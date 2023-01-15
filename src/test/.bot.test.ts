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
    expect(response.body.id).toBe('36b9f842-ee97-11e8-9443-0242ac120003')
  })

  test('It should update a bot', async () => {
    const response = await request(app)
      .put(`/bots/36b9f842-ee97-11e8-9443-0242ac120002`)
      .send({ name: 'test-bot-updated' })
    expect(response.statusCode).toBe(200)
    expect(response.body.name).toBe('test-bot-updated')
    expect(typeof response.body.id).toBe('string')
  })

  test('It should get a bot by id', async () => {
    const response = await request(app).get(
      '/bots/36b9f842-ee97-11e8-9443-0242ac120002'
    )
    expect(response.statusCode).toBe(200)
    expect(response.body.name).toBe('test-bot')
    expect(typeof response.body.id).toBe('string')
  })

  test('It should delete a bot', async () => {
    const response = await request(app).delete(
      '/bots/36b9f842-ee97-11e8-9443-0242ac120002'
    )
    expect(response.statusCode).toBe(204)
  })
  test('It should return a 400 error when trying to create a bot with a missing name', async () => {
    const response = await request(app)
      .post('/bots')
      .send({ id: '36b9f842-ee97-11e8-9443-0242ac120003' })
    expect(response.statusCode).toBe(400)
  })

  test('It should return a 400 error when trying to create a bot with a missing id', async () => {
    const response = await request(app)
      .post('/bots')
      .send({ name: 'test-bot-2' })
    expect(response.statusCode).toBe(400)
  })

  test('It should return a 404 error when trying to update a bot that does not exist', async () => {
    const response = await request(app)
      .put(`/bots/36b9f842-ee97-11e8-9443-0242ac120033`)
      .send({ name: 'test-bot-updated' })
    expect(response.statusCode).toBe(404)
    expect(response.body.message).toBe('Bot not found')
  })

  test('It should return a 404 error when trying to get a bot by id that does not exist', async () => {
    const response = await request(app).get(
      `/bots/36b9f842-ee97-11e8-9443-0242ac120033`
    )
    expect(response.statusCode).toBe(404)
    expect(response.body.message).toBe('Bot not found')
  })
  test('It should return a 404 error when trying to delete a bot that does not exist', async () => {
    const response = await request(app).delete(
      '/bots/36b9f842-ee97-11e8-9443-0242ac120099'
    )
    expect(response.statusCode).toBe(404)
    expect(response.body.message).toBe('Bot not found')
  })
})

process.env.PORT = '3001'

import request from 'supertest'
import app from '../app/api'
import messageRepository from '../app/repositories/messageRepository'

describe('Test the /messages path', () => {
  beforeEach(async () => {
    await messageRepository.create({
      id: '16edd3b3-3f75-40df-af07-2a3813a79ce9',
      conversationId: '7665ada8-3448-4acd-a1b7-d688e68fe9a1',
      timestamp: '2018-11-16T23:30:52.6917722Z',
      from: '36b9f842-ee97-11e8-9443-0242ac120002',
      to: '16edd3b3-3f75-40df-af07-2a3813a79ce9',
      text: 'Oi! Como posso te ajudar?',
    })
  })

  afterEach(async () => {
    await messageRepository.findByIdAndDelete(
      '16edd3b3-3f75-40df-af07-2a3813a79ce9'
    )
  })
  afterAll(async () => {
    await messageRepository.clearDatabase()
  })

  test('It should return all messages', async () => {
    const response = await request(app).get('/messages')
    expect(response.statusCode).toBe(200)
    expect(response.body.length).toBeGreaterThan(0)
  })

  test('It should create a message', async () => {
    const response = await request(app).post('/messages').send({
      id: '16edd3b3-3f75-40df-af07-2a3813a79ce0',
      conversationId: '7665ada8-3448-4acd-a1b7-d688e68fe9a2',
      from: '36b9f842-ee97-11e8-9443-0242ac120002',
      to: '16edd3b3-3f75-40df-af07-2a3813a79ce9',
      text: 'Oi! Gostaria de verificar seu saldo?',
    })
    expect(response.statusCode).toBe(201)
    expect(response.body.text).toBe('Oi! Gostaria de verificar seu saldo?')
    expect(response.body.id).toBe('16edd3b3-3f75-40df-af07-2a3813a79ce0')
    expect(response.body.conversationId).toBe(
      '7665ada8-3448-4acd-a1b7-d688e68fe9a2'
    )
    expect(response.body.from).toBe('36b9f842-ee97-11e8-9443-0242ac120002')
    expect(response.body.to).toBe('16edd3b3-3f75-40df-af07-2a3813a79ce9')
  })

  test('It should get a message by id', async () => {
    const response = await request(app).get(
      '/messages/16edd3b3-3f75-40df-af07-2a3813a79ce9'
    )
    expect(response.statusCode).toBe(200)
    expect(response.body.text).toBe('Oi! Como posso te ajudar?')
    expect(response.body.id).toBe('16edd3b3-3f75-40df-af07-2a3813a79ce9')
    expect(response.body.conversationId).toBe(
      '7665ada8-3448-4acd-a1b7-d688e68fe9a1'
    )
    expect(response.body.from).toBe('36b9f842-ee97-11e8-9443-0242ac120002')
    expect(response.body.to).toBe('16edd3b3-3f75-40df-af07-2a3813a79ce9')
  })

  test('It should get messages by conversationId', async () => {
    const response = await request(app).get(
      '/messages?conversationId=7665ada8-3448-4acd-a1b7-d688e68fe9a1'
    )
    expect(response.statusCode).toBe(200)
    expect(response.body.length).toBeGreaterThan(0)
  })
  test('It should return a 400 error when trying to create a message with a missing text', async () => {
    const response = await request(app).post('/messages').send({
      id: '16edd3b3-3f75-40df-af07-2a3813a79ce9',
      conversationId: '7665ada8-3448-4acd-a1b7-d688e68fe9a1',
      timestamp: '2018-11-16T23:30:52.6917722Z',
      from: '36b9f842-ee97-11e8-9443-0242ac120002',
      to: '16edd3b3-3f75-40df-af07-2a3813a79ce9',
    })
    expect(response.statusCode).toBe(400)
  })

  test('It should return a 400 error when trying to create a message with a missing conversationId', async () => {
    const response = await request(app).post('/messages').send({
      id: '16edd3b3-3f75-40df-af07-2a3813a79ce9',
      timestamp: '2018-11-16T23:30:52.6917722Z',
      from: '36b9f842-ee97-11e8-9443-0242ac120002',
      to: '16edd3b3-3f75-40df-af07-2a3813a79ce9',
    })
    expect(response.statusCode).toBe(400)
  })

  test('It should return a 404 error when trying to get a message by id that does not exist', async () => {
    const response = await request(app).get(
      `/messages/36b9f842-ee97-11e8-9443-0242ac120033`
    )
    expect(response.statusCode).toBe(404)
    expect(response.body.message).toBe('Message not found')
  })
})

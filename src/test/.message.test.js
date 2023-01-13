process.env.PORT = 3001

const request = require('supertest')
const app = require('../app/api')
const messageRepository = require('../app/repositories/messageRepository')
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
  })

  test('It should get a message by id', async () => {
    const response = await request(app).get(
      '/messages/16edd3b3-3f75-40df-af07-2a3813a79ce9'
    )
    expect(response.statusCode).toBe(200)
    expect(response.body.text).toBe('Oi! Como posso te ajudar?')
  })

  test('It should get messages by conversationId', async () => {
    const response = await request(app).get(
      '/messages?conversationId=7665ada8-3448-4acd-a1b7-d688e68fe9a1'
    )
    expect(response.statusCode).toBe(200)
    expect(response.body.length).toBeGreaterThan(0)
  })
})
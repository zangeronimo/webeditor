import { User } from '@models/User'
import axios from 'axios'

test('it should be ok', () => {
  const user = new User()

  user.name = 'Diego'

  expect(user.name).toEqual('Diego')
})

test('it shold be ok get /sayhello url', async () => {
  const result = await axios.get('http://localhost:4000/sayhello')

  // check de result status
  expect(result.status).toEqual(200)

  // check de result body is "Hello World 2.0"
  expect(result.data.message).toEqual('Hello World 2.0')
})

import axios from 'axios'

test('it shold be ok get sayhello query', async () => {
  const result = await axios({
    url: 'http://localhost:4000/',
    method: 'post',
    data: {
      query: `
        query {
          sayhello
        }
      `
    }
  });

  // check de result status
  expect(result.status).toEqual(200)

  // check de result body is "Hello World 2.0"
  expect(result.data.data.sayhello).toEqual("Hello World 2.0")
})

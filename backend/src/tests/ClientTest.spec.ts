import axios from 'axios'

test('it shold be ok Client list query', async () => {
  const result = await axios({
    url: 'http://localhost:4000/',
    method: 'post',
    data: {
      query: `
        query {
          webClients { id name }
        } 
      `
    }
  });

  // check the result status
  expect(result.status).toEqual(200);

  // check the result body a list of clients
  expect(result.data.data.webClients).toBeTruthy();
})

test('it shold be ok Client with id 1 query', async () => {
  const result = await axios({
    url: 'http://localhost:4000/',
    method: 'post',
    data: {
      query: `
        query {
          webClient (filter: {id: 1}) { id name }
        } 
      `
    }
  });

  // check the result status
  expect(result.status).toEqual(200);
  // check the result body a client with id = 1
  expect(result.data.data.webClient.id).toEqual('1');
})

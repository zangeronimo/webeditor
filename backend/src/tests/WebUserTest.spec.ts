import axios from 'axios'

test('it shold be ok webUsers list query', async () => {
  const result = await axios({
    url: 'http://localhost:4000/',
    method: 'post',
    data: {
      query: `
        query {
          webUsers { id name email }
        } 
      `
    }
  });

  // check the result status
  expect(result.status).toEqual(200);

  // check the result body a list of webUsers
  expect(result.data.data.webUsers).toBeTruthy();
})

test('it shold be ok webUser with id 1 query', async () => {
  const result = await axios({
    url: 'http://localhost:4000/',
    method: 'post',
    data: {
      query: `
        query {
          webUser (filter: {id: 1}) { id name email }
        } 
      `
    }
  });

  // check the result status
  expect(result.status).toEqual(200);
  // check the result body a webUser with id = 1
  expect(result.data.data.webUser.id).toEqual('1');
})

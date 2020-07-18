import axios from 'axios'

test('it shold be ok Rule list query', async () => {
  const result = await axios({
    url: 'http://localhost:4000/',
    method: 'post',
    data: {
      query: `
        query {
          webRules { id name }
        } 
      `
    }
  });

  // check the result status
  expect(result.status).toEqual(200);

  // check the result body a list of Rules
  expect(result.data.data.webRules).toBeTruthy();
})

test('it shold be ok Rule with id 1 query', async () => {
  const result = await axios({
    url: 'http://localhost:4000/',
    method: 'post',
    data: {
      query: `
        query {
          webRule (filter: {id: 1}) { id name }
        } 
      `
    }
  });

  // check the result status
  expect(result.status).toEqual(200);
  // check the result body a Rule with id = 1
  expect(result.data.data.webRule.id).toEqual('1');
})

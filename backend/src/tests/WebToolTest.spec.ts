import axios from 'axios'

test('it shold be ok Tool list query', async () => {
  const result = await axios({
    url: 'http://localhost:4000/',
    method: 'post',
    data: {
      query: `
        query {
          webTools { id name }
        } 
      `
    }
  });

  // check the result status
  expect(result.status).toEqual(200);

  // check the result body a list of tools
  expect(result.data.data.webTools).toBeTruthy();
})

test('it shold be ok Tool with id 1 query', async () => {
  const result = await axios({
    url: 'http://localhost:4000/',
    method: 'post',
    data: {
      query: `
        query {
          webTool (filter: {id: 1}) { id name }
        } 
      `
    }
  });

  // check the result status
  expect(result.status).toEqual(200);
  // check the result body a Tool with id = 1
  expect(result.data.data.webTool.id).toEqual('1');
})

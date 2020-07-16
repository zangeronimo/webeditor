import axios from 'axios'

test('it shold be ok Users list query', async () => {
  const result = await axios({
    url: 'http://localhost:4000/',
    method: 'post',
    data: {
      query: `
        query {
          users { id name email }
        } 
      `
    }
  });

  // check the result status
  expect(result.status).toEqual(200);

  // check the result body a list of users
  expect(result.data.data.users).toBeTruthy();
})

test('it shold be ok User with id 1 query', async () => {
  const result = await axios({
    url: 'http://localhost:4000/',
    method: 'post',
    data: {
      query: `
        query {
          user (filter: {id: 1}) { id name email }
        } 
      `
    }
  });

  // check the result status
  expect(result.status).toEqual(200);
  // check the result body a user with id = 1
  expect(result.data.data.user.id).toEqual('1');
})

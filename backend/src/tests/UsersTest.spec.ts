import axios from 'axios'

test('it shold be ok add user with id 1', async () => {
  const result = await axios({
    url: 'http://localhost:4000/',
    method: 'post',
    data: {
      query: `
        mutation createUser ($name: String!, $email: String!) { 
          createUser(name: $name, email: $email,) {id name email}
        }
      `,
      variables: {
        name: "Luciano Zangeronimo",
        email: "zangeronimo@gmail.com",
      },
    }
  });

  // // check the result status
  expect(result.status).toEqual(200);

  // // check the result body a user with id = 1
  expect(result.data.data.createUser.email).toEqual('zangeronimo@gmail.com');
})

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
          user (id: 1) { id name email }
        } 
      `
    }
  });

  // check the result status
  expect(result.status).toEqual(200);

  // check the result body a user with id = 1
  expect(result.data.data.user.id).toEqual('1');
})

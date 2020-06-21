import Auth from "@src/authentication/Auth";

test('it should be ok', () => {
  const auth = new Auth();

  auth.basicUser = '123';
  auth.basicPass = '123';

  expect(auth.checkBasicLogin()).toBe(true);
});

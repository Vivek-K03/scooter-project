const User = require('../src/User')
const testUser = new User("Rambo", "password", 17);

describe('Test User Class', () => {
    test('User is an object', () => {
        expect(typeof(testUser)).toBe("object");
    })
    test('Username is correct', () => {
        expect(testUser.username).toBe("Rambo");
    })
    test('Password is correct', () => {
        expect(testUser.password).toBe("password");
    })
    test('Age is correct', () => {
        expect(testUser.age).toBe(17);
    })
})


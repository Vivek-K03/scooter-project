const Scooter = require('../src/Scooter')
const User = require('../src/User')
const ScooterApp = require('../src/ScooterApp')
const testScooterApp = new ScooterApp()
const testUser = new User("Rambo", "password", 18)

describe('ScooterApp object', () => {
    test('ScooterApp is an object', () => {
        expect(typeof(testScooterApp)).toBe("object")
    })
    test('Stations is an object', () => {
        expect(typeof(testScooterApp.stations)).toBe("object")
    })
    test('Registered Users is an object', () => {
        expect(typeof(testScooterApp.registeredUsers)).toBe("object")
    })
    test('Sessions is an empty array', () => {
        expect(ScooterApp.sessions).toEqual([testScooterApp])
    })
})

describe('Test Scooter App Register Method', () => {
    test('Cant register when user exists', () => {
        testScooterApp.register(testUser)
        const spy = jest.spyOn(console, 'log');
        testScooterApp.register(testUser)
        expect(spy).toHaveBeenCalledWith("already exists")
    });
    test('Cannot register if under 18', () => {
        const newUser = new User("Rambo", "Password", 15)
        const spy = jest.spyOn(console, 'log');
        testScooterApp.register(newUser)
        expect(spy).toHaveBeenCalledWith("Too young to register")
    });
})

// register user

// log in

// add scooter

// remove scooter

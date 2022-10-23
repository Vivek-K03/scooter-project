const Scooter = require('../src/Scooter')
const User = require('../src/User')
const ScooterApp = require('../src/ScooterApp')


const testScooterApp = new ScooterApp();
const testUser = new User("Rambo", "password", 18);
const testUser2 = new User("John", "password21", 21);

let spy;
beforeEach(() => {
    spy = jest.spyOn(console, 'log');
})

afterEach(() => {
    spy.mockImplementation().mockClear();})

describe('ScooterApp object', () => {
    test('ScooterApp is an object', () => {
        expect(typeof(testScooterApp)).toBe("object");
    });
    test('Stations is an object', () => {
        expect(typeof(testScooterApp.stations)).toBe("object");
    });
    test('Registered Users is an object', () => {
        expect(typeof(testScooterApp.registeredUsers)).toBe("object");
    });
    test('Sessions is an empty array', () => {
        expect(ScooterApp.sessions).toEqual([testScooterApp]);
    });
})

describe('Scooter App Register Method', () => {
    test('Cant register when user exists', () => {
        testScooterApp.register(testUser);
        const spy = jest.spyOn(console, 'log');
        testScooterApp.register(testUser);
        expect(spy).toHaveBeenCalledWith("already exists");
    });
    test('Cannot register if under 18', () => {
        const newUser = new User("Rambo", "Password", 15)
        const spy = jest.spyOn(console, 'log');
        testScooterApp.register(newUser);
        expect(spy).toHaveBeenCalledWith("Too young to register");
    });
    test('Allows registration if details are valid', () => {
        testScooterApp.register(testUser2);
        const spy = jest.spyOn(console, 'log');
        expect(spy).toHaveBeenCalledWith("User has been registered");
    });
    test('User details are pushed to registered users when registered', () => {
        const user = new User("bob", "Password", 29);
        testScooterApp.registeredUsers = {};
        testScooterApp.register(user);
        expect(testScooterApp.registeredUsers[user.username]).toEqual({password: user.password,
            age: user.age,
            loggedIn: false,
            accountChange: 0});
    });
})

describe('Scooter App LogIn Method Test', () => {
    test('Logs in user when details are correct', () => {
        testScooterApp.register(testUser);
        const spy = jest.spyOn(console, 'log');
        spy.mockImplementation().mockClear();
        testScooterApp.logIn(testUser.username, testUser.password);
        expect(spy).toHaveBeenCalledWith("User has logged in successfully");
    });
    test('Doesnt log in when details are incorrect', () => {
        testScooterApp.register(new User("Smith", "Password", 19));
        testScooterApp.logIn("Steve", "Password20");
        expect(spy).toHaveBeenCalledWith("Username or password is incorrect");
    });
});

describe('Scooter App addScooter method test', () => {
    test('Adds the scooter to the location when details are correct', () => {
        let scooter = new Scooter("Manhattan", testUser);
        testScooterApp.addScooter("Queens", scooter);
        expect(spy).toHaveBeenCalledWith("Scooter has been added successfully.");
        expect(testScooterApp.stations["Queens"]).toContain(scooter);
    })
    test('Does not add scooter to location when location does not exist', () => {
        let scooter = new Scooter("Manhattan", testUser);
        testScooterApp.addScooter("London", scooter);
        expect(spy).toHaveBeenCalledWith("Cannot add Scooter, Location doesn't exist.");
    });
});

describe('Scooter App removeScooter Method', () => {
    test('Removes scooter when details are correct', () => {
        tempScooter = new Scooter("Bronx", testUser);
        testScooterApp.addScooter("Brooklyn", tempScooter);
        testScooterApp.removeScooter(tempScooter);
        expect(spy).toHaveBeenCalledWith("Scooter has successfully been removed");
    });
    test('Cannot remove scooter when details are wrong', () => {
        testScooterApp.removeScooter(tempScooter);
        expect(spy).toHaveBeenCalledWith("Cannot remove the scooter");
    });

});
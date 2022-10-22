const Scooter = require('../src/Scooter')
const User = require('../src/User')
const scooterUser = new User("Rambo", "Password1234", 21);
const testScooter = new Scooter("Manhattan", scooterUser);


describe('scooter object', () => {
  test('is an object', () => {
    expect(typeof(testScooter)).toEqual("object");
  })
  test('Returns the correct User', () => {
    expect(scooterUser.username).toBe("Rambo");
  })
  test('Returns the correct station', () => {
    expect(testScooter.station).toBe("Manhattan");
  })
  test('Serial property returns a random number between 1 and 1000', () => {
    expect(testScooter.serial).toBeGreaterThanOrEqual(1);
    expect(testScooter.serial).toBeLessThanOrEqual(1000);
  })
  test('Charge returns a random number between 1 and 100', () => {
    expect(testScooter.charge).toBeGreaterThanOrEqual(1);
    expect(testScooter.charge).toBeLessThanOrEqual(100);
  })
  test('Returns the correct Bool value for isBroken property', () => {
    expect(testScooter.isBroken).toBe(false)
  })
  test('Returns the correct Bool value for isDocked property', () => {
    expect(testScooter.isDocked).toBe(true)
  })
})

describe('Test Scooter Rent Method ', () => {
  const spy = jest.spyOn(console, 'log');
  test('Able to rent when charge is greater than 20', () => {
    testScooter.charge = 30;
    testScooter.isBroken = false;
    testScooter.rent();
    expect(spy).toHaveBeenCalledWith("Enjoy the ride");
  })
  test('Not able to rent when charge is less than 20', () => {
    testScooter.charge = 19;
    testScooter.isBroken = false;
    testScooter.rent();
    expect(spy).toHaveBeenCalledWith("Scooter low on battery, please charge.");
  })
  test('Not able to rent when broken', () => {
    testScooter.isBroken = true;
    testScooter.rent();
    expect(spy).toHaveBeenCalledWith("Scooter is broken, please send a repair request.");
  })

  describe('Test Scooter Dock Method', () => {
    test('Changes stations, isDocked changes to true and User returns and empty string', () => {
      testScooter.dock("Bronx");
      expect(testScooter.station).toBe("Bronx");
      expect(testScooter.isDocked).toBe(true);
      expect(testScooter.user).toBe("");
    })
  })

  describe('Test Scooter Recharge Method', () => {
    test('Sets scooter charge to 100', async () => {
      await testScooter.recharge()
      expect(testScooter.charge).toBe(100)
    });
  })

  describe('Test Scooter Recharge Method', () => {
    test('Testing isBroken turns false after repair and repair is being completed', async () => {
      const spy = jest.spyOn(console, 'log')
      await testScooter.requestRepair()
      expect(testScooter.isBroken).toBe(false)
      expect(spy).toHaveBeenCalledWith("Repair Complete")
    })
  })
})

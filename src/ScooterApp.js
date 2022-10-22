const User = require('./User')
const Scooter = require('./Scooter')

class ScooterApp {
  constructor() {
    this.stations = {
      Manhattan: [],
      Brooklyn: [],
      Queens: [],
      Bronx: [],
      Statenisland: []
    }
    this.registeredUsers = {};
    ScooterApp.sessions.push(this);
  }

  static sessions = [];

  register(user) {
    const existingUsers = Object.keys(this.registeredUsers)
    if (user.age < 18) {
      console.log("Too young to register");
    }
    else if (existingUsers.includes(user.username)) {
      console.log("already exists")
    } 
    else {
      const obj = {
        password: user.password,
        age: user.age,
        loggedIn: false,
        accountChange: 0
      };
      this.registeredUsers[user.username] = obj
      console.log('User has been registered');
    }
  }

  logIn(username, password) {
    if (this.registeredUsers.username === username && this.registeredUsers.password === password) {
      this.registeredUsers.username.loggedIn = true;
      console.log("User has logged in successfully");
    }
    else {
      console.log("Username or password is incorrect");
    }
  }

  addScooter(location, scooter) {
    scooter.station = location;
    if (Object.keys(this.stations).includes(location)){
      this.stations.location.push(scooter);
    }
    else {
      console.log("Cannot add Scooter, Location doesn't exist.");
    }
  }

  RemoveScooter(scooterToRemove) {
    let scooterSerial = scooterToRemove.serial;
    for (let key in this.stations) {
      for (let location of key) {
        if (location.serial === scooterSerial) {
          let indexOfLocation = this.stations[key].indexOf(location);
          this.stations[key].splice(indexOfLocation, 1);
          
        }
      }
    }


    
      
  }

}

module.exports = ScooterApp

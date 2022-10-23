class Scooter{
  constructor(Station, User) {
    this.station = Station;
    this.user = User;
    this.serial = Math.floor(Math.random() * 1000 + 1);
    this.charge = Math.floor(Math.random() * 100 + 1);
    this.isBroken = false;
    this.isDocked = true;
  }

  rent() {
    if (this.isBroken === false && this.charge >= 20) {
      this.isDocked = true;
      console.log("Enjoy the ride");
    } else if (this.isBroken === false && this.charge <= 20) {
        console.log("Scooter low on battery, please charge.");
    } else {
      console.log("Scooter is broken, please send a repair request.");
    }
  }

  dock(station) {
    if (typeof station === 'undefined') {
      throw new Error('Docking station required!');
    }
    else {
      this.station = station;
      this.isDocked = true;
      this.user = "";
    }

  }

  async recharge() {
    await new Promise(resolve => setTimeout(resolve, 2000));
    this.charge = 100;
  }

  async requestRepair() {
    await new Promise(resolve => setTimeout(resolve, 2000));
    this.isBroken = false;
    console.log("Repair Complete");
  }

}


module.exports = Scooter

const connection = require('../database/connection');

module.exports = function availabilityCheck(normal,dateStart,dateEnd,schedule,reservations){

  if(reservations.length == 0){
    return true;
  }
  
  //var data = new Date(dateStart);
  
  console.log(reservations);
  console.log(normal);
  console.log(dateStart);
  console.log(dateEnd);
  console.log(schedule);
  

  //disponivel
  return false;
}
const connection = require('../database/connection');

module.exports = function availabilityCheck(normal,dateStart,dateEnd,schedule,reservations){

  if(reservations.length == 0){
    return true;
  }
  
  var dataInput = new Date(dateStart);

  for(let i=0; i<reservations.length; i++){
    var data1 = new Date(reservations[i].dateStart);
    var data2 = new Date(reservations[i].dateEnd);
    //verificando se data esta entre duas
    if(data1==dataInput || dataInput<=data2){
      //horario de obj da vez
      let s1 = reservations[i].schedule.split(";");
      //verificar dia semana
      //pegar dia da semana de obj da vez
      let s1DayWeek = s1[0].split(",");
      //pegar dia da semana de reserva que esta querendo cadastrar
      let s2=schedule.split(";");
      let s2DayWeek = s2[0].split(",");

      for(let d=0; d<s1DayWeek.length; d++){
        //comparar arrays de dias da semanas e ver se tem dia igual se tiver verificar o horario
        if(s1DayWeek[d] == s2DayWeek[0]){
          //verificar hora
          let s1Time = s1[1].split(",");
          let s2Time = s2[1].split(",");
          //comparar arrays de hora
          for(let t=0; t<s1Time.length; t++){
            if(s1Time[t] == s2Time[0])
              return false;
          }
        }
      }  
    }
  }  
  //disponivel
  return true;
}
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const months = ["JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO", "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"];

exports.verifyTAG = functions.https.onRequest(async (req, res) => {
  // read query elements.
  const uid = req.query.uid;
  const sala = req.query.sala;
  console.log(uid, sala);

  //const doorlock_number = req.query.ln;
  const today = new Date()
  const hour = today.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false});
  const day = today.toDateString().split(' ')[2];
  const month = months[today.getMonth()];
  console.log(month, day, hour);

  //procura pelo numero da tag no documento tag
  admin.firestore().collection('RFID').where('uid', '==', uid).get().then(snapshot => {
    if(!snapshot.empty){
      if(snapshot.docs[0].get('type') === 'master'){
        //existe uma tag, se for master -> abre
        console.log('open'); //return 1
        res.json({openlock:`1`});
        return true;
      }

      //existe uma tag -> salva a referencia dela
      const uid_ref = snapshot.docs[0].ref;
      console.log('/' + uid_ref.path);
  
      //procura o usuário que referencia essa tag
      return admin.firestore().collection('USERS').where('RFID', '==', uid_ref).get()
      .then(snapshot2 => {

        if(!snapshot2.empty){
          //encontrou, então ele é unico -> salva a ref dele
          const user_ref = snapshot2.docs[0].ref;
          console.log(user_ref.path);

          //verifica a sala, ela é passado por query
          return admin.firestore().collection('SALAS').where('sala', '==', sala).get()
          .then(snapshot6 => {

            if(!snapshot6.empty){
              //encontrou a sala -> salva sua ref
              const sala_ref = snapshot6.docs[0].ref;
              console.log(sala_ref.path);
  
              //verifica o agendamento
              return admin.firestore().collection('SCHEDULE').where('MES', '==', month).get().then(snapshot3 => {
                if(!snapshot3.empty){
                  //se existir o mes -> procura o dia
                  return snapshot3.docs[0].ref.collection('MONTH_SCHED').where('DIA', '==', day).get().then(snapshot4 => {
                    if(!snapshot4.empty){
                      //se existir o dia -> procura no agendamento do dia
                      return snapshot4.docs[0].ref.collection('DAY_SCHED').where('USER', '==', user_ref).where('SALA', '==', sala_ref).get().then(snapshot5 =>{
                        if(!snapshot5.empty){
                          //se existir um agendamento com o usuario e a sala indicada -> verifica as horas
                          for(let i=0; i< snapshot5.size; i++){
                            //verifica os horarios
                            if( snapshot5.docs[i].get('HORA_INIT') <= hour && hour <= snapshot5.docs[i].get('HORA_FIM')){
                              //encontrou um agendamento que bate -> abre
                              console.log('ABRE');
                              res.json({openlock:`1`});
                              return true;
                            }
                          }
                          //nenhuma sala bateu -> nao abre
                          console.log('não abre');
                          res.json({openlock:`0`});
                          return false;
                        }
                          //nao existe agendamento para aquele dia -> nao abre
                          console.log('não abre');
                          res.json({openlock:`0`});
                          return false;
                      }).catch(err => {console.log(err)});
                    }
                      //nao existe dia
                      console.log('não abre');
                      res.json({openlock:`0`});
                      return false;
                  }).catch(err => {console.log(err)});
                }
                  //nao existe o mes
                  console.log('não abre');
                  res.json({openlock:`0`});
                  return false;
              }).catch(err => {console.log(err)});
            }
              //não encontrou aquela sala -> nao tem como abrir
              console.log('não abre');
              res.json({openlock:`0`});
              return false;
          }).catch(err => {console.log(err)});
        }
          //não encontrou nenhum -> nao abre
          console.log('não abre');
          res.json({openlock:`0`});
          return false;
      }).catch(err => {console.log(err)});
    }
    //se nao achou nenhum documento, tag nao cadastrada -> nao abre
    console.log('não abre'); //return 0
    res.json({openlock:`0`});
    return false;
  }).catch(err => {console.log(err)});
});

exports.getID = functions.https.onRequest(async (rec, res) => {
  admin.firestore().collection('CONFIGS').doc('11IiiejlgMDYxAcRzDO6').get().then(snapshot => {
    const ID = snapshot.get('ID');
    res.json({'ID':ID});
    return true;
  })
  .catch(err => {
    console.log(err);
  })
});

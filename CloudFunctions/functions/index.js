const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

days_week = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

exports.verifyUID = functions.https.onRequest(async (req, res) => {
  // read query elements.
  const uid = req.query.uid;
  //const doorlock_number = req.query.ln;
  const today = new Date()
  const hour = today.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false});
  const day = days_week[today.getDay()];
  console.log(hour);
  console.log(day);
  // find if UUID exist.
  admin.firestore().collection('PICC_UIDS').where("uid", "==", uid).get()
  .then(snapshot => {
    //uid exists ?
    if (!snapshot.empty){
      //is master ?
      if (snapshot.docs[0].data().type === 'master'){
        console.log('chave mestre -> open');
        res.json({openlock:`1`});
      }
      else{
        //se nao, pegar o id e o usuario
        const user = {id: snapshot.docs[0].id, data: snapshot.docs[0].data()};
        console.log(user);

        //nova query para verificar se tag normal pode abrir:
        admin.firestore().collection("Schedule").where("teacher", "==", user.id).get()
            .then(snapshot2 => {
              if(!snapshot2.empty){
                for(let i = 0; i < snapshot2.size; i++){
                  const data = snapshot2.docs[i].data()
                  //console.log(data);
                  if(data.days.includes(day) && data.hour_init <= hour && data.hour_end >= hour){
                    console.log("pode abrir");
                    res.json({openlock:`1`});
                    break;
                  }
                  else{
                    console.log("não pode abrir");
                    res.json({openlock:`0`});
                  }
                }
              }
              else {
                console.log("professor não existe");
                res.json({openlock:`0`});
              }
              return null
            })
            .catch(err2 => {
              console.log(err2);
              res.json({openlock:`0`});
            })
      }
    }
    else{
      console.log("user not found -> not open");
      res.json({openlock:`0`});
    }
    return null
  })
  .catch( err => {
    console.log(err);
    console.error("Error in adding document ", err);
    res.json({openlock:`0`});
  });
});


#include <SPI.h>
#include <MFRC522.h>
#include <Servo.h>

#define SS_PIN 15
#define RST_PIN 0

#define servoPin 2
#define closed 180
#define opened 0

MFRC522 rfid(SS_PIN, RST_PIN);
Servo servo;

uint32_t readID;
uint32_t knownID = 0x208929A4;

uint8_t sucess;

void setup()
{
  // Inicia a serial, SPI e RFID
  Serial.begin(115200);
  while(!Serial);

  Serial.println();
  Serial.println("Serial ligado!");
  
  SPI.begin();   
  rfid.PCD_Init();

  Serial.println("SPI e RFID module ligado!");

  //inicia o servo
  servo.attach(servoPin);
  servo.write(closed);

  Serial.println("ServoMotor Ligado!");
  
  Serial.println("Aproxime o seu cartao/TAG do leitor");
  Serial.println();
}

void loop(){
  readID = 0;
  
  if (!rfid.PICC_IsNewCardPresent())
    return;

  if (!rfid.PICC_ReadCardSerial())
    return;

  for(uint8_t i=0 ; i < rfid.uid.size ; i++)
    readID += ((uint32_t) rfid.uid.uidByte[i]) << 8*(rfid.uid.size-1-i);

  rfid.PICC_HaltA();
    
  Serial.print("TAG Encontrada! Codigo: ");
  Serial.println(readID, HEX);
 
  if(readID == knownID){
    openLock();
    delay(5000);
    closeLock();
  }
}

//Servo functions
void openLock(){
  servo.write(opened);
}

void closeLock(){
  servo.write(closed);
  delay(30);
}

//RFID functions
bool checkTwo(){   
  if (readID != knownID)
     return false;
  return true;  
}

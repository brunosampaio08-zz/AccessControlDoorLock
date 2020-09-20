/*****************************************
 * Alunos: Bruno Sampaio, Lucas Alvarenga, Lucas Vaz, Talita Ludmila, Vinicius Santiago
 * Unidade curricular: Projetos em Ecomp/Sistemas Embarcados PPGCC
 * 
 * Projeto: Controle de acesso -> doorlock
 * Microcontrolador: ESP8266MOD
 * Placa de desenvolvimento: NodeMCU 1.0
 * IDE Arduino: 1.8.13
 * SO: Linux MINT
 * 
 * Módulos: RFID RC522 MiFare
 *        :   TAGS: 0x208929A4 e 0xD3680F89
 *        : ServoMotor HK15168 Hobbyking
 *
 * Comunicação Firebase database por requisição HTTPS 
 *****************************************/

//Bibliotecas Para os atuadores e Sensores
#include <SPI.h>
#include <MFRC522.h>
#include <Servo.h>

//Bibliotecas para comunicação WIFI
#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ESP8266WiFiMulti.h>
#include <WiFiClientSecureBearSSL.h>
#include <WiFiClient.h>

//Defines Atuadores e Sensores
#define SS_PIN 15
#define RST_PIN 0

#define servoPin 2
#define closed 180
#define opened 0

//Defines Comunicação WIFI
#define SSID "GUILHERME 2GHZ"
#define PASSWD "dezvintetrinta"

//Construtores
ESP8266WiFiMulti WiFiMulti;

MFRC522 rfid(SS_PIN, RST_PIN);
Servo servo;

//Fingerprint necessario para autenticar o acesso ao servidor
const char fingerprint[] PROGMEM =  "5E 54 A0 41 6C A4 7D AD F6 C8 0F 1F FF 97 BB AB 84 63 50 B1";
String url = String("https://us-central1-acesscontrollockdoor.cloudfunctions.net/verifyUID?uid=");
String aux, payload;

//variaveis globais
uint32_t readID;
uint32_t knownID = 0x208929A4;

uint8_t sucess;

void setup()
{
  //Inicia a serial
  Serial.begin(115200);
    while(!Serial) 
      delay(1);
  Serial.println();
  Serial.println("Serial ligado!");
  
  //conecta na rede wifi
  WiFi.mode(WIFI_STA);
  WiFiMulti.addAP(SSID, PASSWD);
    while (WiFi.status() != WL_CONNECTED)
     delay(1);
  Serial.print("Wifi conectado! Endereço de IP: ");
  Serial.println(WiFi.localIP());

  //inicia a counicacao com o sensor
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

  aux = String(readID, HEX);
  aux.toUpperCase();
  //url.concat(aux);
  
  Serial.print("TAG Encontrada! Codigo: ");
  Serial.println(aux);
  
  Serial.print("URL de requisicao: ");
  Serial.println(url + aux);
  
  //comeco da comunicacao wifi
  if((WiFiMulti.run() != WL_CONNECTED)){
    Serial.println("WIFI nao esta conectado.");
    //posso colocar um led aqui indicando que nao deu certo
    delay(1000);
    return;
  }
    
  std::unique_ptr<BearSSL::WiFiClientSecure>client(new BearSSL::WiFiClientSecure);
  client->setFingerprint(fingerprint);
  Serial.println("fingerprint OK");

  HTTPClient http;

  if(http.begin(*client, url + aux)){
    Serial.println("comeco de requisicao OK");
  }

  int httpCode = http.GET();
  
  if(httpCode > 0){
    payload = http.getString();
    Serial.println(payload);
  }
  else{
    Serial.println("Falha na requisição");
  }

  http.end();
 
  if(payload[13] == '1'){
    openLock();
    delay(5000);
    closeLock();
  }
  payload.setCharAt(13, '0');
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

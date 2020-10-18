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
#include <EEPROM.h>

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

#define servoPin 4
#define closed 150
#define opened 0

//Defines Comunicação WIFI
#define SSID "Repe2020"
#define PASSWD "ajvm2020"

//Construtores
ESP8266WiFiMulti WiFiMulti;
std::unique_ptr<BearSSL::WiFiClientSecure>client(new BearSSL::WiFiClientSecure);
HTTPClient http;
  
MFRC522 rfid(SS_PIN, RST_PIN);
Servo servo;

//Fingerprint necessario para autenticar o acesso ao servidor
const char fingerprint[] PROGMEM =  "BC 61 FA 80 97 D9 A5 5E 71 70 46 92 78 36 ED FE 0D B1 D2 EE";
String url_tag = String("https://us-central1-acesscontrollockdoor.cloudfunctions.net/verifyTAG");
String url_id = String("https://us-central1-acesscontrollockdoor.cloudfunctions.net/getID");
String aux, payload;

//variaveis globais
uint16_t sala;
uint32_t readID;
uint32_t knownID = 0x208929A4;

uint8_t sucess;

void setup()
{
  //Inicia a serial
  Serial.begin(115200);
    while(!Serial) 
      delay(10);
  Serial.println();
  Serial.println("Serial ligado!");
  
  //conecta na rede wifi
  WiFi.mode(WIFI_STA);
  WiFiMulti.addAP(SSID, PASSWD);
    while (WiFi.status() != WL_CONNECTED)
      delay(1000);
      
  Serial.print("Wifi conectado! Endereço de IP: ");
  Serial.println(WiFi.localIP());

  client->setFingerprint(fingerprint);
  Serial.println("fingerprint OK");

  //inicia a counicacao com o sensor
  SPI.begin();   
  rfid.PCD_Init();
  Serial.println("SPI e RFID module ligado!");

  //inicia o servo
  servo.attach(servoPin);
  servo.write(closed);
  Serial.println("ServoMotor Ligado!");

  delay(1000);
  //verifica se ele já corresponde a uma sala:
  EEPROM.begin(3);
  if(EEPROM.read(0) != 66){  
    
    if(http.begin(*client, url_id)){
      Serial.println("comeco de requisicao ID OK");
 
      if(http.GET() > 0){
        payload = http.getString();
        Serial.println(payload);
      }
      else{
        Serial.println("Falha na requisição");
      }
      
      http.end();
    }

    sala = payload.substring(6, payload.length()-1).toInt();
    
    EEPROM.write(0, 66);
    EEPROM.write(2, sala >> 8);
    EEPROM.write(1, sala & 0x00FF);
  }
  else{
    sala = EEPROM.read(2);
    sala = sala << 8;
    sala = sala + EEPROM.read(1);
  }
  EEPROM.end();
  Serial.print("sala ");
  Serial.print(sala);
  Serial.println(" definida para esta fechadura");

  Serial.println("Aproxime o seu cartao/TAG do leitor");
  Serial.println();
}

void loop(){
  /*------------- LEITURA DA TAG -------------*/
  readID = 0;
  
  if (!rfid.PICC_IsNewCardPresent())
    return;

  if (!rfid.PICC_ReadCardSerial())
    return;

  for(uint8_t i=0 ; i < rfid.uid.size ; i++)
    readID += ((uint32_t) rfid.uid.uidByte[i]) << 8*(rfid.uid.size-1-i);

  rfid.PICC_HaltA();
  /*------------- LEITURA DA TAG -------------*/
  
  /*------------- TRATAMENTO DA CHAVE E DO URL  -------------*/
  aux = String(readID, HEX);
  aux.toUpperCase();
  
  Serial.print("TAG Encontrada! Codigo: ");
  Serial.println(aux);
  
  Serial.print("URL de requisicao: ");
  Serial.println(url_tag + String("?uid=") + aux + String("&sala=") + String(sala));
  /*------------- TRATAMENTO DA CHAVE E DO URL  -------------*/
  
  /*------------- REQUISICAO -------------*/
  if(http.begin(*client, url_tag + String("?uid=") + aux + String("&sala=") + String(sala))){
    Serial.println("comeco de requisicao OK");

    int httpCode = http.GET();
    
    if(httpCode > 0){
      payload = http.getString();
      Serial.println(payload);

      if(payload[13] == '1'){
        openLock();
        delay(5000);
        closeLock();
      }
      payload.setCharAt(13, '0');
      
    }
    else{
      Serial.println("Falha na requisição");
    }
  
    http.end();
  }
  /*------------- REQUISICAO -------------*/
}

//Servo functions
void openLock(){
  servo.write(opened);
}

void closeLock(){
  servo.write(closed);
  delay(30);
}

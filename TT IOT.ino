#include <SimpleDHT.h>
#include <ESP8266WiFi.h>
#include <FirebaseESP8266.h>
#define pinDHT11 4
#define WIFI_SSID "Iphone"
#define WIFI_PASSWORD "tamsomot"
#define FIREBASE_HOST "https://project-1-6dcbb-default-rtdb.firebaseio.com"
#define FIREBASE_AUTH "rrOGO1CtFVW5WSToifuzZ8AZXOUQl5sHNN8LOkRa"
#define LED 5
int Gas_analog = A0; // used for ESP8266
int Gas_digital = 16; // used for ESP8266
const int buzzerPin = 2;
SimpleDHT11 dht11(pinDHT11);
byte temp = 0, hum = 0;
FirebaseData fbdb;

void setup() {
  Serial.begin(9600);
  pinMode(buzzerPin, OUTPUT); // Thiết lập chân kết nối với buzzer là OUTPUT
  pinMode(LED, OUTPUT);
  //Connect WIFI====================================
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Conecting to WIFI");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.println("Connected with IP : ");
  Serial.println(WiFi.localIP());
  Serial.println();
  //Connect Firebase=================================
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);
  Firebase.setReadTimeout(fbdb, 1000 * 60);
  Firebase.setwriteSizeLimit(fbdb, "tiny");
  //====================================================
  pinMode(Gas_digital, INPUT);
}
void loop() {
  // read dht11
  if (dht11.read( & temp, & hum, NULL) != SimpleDHTErrSuccess)
    Serial.println("Read DHT11 Failed.");
  else {
    Serial.println("DHT11: ");
    Serial.println(temp);
    Serial.println(hum);
    Firebase.setInt(fbdb, "/TT_IOT/temp", temp);
    Firebase.setInt(fbdb, "/TT_IOT/doam", hum);
  }
  //control led 
  if (Firebase.getInt(fbdb, "TT_IOT/Led") == true) {
    int st = fbdb.to < int > ();
    if (st == 1) {
      digitalWrite(LED, HIGH);
      Serial.println("led on");
    } else {
      digitalWrite(LED, LOW);
      Serial.println("led off");
    }
  }
  //mq2
  int gassensorAnalog = analogRead(Gas_analog);
  int gassensorDigital = digitalRead(Gas_digital);
  Serial.print("Gas Sensor: ");
  Serial.print(gassensorAnalog);
  Firebase.setInt(fbdb, "/TT_IOT/khigas", gassensorAnalog);
  if (Firebase.getInt(fbdb, "TT_IOT/auto") == true) {
    int at = fbdb.to < int > ();
    if (gassensorAnalog > 150 && at == 1) {
      Serial.println("Gas");
      Firebase.setInt(fbdb, "/TT_IOT/coi", 1);
    }
    if (gassensorAnalog < 150 && at == 1) {
      Serial.println("No Gas");
      Firebase.setInt(fbdb, "/TT_IOT/coi", 0);
    }
    if (Firebase.getInt(fbdb, "TT_IOT/coi") == true) {
      int buzz = fbdb.to < int > ();
      Serial.println(buzz);
      if (buzz == 1) {
        digitalWrite(buzzerPin, HIGH); 
      } else {
        Serial.println(buzz);
        Serial.println("No Gas");
        digitalWrite(buzzerPin, LOW); 
      }
    }
  }
  delay(100);
}
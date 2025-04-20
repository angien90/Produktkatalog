# Produktkatalog
Detta var vår första inlämningsuppgift i kursen API-utveckling, och syftet var att bygga grunden för en produktkatalog i en e-handel.

Uppgiften gick ut på att:
* Skapa ett normaliserat ER-diagram (EG-diagram) med tabeller, kolumner, primärnycklar och främmande nycklar
* Skapa tabellerna i phpMyAdmin och definiera relationer mellan tabellerna
* Implementera CRUD-funktionalitet (Create, Read, Update, Delete) för både produkter och kategorier
* Möjliggöra sökning och sortering via API:et

Fokus låg på att bygga en välstrukturerad databasmodell samt ett API med tydlig och korrekt hantering av data.


## Använda verktyg
<div align="center">
  <img src="https://github.com/user-attachments/assets/08a3194b-5a8c-4ca6-afb7-d863003a3628" width="100"/>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/d87d7d11-fd84-4d58-8bed-90a3b0495951" width="100"/>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/bedb7ac9-6fb6-4eb7-be4c-3538dfb5a63d" width="100"/>
</div>

## Använda tekniker
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)


## Installationer - Node/Express/Typescript
1. npm init -y
2. npm install express
3. npm install -D typescript @types/express
4. npm install -D tsx
5. Skapade en src mapp och en index.ts fil
6. npx tsc --init
7. Ändrade tsconfig.json till "module": "NodeNext" & "outDir": "./dist"
8. Lade till "dev": "npx tsx watch src/index.ts", "build": npx tsc --build & "start": "node dist/index.js" i package.json under scripts.
9. Installerade npm install dotenv mysql2 cors + npm install -D @types/dotenv @types/cors
10. Lade till .env fil + .gitignore + db.ts

Om du klonar detta projekt behöver du köra npm install för att installera allt som står i package.json under dependencies och devDependencies. 


## Normaliserat Entity Relationshop Diagram 
![image](https://github.com/user-attachments/assets/fc7fda1a-6415-4688-868d-5749c6377431)

EG-diagrammet ovan visar databasstrukturen för en produktkatalog i en e-shop. Datamodellen är normaliserad för att undvika redundans och för att hantera many-to-many-relationen mellan produkter och kategorier.
* products: Innehåller information om varje enskild produkt, såsom titel, beskrivning, lagersaldo, pris, bild och skapelsedatum.
* product_categories är en kopplingstabell som hanterar relationen mellan produkter och kategorier. Den gör det möjligt för en produkt att tillhöra flera kategorier och en kategori att innehålla flera produkter. Relationen mellan products och categories är alltså en many-to-many-relation, vilket löses med hjälp av kopplingstabellen product_categories. Den innehåller två främmande nycklar (product_id och category_id) och har en sammansatt primärnyckel för att undvika dubbletter.
* categories: Innehåller olika kategorier som produkterna kan tillhöra, t.ex. "Jackor", "T-shirt", eller "Byxor".

Då jag fick lite tid över under inlämningsuppgiften testade jag att lägga till gender för att öva lite ytterligare på EG-diagram och SQL-förfrågningar. Jag valde att lägga till gender just för att jag ville att man skulle kunna filtrera på vilket kön klädesplagget tillhörde. 


## phpMyAdmin för att administrera min MariaDB-databas
### Tabellen products 
![image](https://github.com/user-attachments/assets/94768302-7f5e-47be-98a8-2841bc6261a7)

### Tabellen categories
![image](https://github.com/user-attachments/assets/fe275ed7-6b2d-434c-ab30-0724e0ed9572)

### Tabellen product_categories
![image](https://github.com/user-attachments/assets/ed522fed-71f2-42ac-985e-74be102df562)

#### Forent keys för product_categories
![image](https://github.com/user-attachments/assets/df08cbe4-dfd7-41b0-9a7f-b7eff35c1d35)

### Tabellen genders
![image](https://github.com/user-attachments/assets/486e4004-5610-4e4e-90fa-2704c7f4e2d5)

### Tabellen product_gender
![image](https://github.com/user-attachments/assets/a5ae5658-93b3-4ac7-970b-28a793d54428)

#### Forent keys för product_gender
![image](https://github.com/user-attachments/assets/3c0eb3db-be17-4ac5-b2dd-33401574c2d8)

Jag har valt CASCADE på mina Forent keys för att undvika att poster pekar på något som inte längre finns.


## CRUD och endpoints i Insomnia
![image](https://github.com/user-attachments/assets/af1dfbe6-6bcf-4ff9-8266-b4b89d650e07)

Jag skapade upp en mapp för varje tabell och i denna mapp skapade jag upp de CRUD:s och endpoints som uppgiften innehöll.

### Products
![image](https://github.com/user-attachments/assets/9049516d-c578-4177-84ff-a2d738aff68e)

![image](https://github.com/user-attachments/assets/99d4b445-b759-4cb1-b460-2a2c492442c9)

![image](https://github.com/user-attachments/assets/391e4eb0-6e15-4987-a98f-10f3a81261be)

![image](https://github.com/user-attachments/assets/d3e01a67-1d54-436f-9e91-6538f3bd127c)

![image](https://github.com/user-attachments/assets/879ab4b1-0bc4-427a-85ea-21cf58712a9b)


### Search & sort
![image](https://github.com/user-attachments/assets/9f827cf5-05ce-46bd-b689-c78f156a1339)

![image](https://github.com/user-attachments/assets/40bba83f-38fb-46bd-8906-af3b12ce8989)

![image](https://github.com/user-attachments/assets/b9021f22-7ba4-4ce1-8bed-f7a98a80b6e4)


### Categories
![image](https://github.com/user-attachments/assets/94a5be0b-2728-4937-81b7-55d78fde16b5)

![image](https://github.com/user-attachments/assets/c8ec5387-e2b8-44cd-ad6f-ff92b0ff71bf)

![image](https://github.com/user-attachments/assets/43249c7e-7278-4502-a4b8-703305f1a347)

![image](https://github.com/user-attachments/assets/3efcfa9e-23f7-4b28-9b5a-54c3ba48e36a)

![image](https://github.com/user-attachments/assets/80459f41-afbb-4f8d-b830-73b3d419977d)


### Gender
![image](https://github.com/user-attachments/assets/514d726a-5e7e-496c-9ed8-9b69ff4d4328)

![image](https://github.com/user-attachments/assets/950e2e4c-9188-40a5-b077-eeef1567134b)

![image](https://github.com/user-attachments/assets/97baef0f-54b5-4ed8-b494-be909c587e31)

![image](https://github.com/user-attachments/assets/654ad306-e88f-4f0b-a5d4-c4225a5dc937)

![image](https://github.com/user-attachments/assets/c938910d-05f3-4c98-9f45-238521d275d3)


## Min kod
![image](https://github.com/user-attachments/assets/ad6d542d-5437-45cd-8f4a-adca7fca6bcd)

### Projektstruktur och syfte
Webbplatsen består av separata HTML-filer för varje sida användaren kan navigera till. Designen är responsiv och anpassad för mobil, surfplatta och desktop med hjälp av SASS.

All huvudsaklig funktionalitet finns i mappen src, där projektets logik är organiserad i olika mappar och filer med tydliga ansvarsområden:

#### Router-filer (t.ex. product.ts)
Router-filerna definierar vilka API-endpoints som finns, och kopplar dessa till motsvarande controller-funktioner. De hjälper till att strukturera applikationen och hålla isär logik beroende på resurs.

#### Controller-filer (t.ex. productController.ts)
Controllers innehåller funktionerna som körs när en viss endpoint anropas. Här hanteras logiken kring exempelvis SQL-frågor till databasen, filtrering, sortering och felhantering. De fungerar som en brygga mellan routers och databasen.

#### Models (t.ex. Product.ts, IProduct.ts, IProductDBResponse.ts)
Product.ts innehåller modeller för att skapa och hantera produktobjekt.

IProduct.ts definierar TypeScript-gränssnitt (interfaces) som beskriver hur produktdata ska se ut i applikationen.

IProductDBResponse.ts används för att tydligt beskriva formatet på data som kommer tillbaka från databasen, vilket förbättrar typkontroll och kodkvalitet.

#### Konfiguration (t.ex. db.ts)
db.ts innehåller inställningar för att koppla upp applikationen mot databasen på ett säkert och strukturerat sätt. Den används i alla delar av projektet där databasanslutning krävs.

## E-shop
Som frontendutvecklare kliade det i fingrarna att applicera ovan kunskap på en fiktiv webbshop. Här är resultatet men notera att alla funktioner för en fungerande webbplats inte är applicerat då detta endast gjordes på tiden som fanns över innan inlämningen. 

### Startsidan
![image](https://github.com/user-attachments/assets/721aa9bf-1e8f-4020-8464-685aea15e14e)

### Sökfunktionen på titel
![image](https://github.com/user-attachments/assets/29a06c8b-b35c-4cf1-9fcf-8ed4a5258e3f)

### Filtrering på kategori och kön
![image](https://github.com/user-attachments/assets/fcb405f4-efef-4501-a07a-12ee97e534a1)

### Sortering på pris
![image](https://github.com/user-attachments/assets/57f7c0d0-9d76-4477-b2f1-c9b9ca990223)

![image](https://github.com/user-attachments/assets/1877c2c0-a999-40af-8508-aae987810b9a)

### Produktsidan
![image](https://github.com/user-attachments/assets/6287f8c5-683a-4366-8940-f008608c803f)

### Varugorgen
![image](https://github.com/user-attachments/assets/480edd9f-b322-4a40-9d8f-086daa54ca23)



# Produktkatalog
Detta var vår första inlämningsuppgift i kursen API-utveckling, och syftet var att bygga grunden för en produktkatalog i en e-handel.

Uppgiften gick ut på att:
* Skapa ett normaliserat ER-diagram (EG-diagram) med tabeller, kolumner, primärnycklar och främmande nycklar
* Skapa tabellerna i phpMyAdmin och definiera relationer mellan tabellerna
* Implementera CRUD-funktionalitet (Create, Read, Update, Delete) för både produkter och kategorier
* Möjliggöra sökning och sortering via API:et

Fokus låg på att bygga en välstrukturerad databasmodell samt ett API med tydlig och korrekt hantering av data.


## Använda verktyg i projektet
<div align="center">
  <img src="https://github.com/user-attachments/assets/08a3194b-5a8c-4ca6-afb7-d863003a3628" width="100"/>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/d87d7d11-fd84-4d58-8bed-90a3b0495951" width="100"/>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/bedb7ac9-6fb6-4eb7-be4c-3538dfb5a63d" width="100"/>
</div>


## Normaliserat Entity Relationshop Diagram 
![image](https://github.com/user-attachments/assets/c3af0dbc-0350-48ac-91fa-7d05752f4af8)
EG-diagrammet ovan visar databasstrukturen för en produktkatalog i en e-shop. Datamodellen är normaliserad för att undvika redundans och för att hantera many-to-many-relationen mellan produkter och kategorier.
* products: Innehåller information om varje enskild produkt, såsom titel, beskrivning, lagersaldo, pris, bild och skapelsedatum.
* product_categories är en kopplingstabell som hanterar relationen mellan produkter och kategorier. Den gör det möjligt för en produkt att tillhöra flera kategorier och en kategori att innehålla flera produkter. Relationen mellan products och categories är alltså en many-to-many-relation, vilket löses med hjälp av kopplingstabellen product_categories. Den innehåller två främmande nycklar (product_id och category_id) och har en sammansatt primärnyckel för att undvika dubbletter.
* categories: Innehåller olika kategorier som produkterna kan tillhöra, t.ex. "Herr", "Dam", eller "Rea".



## phpMyAdmin för att administrera min MariaDB-databas
### Tabellen categories
![image](https://github.com/user-attachments/assets/fe275ed7-6b2d-434c-ab30-0724e0ed9572)

### Tabellen products 
![image](https://github.com/user-attachments/assets/94768302-7f5e-47be-98a8-2841bc6261a7)

### Tabellen product_categories
![image](https://github.com/user-attachments/assets/ed522fed-71f2-42ac-985e-74be102df562)

#### Forent keys för product_categories
![image](https://github.com/user-attachments/assets/df08cbe4-dfd7-41b0-9a7f-b7eff35c1d35)

Jag har valt CASCADE för om en produkt eller kategori tas bort, så tas även radkopplingarna i product_categories bort automatiskt. Detta för att undvika att poster pekar på något som inte längre finns.


## CRUD och endpoints

# Produktkatalog
Detta var vår första inlämningsuppgift i kursen API-utveckling, och syftet var att bygga grunden för en produktkatalog i en e-handel.

Uppgiften gick ut på att:
* Skapa ett normaliserat ER-diagram (EG-diagram) med tabeller, kolumner, primärnycklar och främmande nycklar
* Definiera relationer mellan tabellerna
* Implementera CRUD-funktionalitet (Create, Read, Update, Delete) för både produkter och kategorier
* Möjliggöra sökning och sortering via API:et

Fokus låg på att bygga en välstrukturerad databasmodell samt ett API med tydlig och korrekt hantering av data.


## Normaliserat EG-diagram 
![image](https://github.com/user-attachments/assets/c3af0dbc-0350-48ac-91fa-7d05752f4af8)
EG-diagrammet ovan visar databasstrukturen för en produktkatalog i en e-shop. Datamodellen är normaliserad för att undvika redundans och för att hantera many-to-many-relationen mellan produkter och kategorier.
Produkter/products: Innehåller information om varje enskild produkt, såsom titel, beskrivning, lagersaldo, pris, bild och skapelsedatum.
Kategorier/categories: Innehåller olika kategorier som produkterna kan tillhöra, t.ex. "Herr", "Dam", eller "Rea".
product_categories är en kopplingstabell som hanterar relationen mellan produkter och kategorier. Den gör det möjligt för en produkt att tillhöra flera kategorier och en kategori att innehålla flera produkter.

Relationen mellan products och categories är alltså en many-to-many-relation, vilket löses med hjälp av kopplingstabellen product_categories. Den innehåller två främmande nycklar (product_id och category_id) och har en sammansatt primärnyckel för att undvika dubbletter.

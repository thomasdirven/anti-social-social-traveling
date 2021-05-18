# 2021-pieter-thomasdirven
2021-pieter-thomasdirven created by GitHub Classroom

# Recipe API - Monolithic Repository

## Prerequisites

- Node.js installed
  - https://nodejs.org/en/
- Angular CLI installed
  - `npm install -g @angular/cli`
- DotNet 5.0 Installed
- SQL Database installed on localhost 
  - If you're an apple fanboi, refer to Web III for running a SQL Server Database in a Docker container.

## Getting started -  Development

````
git clone this repository
````

### Client

```
cd Client
npm install
ng build
npm start
```

### Server

```
cd Server/RecipeApi
dotnet watch run
```

---

## Getting started -  Production

### Client

```
cd Client
npm install
ng build --prod
```

### Server

```
cd Server/RecipeApi
dotnet run
```

## 


## Wat is je idee?

Een webapp waarop vrienden kunnen registreren en aanmelden.
Ze kunnen hun vrije periodes waarop ze op vakantie willen gaan ingeven.
Ze geven een aantal potientiële bestemmingen op.
Vervolgens kunnen ze op de hoogte gebracht worden indien ze een reisbestemmings en reisperiode match hebben met één van hun vrienden.
Dan kunnen ze samen de reis plannen.
Je kan deze app ook gebruiken om te zien wie van je vrienden waar op reis gaat om zo bijvoorbeeld voor één enkele avond af te spreken.
Mensen zetten het niet graag op facebook wanneer ze op reis gaan maar vinden het jammer als ze hun vrienden net gemist hebben terwijl ze op dezelfde reis bestemming waren.
Daarom is een kleine webapp met respect voor privacy de ideale oplossing voor deze mensen.
<br /><br />
Only my friends should know where I go<br />
**Anti social social travelling**


## Waarvoor dient men zich op de site te registreren/aan te melden?

Om de reisperiodes en potentiële bestemmingen van je vrienden te kunnen zien.
Om op de hoogte gebracht te worden indien ze een reisbestemmings en reisperiode match hebben met één van hun vrienden.
Vorige bestemmingen van vrienden zijn om zo tips aan hun te kunnen vragen om naar die bestemming te gaan.

## Welke calls zal je hiervoor voorzien in de backend? (Zijn dit er 4 met uitzondering van login/registratie)




## Wat zal je menu bevatten? Naar welke onderdelen van de site kan een gebruiker navigeren?

- Mijn Reizen (Je eigen reisperiodes en reisbestemmingen)
- Calender (reisperiodes (van jezelf) en je vrienden)
- Wereld Kaart (reisbestemmingen (van jezelf) en je vrienden)

- My Trips (Your own travel destinations and periodes)
- Calander (travel periodes of your friends)
- World Map (travel destinations of your friends)


## Welke componenten zal je voorzien?



## Wat zal het formulier bevatten? Welke validatie ga je toepassen?

New Travel Period with Destination(s)
- Reisperiode(s) (moet in de toekomst zijn)
- Lijst met bestemming waarvan je er graag 1 of meerdere zou doen in die periode
- Categorie
  - City Trip
  - Natuur (Wandelreis)
  - Cultuur
  - Skireis
  - Zuipreis
  - ...
- Zichtbaarheid (welke vrienden kunnen dit zien)
- Budget (vaste kosten)
- Budget (variabele kosten) (optioneel)- 
- Min aantal reisgenoten
- Max aantal reisgenoten
- Type accomodatie (hostel/hotel/appartement/huis/airbnb/...)
- Vervoermiddel (vliegtuig/bus/trein/carpoolen/huurauto/...)

## Optioneel : wat is je extra?



# Anti-Social-Social-Travelling

School assignment: We had to come up with our own idea for an Angular app with a .NET REST-API. 

Here is the result. I made a travel app, will do a video on this in the near future.

Google API key in the commit history has been replaced so don't try stealing it ;)

This <a href="Thomas_Dirven-Dossier-Web4-TravelApp-Anti-Social-Social-Traveling.pdf"
        download="Thomas_Dirven-Dossier-Web4-TravelApp-Anti-Social-Social-Traveling.pdf">pdf</a>
 is in dutch but can still give you a clear view of what my application can do thanks to the many screenshots.

# Anti-Social-Social-Traveling - Trip APP - Monolithic Repository

## Prerequisites

- Node.js installed
  - https://nodejs.org/en/
- Angular CLI installed
  - `npm install -g @angular/cli`
- DotNet 5.0 Installed
- SQL Database installed on localhost

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
cd Server/TripApi
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
cd Server/TripApi
dotnet run
```

## 





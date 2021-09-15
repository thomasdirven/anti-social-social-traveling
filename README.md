# 2021-pieter-thomasdirven
2021-pieter-thomasdirven created by GitHub Classroom

# Trip APP - Monolithic Repository

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





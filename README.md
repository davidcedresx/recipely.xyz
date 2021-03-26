# Recipely

Management software for the home cook

## Features

### Register ingredients

The user can register multiple ingredients, each ingredient consists of:

- Name
- Price
- Unit
- Amount

Price, Unit and Amount are meant to work together, like in:

**_I bought `30` `pounds` of chocolate powder for only `9.99`_**

## Register utensils

The user can register multiple utensils, each utensil consists of:

- Name
- Price
- Amount

Think about them as **_unitless_** ingredients, like in:

**_I need to buy little birthday candels, they cost $10 the pack of 20, and each cake requires 5 of them_**

## Register recipes

Obvious feature, a recipe goes like this:

- Name
- List of ingredient it uses
- List of utensils it uses
- Pieces you expect to get from it

The user defines each recipe with a list of ingredients, as well as the amount required of each,
same goes for utensils, the user can basically be like:

**_I want to track this carrot cake, I need 3 carrots for each, 150 grams of flour and 500ml of Milk, also I need a plate to put it and 5 candels._**

For doing this the user gets the benefit of automated price generation and tracking, so every ingredient and utensil usage will be taken into account.

## Configure global earnings

The user can configure a global earning margin that will be added to everything: both to recipes and their pieces.

# Dev stuff

## How to install

- Install docker

- Install docker compose

- Clone this repo like:

```
git clone https://davidcedresx/recipely.xyz
```

- Run a local mongo server like:

```
sudo docker run --network host -d mongo
```

- Run local backend nodeJS server like:

```
cd backend
npm i
npm run dev
```

- Run local frontend CRA server like:

```
cd frontend
npm i
npm run dev
```

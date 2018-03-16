## Synopsis

Palette Picker is a project for the Turing School of Software & Design. The guidelines are located [here](http://frontend.turing.io/projects/palette-picker.html). Using Node Express, I built the database in POSTGRESQL using KNEX to translate javascript to SQL. I used javascript, jquery, and standard CSS to create the user interface.

## Code Example

The website allows users to generate different color palettes and save them to different projects. A user can come to the website, create named projects and save named palettes to those projects. Then, the users have a place to store all of their color schemes. Palettes can be created or removed, and if a palette is clicked on, it displays those colors on the paint brushes.

## Motivation

I wanted to create a clean, but creative design. Since I paint in my spare time, I was drawn to the idea of having paints display the colors generated. After finding several SVGs, I positioned them in a way to mimic paint brush streals.

## Installation

Clone the repo and run ```npm install```
The developer must create their own database, so install [postgresql](https://www.postgresql.org/download/) and run ```psql```
Then ```CREATE DATABASE palette_picker```
Exit out of psql with the command ```\q```
Run these two commands in the root project folder ```knex migrate:make initial``` and ``knex seed:run```
Now, the developer can start the server using ```node server.js```


## Tests

In order to run the tests, the developer must create a new test database. After cloning the repo and running ```npm install```
Then ```CREATE DATABASE plaette_picker_test```
Please copy and paste the code above - that typo was accidentally included. Update coming!
Run ```npm test`` to see the testing suite

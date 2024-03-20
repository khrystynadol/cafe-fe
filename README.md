# CafeSpa
## Project description
The purpose of this project is to develop the client part of the system for a cafe. The system provides 2 types of users: a client and a manager. The client has the ability to create orders. The manager adds dishes, changes the status of the order (registered, deleted, etc.), adds products to the database, has access to all the data stored in the database. The result of the system is the ability to view the menu and information about the cafe for the client, as well as keep track of available products and dishes for the manager. The client part is developed on the basis of the finished server part. 
The purpose of this work is to visualise the server side, create a user-friendly interface for users and provide them with a convenient way to place orders and interact with the cafe.

## Functionality description (flow)
![Main page of the website](https://github.com/khrystynadol/cafe-fe/assets/106964524/285fa2e0-bf2b-4faa-b283-44ac0b20dac8)

An unauthorised user can log in, view the menu, information about us and our contacts. 
Scrolling down the page, the user sees information about the cafe, contacts and a footer with navigation, logo and links to social media.

![About us info](https://github.com/khrystynadol/cafe-fe/assets/106964524/66f7a851-a5ef-4c05-96a2-a85f417beade)
![Contact info and footer](https://github.com/khrystynadol/cafe-fe/assets/106964524/9f9c5c82-46f8-4dfc-97a4-2f8f6992db3a)

When you hover over a certain part of the information, it is highlighted.

![Contact info hovered](https://github.com/khrystynadol/cafe-fe/assets/106964524/9114406d-3ca1-4e2e-ad2b-d1c22cd57e00)

By going to the menu page, an unauthorised user can view the list of dishes and drinks available on the cafe's menu.

![Menu page](https://github.com/khrystynadol/cafe-fe/assets/106964524/d58470d5-7d7a-498e-805e-959d1cbc4365)

To log in, the user should click on the "Log in" button in the navigation bar of the page. After that, they will be redirected to the login page, where the form is located. To log in, you need to enter your email and password. If the user has forgotten his password, he can recover it.

![Login page](https://github.com/khrystynadol/cafe-fe/assets/106964524/6304b5ce-f099-492e-b52a-e32479abd4b4)

If you enter an incorrect email or password, an error message appears below the confirmation button.

![Wrong login](https://github.com/khrystynadol/cafe-fe/assets/106964524/242608d0-f9a3-46ef-ad14-a658f9d69d79)

## Project details
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

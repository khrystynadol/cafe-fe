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

![Login form](https://github.com/khrystynadol/cafe-fe/assets/106964524/6304b5ce-f099-492e-b52a-e32479abd4b4)

If you enter an incorrect email or password, an error message appears below the confirmation button.

![Wrong login](https://github.com/khrystynadol/cafe-fe/assets/106964524/242608d0-f9a3-46ef-ad14-a658f9d69d79)

If a user is not registered, they can click on the "Sign up" text and be redirected to the registration page.

![Registration form](https://github.com/khrystynadol/cafe-fe/assets/106964524/a3066bb1-ff0c-48cd-b72a-347ea6cbfb76)

To successfully register, you should enter the following information correctly: first name, last name, email address and telephone number. You will also need to enter a password and duplicate it. Each field in the form has its own validation. Until all fields are filled in correctly, the registration button will be blocked. If you enter incorrect data, you'll see what kind of error occurs.

![Validation on registration](https://github.com/khrystynadol/cafe-fe/assets/106964524/bf625e9d-85e7-4976-80a2-ee54fcce18f5)

Fields are validated using regular expressions. For example, a correct first and last name is a string of 5-20 characters that starts with a capital letter and contains only Latin letters. A phone number should consist of only digits, and an email address should contain an @ and domain part. For user security, the password also has certain restrictions, including a minimum length of 5 characters and the presence of a letter and a number. The duplicated password must be exactly the same as the previously entered one.

![Correctly filled registration form](https://github.com/khrystynadol/cafe-fe/assets/106964524/513749cb-2131-4c0e-8bbe-174a5848ff89)

As you can see, we can now click the registration button, as all the data has been entered correctly.

![Not unique email or phone](https://github.com/khrystynadol/cafe-fe/assets/106964524/f99aaf5f-7b80-4577-a07e-299fbf937240)

If the user with the entered email or phone number is already registered, an error message appears below the registration button. If the user is already registered, they can go to the login page by clicking on the "Log in" text. 
If you enter the correct data required for login or registration, you will be redirected to the main page. The navigation now allows you to view your profile, but you cannot log in.

![Main page of authorized user](https://github.com/khrystynadol/cafe-fe/assets/106964524/3207143e-bb7d-4242-8ef6-7e73c35ff357)

The profile page displays all information about the user. They can also log out of their account, edit it, or delete it.

![Profile page](https://github.com/khrystynadol/cafe-fe/assets/106964524/1e3744c2-5ac1-4bff-a126-250ead07cb97)

On the menu page, the authorised user can see all the information they saw before authorisation, as well as the price, weight and availability of the dish or drink.

![Menu page of the authorized user](https://github.com/khrystynadol/cafe-fe/assets/106964524/65a2adac-e539-45cf-9cfa-79721f2a09cd)

### Let's review the functionality of the website for managers.

![Manager login](https://github.com/khrystynadol/cafe-fe/assets/106964524/4d851c0f-b178-4363-9b94-4801349bac31)

First of all, the manager must enter the correct email and password. After authorisation, the system returns the user's role. If the user is a manager, he or she is redirected to the main page of the administrative area.

![Manager dashboard](https://github.com/khrystynadol/cafe-fe/assets/106964524/93487a12-9e6d-42f0-ab91-3ab5417e8d30)

On this page, you can view analytics, such as information about recent orders, best-selling products, income, and losses. There is also navigation to the administrative area on the left. 
The manager can: 
- Add a dish or drink to the menu
  
  ![Add item form](https://github.com/khrystynadol/cafe-fe/assets/106964524/a72f54f0-3a1e-4bc0-ba8f-c18c567db0e7)

- View the list of products
  
  ![List of products](https://github.com/khrystynadol/cafe-fe/assets/106964524/f6ba2b8d-034a-4704-aad1-849412e6294a)

  The page contains a list of all products stored in the database and their details, such as name, price per kilogram and weight of the product in stock. If the products are not available, a message appears on the page saying that the products were not found.
  
- View order list

  ![List of all orders](https://github.com/khrystynadol/cafe-fe/assets/106964524/9c829167-752e-4262-a492-ed4aaed91ff0)

  The page contains a list of all orders saved in the database and their details, such as name, description, and amount. If there are no orders, the page displays a message that no orders were found.
  
- View the list of all users

  ![List of all users](https://github.com/khrystynadol/cafe-fe/assets/106964524/55f6b191-6f6e-4428-aa8a-5f5270da7dd2)

  The page lists all the users saved in the database and their details, such as first name, last name, email, phone number, and role. If there are no users, the page displays a message that no users have been found.
  
- Logout
  
  After the manager logs out, he or she is redirected to the main client page.
  
- Other
  
Since analytical data and record keeping require a lot of accuracy, web sockets have been written on the server side for the product, order, and user lists. If there are a lot of orders, the manager will not have time to constantly refresh the page to update the data. The web socket will download the updated information itself when it is updated.


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

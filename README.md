# Algorithm-Checker

The algorithm checker is a prototype created in order for Creating 010. It's an prototype application to explain how algorithms work,
and how algorithms select content on social media. The main purpose of this prototype is to make users aware of algorithms.

# How to install

1. Download this repository by cloning it or downloading it as a zip file
2. Make sure you have installed composer and npm
3. First run the command "composer install" in the root op the project
4. Then the command "npm install"
5. Rename the .env.example file in the root of the project to .env
6. Generate a new application key using the command "php artisan key:generate"
7. After everything is done you need to run the command "php artisan serve" to run the project on localhost, after that you can open the prototype in your browser
8. To write new code and to let the system compile that code you need to run the command "npm run watch" once. This will compile all code on every save and even when you switch to your browser
9. Then you need to add your own Instagram access_token in the file Timeline.vue and change the Facebook app id in the file app.js.

# Where to write new code

In order to change the code or add new pages you always need to be in this working directory: Algorithm-Checker-master/resources/assets/js.
In this directory is all the code stored that is needed to run the application. When writing new code it's important to never forget to run
the following command "npm run watch". This command will compile all the code that you have written and make one file out of it. Otherwise
your new code will not run.

# URL-Shortener
 Web Application which converts long URL to short URL. Unable to get application deployment using Heroku on time. Given more time, it would have definitely been possible. Should have looked into AWS deployment instead because of familiarity from school course work. Nevertheless, it was a good experience and I had no regrets.

# Tech Stack
- NodeJS, ExpressJS
- HTML, CSS, JavaScript
- MySQL

# How to Run Application
1. Create a new MySQL Schema and use the url_shortener.sql file to import the relevant table in
2. Create a .env file with contents as follows: DB_PASSWORD="_____" and insert your MySQL password accordingly
3. Run npm install to install the relevant dependencies required for the application
4. Open the terminal and run the app using "npm run start"
5. Head over to browser and type "http://localhost:3000"
6. Enjoy! :)

# For Unit Testing
1. Head over to app.test.js to check out unit test
2. Open the terminal and run the test using "npm run test"

# Packages Info
Packages:
- express for routing
- config to manage config files
- nanoid v3 for generating short code
- valid-url to verify url
- dotenv to retrieve environment variables in .env file
- cors for cross-origin resource sharing
- nodemon is used for node to restart app when changes are made (development purposes, not for production)
- jest & supertest for testing (development purposes, not for production)


# Issues:
- mysql does not support authentication method involving encryption and handshakes so mysql2 is used instead, although it is a forked version of mysql, source: https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
- nanoid v4 has issues using require. Downgraded to v3 instead, source: https://stackoverflow.com/questions/72568855/how-to-fix-code-err-require-esm-const-nanoid-requirenanoid
- nanoid generates code of length 21 to minimize collision, source: https://github.com/ai/nanoid/

# References/Credits:
- NodeJS URL Shortener
    - Traversy Media: https://www.youtube.com/watch?v=Z57566JBaZQ
    - Codingflag: https://www.youtube.com/watch?v=z0Cm6xDQNt0
- NodeJS Unit Testing, Marius Espejo: https://www.youtube.com/watch?v=M44umyYPiuo&t=718s
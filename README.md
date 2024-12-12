This is an step by step guide to how to run the iChurch Application's Frontend, Backend, Database and Test cases.

# Frontend - Hosted in Vercel

Use this link to access the vercel deployment
https://ichurch-fe.vercel.app/

# Backend - Hosted on Azure VM

Setting up the Azure VM

- Run the Azure VM
- Verify that backend application is deployed. (node Express.js)
- Log in to the server and run the necessary commands to verify that backend service is running
  pm2
  npm start

- Access the API using
  https://dilusha7.uksouth.cloudapp.azure.com/member-registration/get/all or https://20.90.211.16/member-registration/get/all

- Database connection
  Backend is almost confidured to conenct a MongoDB instance. Ensure that database is running and connection string configured accurately.

- POSTMAN testing
  Test Backend endpoints by sending HTTP requests to the API routes (get, put, delete, post). Verify the response data and verify the API's are working correctly.

# NOSQL-MongoDB database

Check the database connection from the backend to confirm successful integration. The database stores all member-related data. CRUD operations performed through the frontend or Postman will reflect in the MongoDB collections.

# Testing using Cypress.js framework

- Setting up the Cypress on a local machine.

- Intall famework using
  npm install cypress

- Open the testing environment using
  npx cypress open

- Run Test using cypress dashboard to execute test cases for CRUD operations, functionality of forms and buttons.

# References

W3schools.com. (2019). HTML DOM appendChild() Method. [online] Available at: https://www.w3schools.com/jsref/met_node_appendchild.asp.

developer.mozilla.org. (2024). URLSearchParams - Web APIs | MDN. [online] Available at: https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams.

W3schools.com. (2020). How To Create a Filter/Search List. [online] Available at: https://www.w3schools.com/howto/howto_js_filter_lists.asp.

Grafana Labs. (2024). URLs with query parameters | Grafana k6 documentation. [online] Available at: https://grafana.com/docs/k6/latest/examples/url-query-parameters/ [Accessed 12 Dec. 2024].

www.tutorialspoint.com. (n.d.). ExpressJS - RESTFul APIs. [online] Available at: https://www.tutorialspoint.com/expressjs/expressjs_restful_apis.htm.

Cypress.io. (2024). End-to-End Testing: Your First Test with Cypress | Cypress Documentation. [online] Available at: https://docs.cypress.io/app/end-to-end-testing/writing-your-first-end-to-end-test [Accessed 12 Dec. 2024].

Farooqui, U. (2023). Solving CORS Issues in Your Node.js Application. [online] Medium. Available at: https://mufazmi.medium.com/solving-cors-issues-in-your-node-js-application-836506e63871.



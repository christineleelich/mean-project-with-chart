#Mean Stack application (Mangodb, Angular, Node and HighCharts).visit: http://meanstack-christinelich.rhcloud.com



Delplyment and Running Envirentment Request:

(1) Get the application source codes.

    a) Download from the github website, or
    b) run git command:  git clone https://github.com//jennyleelich/mean-project-with-chart.git

(2) Deployment to local

       a) Go to the project folder, run command: npm install
       b) run the node server command, run command: node server
       c) open your browser, open the url:  http://localhost:3000
       d) or before step b, run command "gulp build" to generate the release version UI, then run the node server with npm start.

(3) Deployed on the Openshift.

     The application has been deployed on the openshift with the link:http://meanstack-christinelich.rhcloud.com
   
(4) About the source of data.

    Database: mongodb. version 3.x
    Database Driver:mongoose
    Database Data: sample data store on the mlab.com, login lichunhua ps 3440308 to view the data
   

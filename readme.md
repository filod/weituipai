# how to setup ?  
1. install [node](http://nodejs.org)  

2. create database & make some seed data:  
  ```bash
  $ node models/create.js  
  ```  

  then:  

  ```bash
  $ node seed.js
  ```

3. start app!  
  ```bash  
  $ node app-web.js # main page in port 3000  

  $ node app-admin.js # admin page in port 3001
  ```

that's all
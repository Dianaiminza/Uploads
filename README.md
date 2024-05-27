 # Uploads
 This project provides functionality for uploading, downloading, and zipping files. It is built using Node.js and utilizes the multer middleware for handling file uploads. Tests are implemented using supertest.

#Features
-File Upload: Users can upload files to the server.
-File Download: Users can download individual files from the server.
-File Zipping: Users can download a zip archive of multiple files.

#Technologies Used
-Node.js: Backend runtime environment.
-multer: Middleware for handling multipart/form-data, used for file uploads.
-supertest: Framework for testing HTTP APIs.

 # Installation
 Clone repo to your local machine: 
 console git clone https://github.com/Dianaiminza/FileUpload/.git 
 
 # Install dependencies 

 Then run: npm init npm install 
 
 Create .env with your own enviroment variables. 
 
 Now start the server: npm npm run dev-start-development npm start - production
 
  # Testing
  To run tests: npm run test
  
   # API Routes
   HTTPVERB   | ENDPOINT      |FUNCTIONALITY
------------- | ------------- |-------------
 POST         | [ file ] /api/upload   |Upload a single file
POST          | [ file ] /api/multiple|Upload multiple files
 
 

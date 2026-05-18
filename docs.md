# Overview

1. Installation
2. Running Application
3. APIs
4. In the Future


## Installation

Have the following applications installed:
1. Node.js 
2. Supabase account

Step 1 - Clone the Repository

git clone https://github.com/melatabera ResumeScanner_FinalProject_INST377.git

Step 2 - Install Dependencies

npm install 

Dependencies 
    express
    @supabase/supabase-js
    body-parser
    dotenv
    nodemon
    motion
    chartjs

Step 3 - Configure Enviornment Variable 

Create an .env file in the project root, and implement the following enviornment variables:

SUPARBASE_URL=
SUPABASE_KEY= 

Both values should be in your Supabase project dashboard. 

NOTE: .env is listed in the gitignor

## Running the Application

To start the server, enter the following into the terminal:

 --> npm start 

The server should be avaible at: http://localhost:3000. Open this server in chrome for best functionality 

Deployment: This application deploys on Vercel. To deploy, add supabase environment variables to Vercal dashboard.

## API Reference
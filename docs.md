# Overview

1. Installation
2. Running Application
3. APIs
4. In the Future


## Installation

Have the following applications installed:
1. Node.js 
2. Supabase account

### Step 1 - Clone the Repository

git clone https://github.com/melatabera ResumeScanner_FinalProject_INST377.git

### Step 2 - Install Dependencies

npm install 

Dependencies
- express
- @supabase/supabase-js
- body-parser
- dotenv
- nodemon
- motion
- chartjs

### Step 3 - Configure Enviornment Variable 

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


# Known Bugs

There are a few known bugs across the application that future developers should be wary of. On the search page, the window.onload function in index.js calls the Himilayas API using an undefined query variable which causes the initial job fetch to fail silently with no error shown to the user. Additionally, each job card rendered in the search results creates a div with the id="info", which produces dupicate IDs on the page and can cause unpredictable styling behavior. The polling interval in shwoResults() has no timeout, which means that if the API never returns a success status, the interval runs in the background forever. 

# Road Map for Future Development

In the short term, the most important fixes and updates to be made are to add input validation on the client side so that users receive an error message if they submit an incomplete form, and adding a maximum retry limit to the polling interval in showResults() so it stops automatically if the API doesn't respond in time. Long term, an impactful decision might be to add user accounts, which would allow students to save their resumes or maybe compare multiple at a time, as well as comapare multiple jobs. 

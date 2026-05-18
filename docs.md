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

--> npm install 

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

SUPARBASE_URL= " "

SUPABASE_KEY= " "

Both values should be in your Supabase project dashboard. 

NOTE: .env is listed in the gitignore

## Running the Application
 
This application deploys on Vercel. To deploy, push the repository to github, import the project to vercel, add supabase environment variables to Vercal dashboard under settings -> environment variables and deploy!

To start the server, enter the following into the terminal:

 --> npm start 

The server should be available at: http://localhost:3000. Open this server in chrome for best functionality 


### Testing
This project does not currently have any tests but there are manual tests users can take: 
Search Page: Enter a keyword and click search, job cards should appear. Verif each card shows a job title, company name, employment type, excerpt, category tags, and a "View Job" button
Resume Page: Upload a PDF resume and paste a job description, then click "Get Match Score." A loading message should appear immediately and then after 10-30 seconds the result panel should display a doughnut chart, score breakdown and category breakdown. Confrim that the scan is saved.
About Page: Verify all three step cards render correctly and the page is readable.


## API Reference

All endpoints are served from the Express backend (index.js) and are prefixed with /api.

GET /api/jobs 
Fetches job listings from the Himalayas API and returns them to the client 

GET /api/resumes 
Retrieves all saved resume scan results from the Supabase database, ordered by most recent first.

POST /api/resumes 
Saves a resume scan result (filename and overall match score) to the Supabase database.

External APIs(called from the front end)
The resume match scoring is handled by ApyHub's SharpAPI directly from resume.js. This a two step async process: 
POST - https://api.apyhub.com/sharpapi/api/v1/hr/resume_job_match_score: submits the resume PDF and job description; reutrns a job_id
GET - https://api/apyhub.com/sharpapi/api/v1/hr/resume_job_match_score/job/status/[job_id%7D - polled every 10 seconds until status === "success" , at which point match scores and explanations are extracted and rendered.


## Known Bugs

There are a few known bugs across the application that future developers should be wary of. On the search page, the window.onload function in index.js calls the Himilayas API using an undefined query variable which causes the initial job fetch to fail silently with no error shown to the user. Additionally, each job card rendered in the search results creates a div with the id="info", which produces dupicate IDs on the page and can cause unpredictable styling behavior. The polling interval in shwoResults() has no timeout, which means that if the API never returns a success status, the interval runs in the background forever. 

## Road Map for Future Development

In the short term, the most important fixes and updates to be made are to add input validation on the client side so that users receive an error message if they submit an incomplete form, and adding a maximum retry limit to the polling interval in showResults() so it stops automatically if the API doesn't respond in time. Long term, an impactful decision might be to add user accounts, which would allow students to save their resumes or maybe compare multiple at a time, as well as comapare multiple jobs. 





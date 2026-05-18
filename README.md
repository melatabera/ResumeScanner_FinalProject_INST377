# SkillMatch 

SkillMatch is a web platform designed to bring clarity to the job application process for college students and graduates. When applying for internships or entry-level roles, it can be difficult to know where you stand as an applicant; 
whether your skills are a strong match for certain positions or if your resume matches what employers are actually looking for. This uncertanity oftens lead to facing heavy amounts of rejections or underapplying to roles due to self-doubt.

SkillMatch aims to close the gap by providing real-time feedback about where their resume measures up desired job tiles. Simply upload your resume, paste in a job lisen, and get a breakdown of both your strengths and skill gaps.

Target Browsers: Chrome

Developer Manual: 

Known Bugs: There are a few known bugs across the application that future developers should be wary of. On the esrach page, the window.onload function in index.js calls the Himilayas API using an undefined query variable which causes the initial job fetch to fail silently with no error shown to the user. Additionally, each job card rendered in the search results creates a div with the id="info", which produces dupicate IDs on the page and can cause unpredictable styling behavior. The polling interval in shwoResults() has no timeout, which means that if the API never returns a success status, the interval runs in the background forever. 

RoadMap for Future Development: In the short term, the most important fixes and updates to be made are to add input validation on the client side so that users receive an error message if they submit an incomplete form, and adding a maximum retry limit to the polling interval in showResults() so it stops automatically if the API doesn't respond in time. Long term, an impactful decision might be to add user accounts, which would allow students to save their resumes or maybe compare multiple at a time, as well as comapare multiple jobs. 

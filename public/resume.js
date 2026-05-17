/*
Software Engineer - We are looking for a Software Engineer proficient in JavaScript, React, and Node.js, with experience in Agile methodologies

*/

document.getElementById("resume_form").addEventListener('submit',uploadResume);

async function uploadResume(e){
    e.preventDefault();

    // Get the submitted data
    const file = document.getElementById('resume_file').files[0];
    const content = document.getElementById('job_description').value;

    // API requires a formData object, initialize one with the necessary inputs: 'file', 'content', and 'language'
    const formData = new FormData();
    formData.append('file', file);
    formData.append('content', content);
    formData.append('language', 'English');

    // call API with the data
    try{
        const response = await fetch('http://localhost:3002/sharpapi/api/v1/hr/resume_job_match_score', {
            method: 'POST',
            headers:{
                'apy-token': 'APY0wwwul4yIVYh85ceUV7gMe8eKR0hOFTg0XZuZ95Fts3OKhSynWwCKyorsrlqkEPF3YfQGk',
                'Accept': 'application/json'
            },
            body: formData
        });

        const text = await response.text();

console.log(text);
        const data = await response.json();

        console.log(data)

        // call function to periodically check if upload is done, show results if ready
        const result = await showResults(data.job_id)
    }
    catch (e){
        console.log("error!", e);
    }



}

function showResults(jobId){

    console.log("starting interval");
    // continuously check status link given by API to see if data is ready (every 2 seconds)
    const timer = setInterval(async() => {
        const statusUrl = `http://localhost:3002/sharpapi/api/v1/hr/resume_job_match_score/job/status/${jobId}`
        
        // check the status for a response
        const checkResponse = await fetch(statusUrl, {
            method: 'GET',
            headers: {
                'apy-token': 'APY0SFV0ZLRE93mpy0V8ZbAG0JCEgHwcQHAAx3P1em6h8iLqzpuH9aLrJ7sNRYgdNAifEKNH6s2Lyu',
                'Content-Type': 'application/json'
            }
        });

        const data = await checkResponse.json()
        

        // get status attribute from data
        const currentStatus = data.data.attributes.status;

        // if the data is already ready, stop checking and set the div with info
        if(currentStatus === "success"){
            clearInterval(timer);



            // get results
            const result = data.data.attributes.result;
            
            // convert the json data and show in results div
            const resultDiv = document.getElementById('result');
            const resultsJSON = JSON.stringify(result,null,2)
            resultDiv.innerHTML = `<h3>Results: </h3><pre>${resultsJSON}</pre>`
            
        }

        else{
            console.log("Not ready yet!");
        }
    
    }, 5000)
}


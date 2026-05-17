/*
Software Engineer - We are looking for a Software Engineer proficient in JavaScript, React, and Node.js, with experience in Agile methodologies

*/

document.getElementById("resume_form").addEventListener('submit',uploadResume);

async function uploadResume(e){
    e.preventDefault();

    // Get the submitted data
    const file = document.getElementById('resume_file').files[0];
    const content = document.getElementById('job_description').value;


    document.getElementById('result').innerHTML = '<p>Uploading and analyzing, please wait....'
    // document.getElementById('submit_button').disabled = true;


    // API requires a formData object, initialize one with the necessary inputs: 'file', 'content', and 'language'
    const formData = new FormData();
    formData.append('file', file);
    formData.append('content', content);
    formData.append('language', 'English');

    // call API with the data
    try{
        const response = await fetch('https://api.apyhub.com/sharpapi/api/v1/hr/resume_job_match_score', {
            method: 'POST',
            headers:{
                'apy-token': 'APY02Iyl53LyWewCu43MIeWdca1j3LS4ZmKBYwUBQ2uAQv0psYuXbGf2AoWnVS8o19pC4YT7u',
                'Accept': 'application/json'
            },
            body: formData
        });

        const data = await response.json();

        console.log(data.status_url)


        // call function to periodically check if upload is done, show results if ready

        const result = await showResults(data.job_id)
    }
    catch (e){
        console.log("error!");
    }

}

function showResults(jobId){

    console.log("starting interval");

    const link = `https://api.apyhub.com/sharpapi/api/v1/hr/resume_job_match_score/job/status/${jobId}`
    // continuously check status link given by API to see if data is ready (every 2 seconds)
    const timer = setInterval(async() => {
        
        // check the status for a response
        const checkResponse = await fetch(link, {
            method: 'GET', 
            headers: {
                'apy-token': 'APY02Iyl53LyWewCu43MIeWdca1j3LS4ZmKBYwUBQ2uAQv0psYuXbGf2AoWnVS8o19pC4YT7u',
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
    
    }, 10000)
}


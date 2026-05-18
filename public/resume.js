
document.getElementById("resume_form").addEventListener('submit',uploadResume);

async function uploadResume(e){
    e.preventDefault();

    // Get the submitted data
    const file = document.getElementById('resume_file').files[0];
    const content = document.getElementById('job_description').value;


    document.getElementById('result').innerHTML = '<p>Uploading and analyzing, please wait....'


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
                'apy-token': 'APY0nlMnV0utGJoC3SThKCcO8DsOGL4R3yjozpMkvjt66XTKF16kVYLeYGVQ8W10ykBUT',
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
                'apy-token': 'APY0nlMnV0utGJoC3SThKCcO8DsOGL4R3yjozpMkvjt66XTKF16kVYLeYGVQ8W10ykBUT',
                'Content-Type': 'application/json'
            }
        });

        const data = await checkResponse.json()

        // get status attribute from data
        const currentStatus = data.data.attributes.status;

        // if the data is already ready, stop checking and set the div with info
        if(currentStatus === "success"){
            clearInterval(timer);

            const result = data.data.attributes.result;
            const scores = result.match_scores;
            const explanations = result.explanations;

            //labels for each score
            const scoreLabels = {
                overall_match: "Overall Match",
                skills_match: "Skills",
                experience_match: "Experience",
                education_match: "Education",
                certifications_match: "Certifications",
                job_title_relevance: "Job Title Relevance",
                technical_stack_match: "Technical Stack", 
                methodologies_match: "Methodologies",
                soft_skills_match: "Soft Skills",
                project_experience_match: "Project Experience",
                cultural_fit_potential: "Cultural Fit",
                stability_score: "Stability Score",
                remote_work_flexibility: "Remote Work Flexibility",
                location_preference_match: "Location Match",
                management_experience_match: "Management Experience"
            }

            //building score bars
            let scoresHTML = '';
            for(const key in scoreLabels){
                const label = scoreLabels[key];
                const value = scores[key] || 0;
                scoresHTML += `
                <div class="score_row">
                    <div class="score_label">${label}</div>
                    <div class="score_bar_bg">
                        <div class="score_bar_fill" style ="width: ${value}%"></div>
                    </div>
                    <div class="score_number">${value}%</div>
                </div>
                `
            }

            //building explanations 
            let explanationsHTML = '';
            for(const key in explanations){
                const label = scoreLabels[key] || key;
                explanationsHTML += `
                <div class="explanation_item">
                    <h4>${label}</h4>
                    <p>${explanations[key]}</p>
                </div>
                `
            }

            document.getElementById('result').innerHTML = `
                <h3>Your Results</h3>
                <div class="overall_score">
                    <canvas id="scoreChart" width="150" height="150"></canvas>
                    <p>${scores.overall_match}%  Overall Match</p>
                </div>
                <div class="scores_section">
                    <h4>Score Breakdown</h4>
                    ${scoresHTML}
                </div>
                <div class="explanations_section">
                    <h4>Feedback</h4>
                    ${explanationsHTML}
                </div>
            `
            //Doughnut chart for overall match score
            const ctx = document.getElementById('scoreChart').getContext('2d');
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    datasets: [{
                        data: [scores.overall_match, 100 - scores.overall_match],
                        backgroundColor: ['#ec4899', '#fdf2f8'],
                        borderWidth: 0
                    }]
                },
                options: {
                    cutout: '75%',
                    plugins: {
                        legend: { display: false }
                    }
                }
            })
            
        } else {
            console.log("not ready yet");
        }
    
    }, 10000)
}


document.getElementById("resume_form").addEventListener('submit', uploadResume);

async function uploadResume(e) {
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

    // call backend point with the data
    try {
        const response = await fetch('https://api.apyhub.com/sharpapi/api/v1/hr/resume_job_match_score', {
            method: 'POST',
            headers: {
                'apy-token': 'APY070S9wOGdlB8j6w44dpQnC23c1qGo1FzvQ5WDtRB01sMzDtwenIMhCtdbm5G5x4MCv',
                'Accept': 'application/json'
            },
            body: formData
        });

        const data = await response.json();

        console.log(data.status_url)


        // call function to periodically check if upload is done, show results if ready

        const result = await showResults(data.job_id, file)
    }
    catch (e) {
        console.log("error!");
    }

}

function showResults(jobId, file) {

    console.log("starting interval");

    const link = `https://api.apyhub.com/sharpapi/api/v1/hr/resume_job_match_score/job/status/${jobId}`
    // continuously check status link given by API to see if data is ready (every 2 seconds)
    const timer = setInterval(async () => {

        // check the status for a response
        const checkResponse = await fetch(link, {
            method: 'GET',
            headers: {
                'apy-token': 'APY070S9wOGdlB8j6w44dpQnC23c1qGo1FzvQ5WDtRB01sMzDtwenIMhCtdbm5G5x4MCv',
                'Content-Type': 'application/json'
            }
        });

        const data = await checkResponse.json()

        // get status attribute from data
        const currentStatus = data.data.attributes.status;

        // if the data is already ready, stop checking and set the div with info
        if (currentStatus === "success") {
            clearInterval(timer);

            const result = data.data.attributes.result;
            const scores = result.match_scores;
            const explanations = result.explanations;

            try {
                await fetch('/api/resumes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        filename: file.name,
                        score: scores.overall_match
                    })
                });
            } catch (error) {
                console.log("error in posting to the supabase");
            }

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
            for (const key in scoreLabels) {
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
            for (const key in explanations) {
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
                <div class="overall_score">${scores.overall_match}% Match</div>
                <div class="scores_section">
                    <h4>Score Breakdown</h4>
                    ${scoresHTML}
                </div>
                <div class="explanations_section">
                    <h4>Feedback</h4>
                    ${explanationsHTML}
                </div>
            `

        } else {
            console.log("not ready yet");
        }

    }, 10000)
}

async function loadHistory() {
    try {
        // get all saved resumes
        const response = await fetch('/api/resumes');
        const data = await response.json();

        // get history container, set it to empty intially
        const container = document.getElementById('history_container');
        container.innerHTML = '';

        // if length 0, indicate that there is no history
        if (!data || data.length === 0) {
            container.innerHTML = '<p>No past scans yet.</p>'
            return;
        }

        data.forEach(item => {
            const card = document.createElement('div');
            // for styling
            card.classList.add('history_card');


            const title = document.createElement('h3')
            title.textContent = item.filename;

            const score = document.createElement('p');
            score.innerHTML = `Match Score: ${item.score}%`

            // add elements together
            card.appendChild(title);
            card.appendChild(score);

            container.appendChild(card);

        })
    }
    catch (error) {
        console.log("error getting history!!")
    }
}

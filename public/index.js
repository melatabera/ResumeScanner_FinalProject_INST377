async function fetchJobData() {
    const query = document.getElementById('query').value;
    const response = await fetch(`https://himalayas.app/jobs/api/search?q=software+intern&sort=recent`)

    const data = await response.json()

    console.log(data); 
    console.log(data.jobs)
    return data.jobs

}

function getJobs(jobs){
    const container = document.getElementById('job_search')
    container.innerHTML = '';

    jobs.forEach(job => {
        const card = document.createElement('div')
        card.classList.add('card');

    
        const title = document.createElement('h3')
        title.classList.add('job_name')
        title.textContent = job.title

        const info = document.createElement('div')
        info.id = 'info';

        const company = document.createElement('h6')
        company.classList.add('company_name')
        company.textContent = job.companyName

        const pipe = document.createElement('p')
        pipe.textContent = '|'

        const type = document.createElement('h3')
        type.classList.add('type')
        type.textContent = job.employmentType

        info.appendChild(company);
        info.appendChild(pipe)
        info.appendChild(type);

        const description = document.createElement('p')
        description.classList.add('excerpt')
        description.textContent = job.excerpt

        const labels = document.createElement('div');
        labels.classList.add('info');
        if(job.categories && Array.isArray(job.categories)){
            job.categories.slice(0,3).forEach(category => {
            const label = document.createElement('p')
            label.textContent = category.replaceAll('-',' ')
            labels.appendChild(label)
         })
        }

        card.appendChild(title)
        card.appendChild(info)
        card.appendChild(description)
        card.appendChild(labels)

        container.appendChild(card)


    })

}




window.onload = async function(){
    const jobs = await fetchJobData()
    getJobs(jobs)
}
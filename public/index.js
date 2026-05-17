document.getElementById('search_btn').addEventListener('click', async() => {
    const jobs = await fetchJobData()
    getJobs(jobs)
})


let currentOffset = 0

async function fetchJobData(offset=0) {
    const query = document.getElementById('query').value;
    const response = await fetch(`https://himalayas.app/jobs/api/search?q=${query}&limit=20`)
    const data = await response.json()
    console.log(data)  
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
        labels.classList.add('labels');
        if(job.categories && Array.isArray(job.categories)){
            job.categories.slice(0,3).forEach(category => {
            const label = document.createElement('p')
            label.classList.add('label_tag')
            label.textContent = category.replaceAll('-',' ')
            labels.appendChild(label)
         })
        }

        const viewBtn = document.createElement('button')
        viewBtn.classList.add('job_viewer')
        viewBtn.textContent = 'View Job'
        viewBtn.addEventListener('click', function(){
        window.open(job.guid, '_blank')
        })


        card.appendChild(title)
        card.appendChild(info)
        card.appendChild(description)
        card.appendChild(labels)
        card.appendChild(viewBtn)

        container.appendChild(card)


    })

}


window.onload = async function(){
    const response = await fetch(`https://himalayas.app/jobs/api/search?q=${query}&limit=20`)
    const data = await response.json();
    getJobs(data.jobs)
}
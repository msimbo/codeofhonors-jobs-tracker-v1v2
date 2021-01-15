const searchForm = document.querySelector('#search-form')
const jobType = document.querySelector('#job-type')
const resultSection = document.querySelector('#result-section')

const SEARCH_COUNTRY = 'us'


searchForm.addEventListener('submit', async function (e) {
  e.preventDefault()

  const jobName = jobType.value


  let jobResults = await searchJobs(jobName)


  let jobs = jobResults.results // this is an Array

  let jobsFound = jobResults.count

  resultSection.innerHTML = `
<div id="result-section" class="p-16">

<h1>${jobsFound} jobs found for <strong>${jobName}</strong> in ${SEARCH_COUNTRY.toUpperCase()}</h1>

</div>`
  jobs.forEach(function (job) {
    const div = document.createElement('div')
    div.innerHTML = `
       <div class="rounded cursor-pointer hover:bg-blue-400">
          <h4 class="p-2 my-4 border-2 border-blue-400 whitespace-nowrap shadow-2xl">
                <a href="${job.redirect_url}">
                       ${job.title}
                </a> | ${job.location.display_name}
          </h4>
           <p>
               ${job.description}
           </p>
       </div>`
    resultSection.appendChild(div)
  })
})

async function searchJobs (jobString, jobsCount = 3, country = SEARCH_COUNTRY) {

  const url = `http://api.adzuna.com/v1/api/jobs/${country}/search/1?app_id=a7547f34&app_key=92b62ee9bfd90c11c097004b51438beb&results_per_page=${jobsCount}&what=${jobString}&content-type=application/json`
  console.log(url)

  const result = await fetch(url)
  const data = await result.json()

  return data
}
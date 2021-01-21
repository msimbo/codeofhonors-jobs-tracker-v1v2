const searchForm = document.querySelector('#search-form')
const jobType = document.querySelector('#job-type')
const resultSection = document.querySelector('#result-section')
const searchHeader = document.querySelector('#app')
const SEARCH_COUNTRY = 'us'
//adds
// const searchCity = document.querySelector('#location1')
const searchFull = document.querySelector('#form')
const keyword = document.querySelector('#keyword')
const searchFormFull = document.querySelector('#search-page')
const like = document.querySelector('#favorite')
const allLikes = []

function likes(){
  allLikes.push(like)
  console.log(allLikes)
}
searchFull.addEventListener('submit', async function (e) {
  e.preventDefault()

  const keyName = keyword.value

  console.log(keyName)

  let keyResults = await searchJobs(keyName)
  console.log('1',keyResults)
  let keywords = keyResults.results // this is an Array
  console.log('2',keywords)
  let keywordsFound = keyResults.count
  console.log('3',keywordsFound)
  resultSection.innerHTML = `

  <div id="result-section" class="p-10">
  
      <h1>${keywordsFound} jobs found for <strong>${keyName}</strong> in ${SEARCH_COUNTRY.toUpperCase()}</h1>
  
  </div>`

  keywords.forEach(function (key) {
    const div = document.createElement('div')
    div.innerHTML = `
       <div class="rounded cursor-pointer border-2 border-blue-900 shadow-lg my-2 hover:bg-blue-400">
          <h4 class="p-2 border-2 border-blue-400 bg-blue-500 text-white whitespace-nowrap shadow-2xl">
                <a href="${key.redirect_url}">
                       ${key.title}
                </a> | ${key.location.display_name} 
          </h4>
           <p  class="p-2">
               ${key.description}
           </p>
       </div>`
    resultSection.appendChild(div)

    searchHeader.classList.remove('hidden')
    searchFormFull.classList.add('hidden')
    // console.log(searchFull.classList)
  })
})
//end adds

searchForm.addEventListener('submit', async function (e) {
  e.preventDefault()

  const jobName = jobType.value

  console.log(jobName)

  let jobResults = await searchJobs(jobName)
  console.log('1',jobResults)
  let jobs = jobResults.results // this is an Array
  console.log('2',jobs)
  let jobsFound = jobResults.count
  console.log('3',jobsFound)
  resultSection.innerHTML = `

  <div id="result-section mt-56" class="p-10">
      <h2 class=" text-xl bg-blue-400 shadow-lg text-center rounded p-2">Search results</h2>
      <h1 class="text-center rounded p-2 text-xl bg-blue-400 text-white">${jobsFound} jobs found for <strong>${jobName}</strong> in ${SEARCH_COUNTRY.toUpperCase()}</h1> 
  </div>`

  jobs.forEach(function (job) {
    const div = document.createElement('div')
    div.innerHTML = `
       <div class="rounded flex flex-col justify-between cursor-pointer border-2 border-blue-900 shadow-lg my-2 hover:bg-blue-400">
          <h4 class="p-2 border-2 border-blue-400 bg-blue-500 text-white whitespace-nowrap shadow-2xl">
                
                <a href="${job.redirect_url}">
                       ${job.title}
                 </a>| ${job.location.display_name} 
                 
                  <div>
                   <a class="far fa-heart" id="favorite">Like</a>  
                   <a class="far fa-heart"></a>          
                   <a class="twitter-share-button" href="https://twitter.com/intent/tweet">Tweet</a>
                   <link rel="canonical" href="/web/tweet-button">
                 </div>
                
                
                
          </h4>
           <p  class="p-2">
               ${job.description}
           </p>
       </div>`
    resultSection.appendChild(div)

    // searchHeader.classList.remove('hidden')
    // // searchFull.classList.add('hidden')
    // console.log(searchFull.classList)
  })
})

async function searchJobs (jobString, jobsCount = 8, country = SEARCH_COUNTRY) {

  const url = `http://api.adzuna.com/v1/api/jobs/${country}/search/1?app_id=a7547f34&app_key=92b62ee9bfd90c11c097004b51438beb&results_per_page=${jobsCount}&what=${jobString}&content-type=application/json`
  console.log(url)

  const result = await fetch(url)
  const data = await result.json()

  return data
}
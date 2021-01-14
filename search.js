// Select by ID
const newUserBtn = document.querySelector('#get-user')
 
async function generateRandomUser() {
    // const url = 'https://randomuser.me/api/?gender=female'
    // const url = 'https://developer.adzuna.com/swagger/spec/adzuna.json'
     const url = 'https://jobs.github.com/positions.json?description=python&location=new+york'
    const result = await fetch(url)

    const user = []
    const remoteData = await result.json()
    console.log('[Remote Data] adzuna message: ',`Welcome ${remoteData.title}`)
// ${remoteData.required[0].name.last} from ${remoteData.required[0].location.country}

}

// function addUserToPage(){
//     console.log('user added to page')
// }

newUserBtn.addEventListener('click', function () {

    // 1. generate a random user and wealth
    generateRandomUser()

    // 2. add the user to the page
    // addUserToPage()
})
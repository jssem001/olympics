// Javascript file

//GET Request for main article
fetch('http://localhost:5000/main')
 .then(response => {
    return response.json()
})
 .then(data => {
    for(let y of data) {
        
        document.getElementById('mainCon').innerHTML += 
        `<a href="article1.html"><p class="postHeadline">${y.headline}</a>
        <br>${y.subhead}</p>
        <img id=mainImg style="float: right;" src=${y.image}>`;    
    }
    
})


//GET Request for articles
fetch('http://localhost:5000/articles')
 .then(response => {
    return response.json()
})
 .then(data => {
    for(let x of data) {
        document.getElementById('latestPost').innerHTML += 
        `<section id="postCon2">
        <p class="postHeadline">${x.headline}</p>
        <img id=postCon3Img src=${x.image} alt="story image">
        <p class="postSubhead">${x.subhead}</p>
        <button  class="postSubhead"style="font-size:14px" onclick="editPost(${x.id})">Update <i class="fa fa-pencil"></i></button>
        </section>`
        }    
})

//New Post
document.getElementById("newPost").addEventListener("submit",function(event){
    event.preventDefault()
    const newheadline = document.getElementById('newHeadline').value
    const newimage = document.getElementById('image-input').value
    const newsubhead = document.getElementById('subhead').value
    let newid = Math.floor(Math.random() * 1000)
    console.log(newheadline,newimage,newsubhead)
    fetch('http://localhost:5000/articles', {
    method: "POST",
    body: JSON.stringify({
        id: `${newid}`,
        headline: newheadline,
        image: newimage,
        subhead: newsubhead,
        likes: 0,
    }),
    headers: {
        'Content-type': 'application/json',
    },
    })
    .then((response) => response.json())
    .then((json) => console.log(json));

})

//Update Post
function editPost(id){
    fetch(`http://localhost:5000/articles/${id}`)
     .then(response => {
        return response.json()
    })
     .then(data => {
        const updated = document.getElementById('updateCon')
        updated.innerHTML = `
        <form id="updatePost">
                    <label for="updateHeadline" class="postForm">Update A Post</label>
                    <input id="updateHeadline" value="${data.headline}" class="postForm" placeholder="Headline..." type="text">
                    <input id="updateImage" value="${data.image}" class="postForm" type="text"  placeholder="Image URL">
                    <input id="updateSubhead" value="${data.subhead}" class="postForm" placeholder="Subheading..."  rows="4" type="text">
                    <button  id="postButton" class="postForm" type="submit" onclick="update_post(${id})">Add <i class="fa fa-upload"></i></button>
        </form>
        `   
    })
}

function update_post(id){
    
    const newheadline = document.getElementById('updateHeadline').value
    const newimage = document.getElementById('updateImage').value
    const newsubhead = document.getElementById('updateSubhead').value

    console.log(newheadline,newimage,newsubhead)
    fetch(`http://localhost:5000/articles/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
        headline: newheadline,
        image: newimage,
        subhead: newsubhead,
    }),
    headers: {
        'Content-type': 'application/json',
    },
    })
    .then((response) => response.json())
    .then((json) => console.log(json));

    
}












//***BONUS FEATURE*** uncomment to use


//PARIS 2024 coundown clock with help from w3school.com
let now; let later; let days; let hours; let minutes; let seconds 
// Set the date we're counting down to
var countDownDate = new Date("Jul 26, 2024 20:24:00").getTime();
// Update the count down every 1 second
var x = setInterval(() => {    
// Get today's date and time
now = new Date().getTime();   
// Find the distance between now and the count down date
later = countDownDate - now;    
// Time calculations for days, hours, minutes and seconds
days = Math.floor(later / (1000 * 60 * 60 * 24)); hours = Math.floor((later % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
minutes = Math.floor((later % (1000 * 60 * 60)) / (1000 * 60)); seconds = Math.floor((later % (1000 * 60)) / 1000);  
// Display the result in the element with id="paris"
document.getElementById("paris").innerHTML = "PARIS 2024 "+ days + "d " + hours + "h "+ minutes + "m " + seconds + "s ";}, 1000);
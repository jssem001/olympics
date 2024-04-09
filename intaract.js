// Javascript file

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

//GET request for likes
fetch('http://localhost:3000/articles/1')
 .then(response => {
    return response.json()
})
 .then(data => {
    let likeCount = data.likes
    document.getElementById('like-count').innerHTML = `${likeCount} likes`    
})
 .catch(error => {
    console.log('An Error occured: ', error)
})

fetch('http://localhost:3000/comments')
 .then(response => {
    return response.json()
})
 .then(data => {
    for(let c of data) {
    document.getElementById('comments-list').innerHTML += `<li>${c.content}</li>`
    }
})
 .catch(error => {
    console.log('An Error occured: ', error)
})

//POST request for comments 
document.getElementById("comment-form").addEventListener('submit',function(event){
    event.preventDefault()
    let comment = document.getElementById('comment').value 

    console.log(comment)
    fetch('http://localhost:3000/comments', {
        method: 'POST',
        body: JSON.stringify({
            imageId: 1,
            content: comment,
        }),
        headers: {
            'Content-type': 'application/json',
        },
    })
    .then((data) => data.json())
    .then((response) => 
     console.log('comment added'));

})

//Updating number of likes on the post.
//GET request and then PATCH request
document.getElementById("like-button").addEventListener('click',function(event){
    event.preventDefault()
    
    fetch('http://localhost:3000/articles/1')
     .then(response => {
        return response.json()
        })
     .then(data => {
        let likeCount = data.likes
        likeCount++
        const updatedData = {
            likes: likeCount
          }
        return fetch('http://localhost:3000/articles/1', {
            method: 'PATCH',
            body: JSON.stringify(updatedData),
            headers: {
                'Content-type': 'application/json',
                Accept: 'application/json'
            },
        })
        })

        .then((data) => data.json())
        .then((response) => {
            document.getElementById('like-count').innerHTML = `${likeCount} likes`
            console.log("Post liked!", response)
        });
})
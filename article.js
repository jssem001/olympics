//Article Page javacript

//GET Request for main article
fetch('https://olympics-2tbr.onrender.com/main')
 .then(response => {
    return response.json()
})
 .then(data => {
    
    for(let k of data){
        document.getElementById('mainConX').innerHTML += 
        `<p class="postHeadline">${k.headline}
        <br><br>${k.story}</p>
        <img id=mainImg style="float: right;" src=${k.image}>`
    }
})



//GET request for likes
fetch('https://olympics-2tbr.onrender.com/main/1')
 .then(response => {
    return response.json()
})
 .then(data => {
    let likeCount = data.likes
    document.getElementById('like-count').innerHTML = `${likeCount}`    
})


//GET request to retrieve comments
fetch('https://olympics-2tbr.onrender.com/comments')
 .then(response => {
    return response.json()
})
 .then(data => {
    for(let c of data) {
    document.getElementById('comments-list').innerHTML += 
    `<li id='${c.id}' onclick='deletefunction(this,${c.id})'>${c.content}  <span style='font-size: 10px'> &#10060;</span></li>`
    }
})


//addding a comment with POST request 
document.getElementById("comment-form").addEventListener("submit",function(event){
    event.preventDefault()
    let comment = document.getElementById('comment').value 
    let newid = Math.floor(Math.random() * 1000)
    console.log(comment)
    fetch('https://olympics-2tbr.onrender.com/comments', {
        method: "POST",
        body: JSON.stringify({
            id: `c${newid}`,
            imageId: 1,
            content: comment,
        }),
        headers: {
            'Content-type': 'application/json',
        },
    })
    .then((data) => data.json())
    .then((comment) => console.log(comment));

})

//Updating number of likes on the post.
//GET request and then PATCH request
document.getElementById("like-button").addEventListener('click',function(event){
    event.preventDefault()
    
    fetch('https://olympics-2tbr.onrender.com/main/1')
     .then(response => {
        return response.json()
        })
     .then(data => {
        let likeCount = data.likes
        likeCount++
        return fetch('https://olympics-2tbr.onrender.com/main/1', {
            method: 'PATCH',
            body: JSON.stringify({
                likes: likeCount
            }),
            headers: {
                'Content-type': 'application/json',
                //Accept: 'application/json'
            },
        })
        })
        .then((data) => data.json())
        .then((response) => {
            document.getElementById('like-count').innerHTML = `${likeCount}`
            console.log("Post liked!", response)
        });
})



//Deleting a comment
function deletefunction(el,id){
    let goneId = id
    let element = el
    element.remove()
    // event.preventDefault()
    fetch(`https://olympics-2tbr.onrender.com/comments/${goneId}`, {
    method: 'DELETE',
    headers: {
         'Content-type': 'application/json',
         Accept: 'application/json'
     }
     })
      .then(response => console.log(response));


}





//***BONUS FEATURE*** uncomment to use


//PARIS 2024 coundown clock sourced from w3schools.com (https://www.w3schools.com/howto/howto_js_countdown.asp)
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
// Javascript file

//GET Request for articles
fetch('http://localhost:3000/articles')
 .then(response => {
    return response.json()
})
 .then(data => {
    for(let x of data) {
        document.getElementById('latestPost').innerHTML += 
        `<section id="postCon1">
        <p class="postHeadline">${x.headline}</p>
        <img id=postCon3Img src=${x.image} alt="hockey">
        <p>${x.subhead}</p>
        </section>`
        }    
})


//GET request for likes
fetch('http://localhost:3000/articles/1')
 .then(response => {
    return response.json()
})
 .then(data => {
    let likeCount = data.likes
    document.getElementById('like-count').innerHTML = `${likeCount}`    
})


//GET request to retrieve comments
fetch('http://localhost:3000/comments')
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
    fetch('http://localhost:3000/comments', {
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
    
    fetch('http://localhost:3000/articles/1')
     .then(response => {
        return response.json()
        })
     .then(data => {
        let likeCount = data.likes
        likeCount++
        return fetch('http://localhost:3000/articles/1', {
            method: 'PATCH',
            body: JSON.stringify({
                likes: likeCount
            }),
            headers: {
                'Content-type': 'application/json',
                Accept: 'application/json'
            },
        })
        })
        .then((data) => data.json())
        .then((response) => {
            document.getElementById('like-count').innerHTML = `${likeCount}`
            console.log("Post liked!", response)
        });
})

//New Post
document.getElementById("newPost").addEventListener("submit",function(event){
    event.preventDefault()
    const newheadline = document.getElementById('newHeadline').value
    const newimage = document.getElementById('image-input').value
    const newsubhead = document.getElementById('subhead').value

    console.log(newheadline,newimage,newsubhead)
    fetch('http://localhost:3000/articles', {
    method: "POST",
    body: JSON.stringify({
        headline: newheadline,
        image: newimage,
        subhead: newsubhead,
        likes: 0
    }),
    headers: {
        'Content-type': 'application/json'
    },
    })
    .then((response) => response.json())
    .then((json) => console.log(json));

})


//Deleting a comment
function deletefunction(el,id){
    let goneId = id
    let element = el
    element.remove()
    // event.preventDefault()
    fetch(`http://localhost:3000/comments/${goneId}`, {
    method: 'DELETE',
    headers: {
         'Content-type': 'application/json',
         Accept: 'application/json'
     }
     })
      .then(response => console.log(response));


}





//***BONUS FEATURE*** uncomment to use


// //PARIS 2024 coundown clock with help from w3school.com
// let now; let later; let days; let hours; let minutes; let seconds 
// // Set the date we're counting down to
// var countDownDate = new Date("Jul 26, 2024 20:24:00").getTime();
// // Update the count down every 1 second
// var x = setInterval(() => {    
// // Get today's date and time
// now = new Date().getTime();   
// // Find the distance between now and the count down date
// later = countDownDate - now;    
// // Time calculations for days, hours, minutes and seconds
// days = Math.floor(later / (1000 * 60 * 60 * 24)); hours = Math.floor((later % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
// minutes = Math.floor((later % (1000 * 60 * 60)) / (1000 * 60)); seconds = Math.floor((later % (1000 * 60)) / 1000);  
// // Display the result in the element with id="paris"
// document.getElementById("paris").innerHTML = "PARIS 2024 "+ days + "d " + hours + "h "+ minutes + "m " + seconds + "s ";}, 1000);
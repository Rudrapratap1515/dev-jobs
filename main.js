var pageValue = 1;
var searchedLocation = '';
var searchedCompany = '';
var jobCardsBox = '';
var fullTimeCheck = '';
function fetchJobs() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(JSON.parse(xhttp.responseText))
            cardCreator(JSON.parse(xhttp.responseText))
        }
    };
    xhttp.open("GET", `https://jobs.github.com/positions.json?page=${pageValue}`, true);
    xhttp.send();
}

function loadMoreData(){
    pageValue = pageValue + 1;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cardCreator(JSON.parse(xhttp.responseText))
        }
    };
    xhttp.open("GET", `https://jobs.github.com/positions.json?page=${pageValue}`, true);
    xhttp.send();
}

function searchFilter(){
    searchedCompany = document.getElementById('searched-company').value;
    searchedLocation = document.getElementById('searched-location').value;
    fullTimeCheck = document.getElementById('full-time-check').checked;
    if(searchedLocation || searchedCompany || fullTimeCheck == true){
        jobCardsBox = '';
        console.log(jobCardsBox);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log(JSON.parse(xhttp.responseText))
                cardCreator(JSON.parse(xhttp.responseText))
            }
        };
        xhttp.open("GET", `https://jobs.github.com/positions.json?description=${searchedCompany}&location=${searchedLocation}&full_time=${fullTimeCheck}&page=${pageValue}`, true);
        xhttp.send();
    }
}

function fetchPersonalId() {
    console.log(this.id);
    window.open("file:///Users/rudrapratapsinghrathore/Documents/Frontend%20Projects/Jobs%20Project/company_details.html?id=" + this.id);
}

function cardCreator(dataArray){
    jobCardsBox = document.getElementById('job-card-box');
    dataArray.map(item => {
        var card = document.createElement('div');
        card.classList.add('job-card');
        card.setAttribute('id',item.id);
        card.addEventListener('click',fetchPersonalId)
        var img = document.createElement('img');
        img.classList.add('company-logo');
        img.src = item.company_logo ? item.company_logo : 'https://jobs.github.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcjZjIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--ab6573768561d1943a43b1ec5775a465ccb31ca1/YNAB_wordmark_blue-LG.png';
        card.appendChild(img);
        var timeStamp = document.createElement('div');
        timeStamp.classList.add('time-stamp');
        timeStamp.innerHTML = '5h ago . ' + item.type;
        card.appendChild(timeStamp);
        var jobPost = document.createElement('h3');
        jobPost.classList.add('post-name');
        jobPost.innerHTML = item.title;
        card.appendChild(jobPost);
        var companyName = document.createElement('div');
        companyName.classList.add('time-stamp');
        companyName.innerHTML = item.company;
        card.appendChild(companyName);
        var location = document.createElement('div');
        location.classList.add('location');
        location.innerHTML = item.location;
        card.appendChild(location);
        jobCardsBox.append(card);
    })
}
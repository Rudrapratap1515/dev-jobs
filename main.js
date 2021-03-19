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
        emptyContainer();
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

function emptyContainer(){
    while (jobCardsBox.firstChild) {
        jobCardsBox.removeChild(jobCardsBox.firstChild);
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
        card.addEventListener('click',fetchPersonalId);
        var card_content = `
            <img class = "company-logo" id = "${item.id}" src="${item.company_logo || 'https://www.market-research-companies.in//images/default.jpg'}"/>
            <div class = "time-stamp">${item.type}</div>
            <h3 class = "post-name">${item.title}</h3>
            <div class = "time-stamp">${item.company}</div>
            <div class = "location">${item.location}</div>
        `;
        card.innerHTML = card_content; 
        jobCardsBox.append(card);
    })
}
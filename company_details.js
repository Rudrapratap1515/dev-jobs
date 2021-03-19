var params = new URLSearchParams(window.location.search)
var id = params.get("id");

getCompanyDetails(id);

function getCompanyDetails(companyId){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            getDescription(JSON.parse(xhttp.responseText));
        }
    };
    xhttp.open("GET", `https://jobs.github.com/positions/${companyId}.json`, true);
    xhttp.send();
}

function getDescription(companyData){
    document.getElementsByClassName('heading-company-logo')[0].src = companyData.company_logo || 'https://www.market-research-companies.in//images/default.jpg';
    document.getElementsByClassName('post-name')[0].innerHTML = companyData.company;
    document.getElementsByClassName('post-name')[1].innerHTML = companyData.title;
    document.getElementsByClassName('time-stamp')[0].innerHTML = cleanUrl(companyData.company_url);
    document.getElementsByClassName('hidden-url')[0].href = companyData.company_url;
    document.getElementsByClassName('time-stamp')[1].innerHTML = "1m ago . " + companyData.type;
    document.getElementsByClassName('time-stamp')[2].innerHTML = companyData.description;
    document.getElementsByClassName('time-stamp')[3].innerHTML = companyData.how_to_apply;
    document.getElementsByClassName('location')[0].innerHTML = companyData.location;
}

function cleanUrl(url){
    if(url.includes('www') && url.includes('https')){
        return url.slice(url.indexOf('.') + 1);
    } else if(url.includes('www')){
        return url.slice(url.indexOf('.'));
    } else if(url.lastIndexOf('.') != -1) {
        return url.slice(url.indexOf('/') + 2,url.lastIndexOf('.') + 3);
    } else {
        return url.slice(url.indexOf('/') + 2);
    }
}
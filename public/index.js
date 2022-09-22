// this async function orchestrates the different flows based on user's input by calling other functions below
async function orchestrate() {
    // hide any previous short URL
    showShortUrl("");
    showAlert(false);

    const longUrlInput = document.getElementById("longUrlInput").value;
    
    const longUrlResponse = await callLongUrlRoute(longUrlInput);

    if (longUrlResponse.status == 200) {
        const longUrlResponseJson = await longUrlResponse.json();
        showShortUrl(longUrlResponseJson.short_url);
    }
    else if (longUrlResponse.status == 400) {
        showAlert(true, "URL not valid, please try again.");
    }
    else if (longUrlResponse.status == 404) {
        createShortUrl(longUrlInput);
    }
    else {
        showAlert(true, "Server Error, try again another time.");
    }
}

// this isolated async function calls the GET endpoint to retrieve URL record using its Long URL
async function callLongUrlRoute(longUrlInput) {
    let result;

    const routeEndpoint = "http://asnawi-url-shortener.herokuapp.com:80/api/url/?longUrl=" + longUrlInput;
    await fetch(routeEndpoint, {
        method: "GET"
    })
    .then(res => result = res)
    .catch(error => result = { status: "Error", error });

    return result;
}

// this semi-isolated function calls the POST endpoint to create new URL record
// it also reveals the short URL by calling showShortUrl function
function createShortUrl(longUrlInput) {
    var payload = {
        "longUrl": longUrlInput
    }

    fetch("http://asnawi-url-shortener.herokuapp.com:80/api/url/", {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => res.json())
    .then(res => {
        showShortUrl(res.shortUrl);
    })
    .catch(error => console.log(error));
}

// this isolated function handles the frontend aspect using DOM and CSS
function showShortUrl(res) {
    document.getElementById("shortUrlOutput").style.display = "none";
    if (res) {
        document.getElementById("shortUrlOutput").style.display = "block";
        document.getElementById("shortUrlInputBox").value = res;
    }
}

// this isolated function handles the frontend aspect using DOM
function showAlert(isNotValidOrError, message) {
    let htmlString = `<div class="alert alert-danger" role="alert">${message}</div>`;
    if (!isNotValidOrError) {
        htmlString = "";
    }
    document.getElementById("alert").innerHTML = htmlString;
}
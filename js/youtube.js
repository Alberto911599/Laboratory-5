let url = "https://www.googleapis.com/youtube/v3/search?key=AIzaSyA2UQVUzR-_LXbVopkevmAeTEmAWxeZ15Q&part=snippet&maxResults=10&q=";
let nextPage;
let prevPage;
let cont = -1;


function youtubeAPI(){
	$("#searchBtn").on("click", function(e){
        e.preventDefault();
        cont = 0;
        let localUrl = url + $("#searchTerm").val();
        loadResults(localUrl);
    });

    $("#loadMoreBtn").on("click", function(e){
        e.preventDefault();
        let localUrl = url + $("#searchTerm").val();
        if(cont >= 0){
            localUrl += '&pageToken=' + nextPage;
        }
        cont++;
        loadResults(localUrl);
    });

    $("#loadPrevBtn").on("click", function(e){
        e.preventDefault();
        let localUrl = url + $("#searchTerm").val();
        if(cont > 0){
            localUrl += '&pageToken=' + prevPage;
            cont--;
        }
        loadResults(localUrl);
    });
}

function loadResults(localUrl){
    $.ajax({
        url:(localUrl), //url/endpointToAPI,
        method: "GET", 
        data: {}, //Info sent to the API
        dataType : "json", //Returned type od the response
        ContentType : "application/json", //Type of sent data in the request (optional)
        success : function(responseJSON){
            $(".results").empty();
            nextPage = responseJSON.nextPageToken;
            prevPage = responseJSON.prevPageToken;
            console.log(prevPage);
            for(var i = 0; i < responseJSON.pageInfo.resultsPerPage; i++){
                let urlToVideo = 'https://www.youtube.com/watch?v=' + responseJSON.items[i].id.videoId;
                $(".results").append(`
                                <p id="videoTitle" onclick="openInNewTab('${urlToVideo}')">
                                    ${responseJSON.items[i].snippet.title}
                                </p>
                                <img src= "${responseJSON.items[i].snippet.thumbnails.high.url}"
                                onclick="openInNewTab('${urlToVideo}')"/>
                            `);
            }
        }, 
        error: function(err){
            console.log(err);
        }
    });
}

function openInNewTab(urlToVideo){
    var win = window.open(urlToVideo, '_blank');
    win.focus();
}

youtubeAPI();
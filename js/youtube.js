let url = "https://www.googleapis.com/youtube/v3/search?key=AIzaSyA2UQVUzR-_LXbVopkevmAeTEmAWxeZ15Q&part=snippet&maxResults=10&q=";
let nextPage = 'undefined';


function youtubeAPI(){
	$("#searchBtn").on("click", function(e){
        e.preventDefault();
        loadResults();
    });

    $("#loadMoreBtn").on("click", function(e){
        e.preventDefault();
        loadResults();
    });
}

function loadResults(){
    let localUrl = url + $("#searchTerm").val();
    if(nextPage != 'undefined'){
        localUrl += '&pageToken=' + nextPage;
    }
    $.ajax({
        url:(localUrl), //url/endpointToAPI,
        method: "GET", 
        data: {}, //Info sent to the API
        dataType : "json", //Returned type od the response
        ContentType : "application/json", //Type of sent data in the request (optional)
        success : function(responseJSON){
            for(var i = 0; i < responseJSON.pageInfo.resultsPerPage; i++){
                let urlToVideo = 'https://www.youtube.com/watch?v=' + responseJSON.items[i].id.videoId;
                nextPage = responseJSON.nextPageToken;
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
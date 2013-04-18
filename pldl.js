var fs = require('fs');
var ytdl = require('ytdl');
var gapis = require('googleapis');

gapis.discover('youtube', 'v3')
    .execute(function (err, client) {
        var request = client.youtube.playlistItems.list({
            part: 'snippet,contentDetails',
            playlistId: 'PLP6DbQBkn9ymGQh2qpk9ImLHdSH5T7yw7',
            maxResults: 50
        });

        request
            .withApiKey('KEY')
            .execute(function (err, response) {

            response.items.forEach(function (item, index, array) {

                var url = 'http://www.youtube.com/watch?v=' + item.contentDetails.videoId;

                console.log("Downloading: " + url);

                ytdl(url, {
                    output: 'stdout',
                    filter: function (format) {
                        return format.container === 'mp4'
                    }
                }).pipe(fs.createWriteStream(item.snippet.title + '.mp4'));
            });
        });
    });


//https://github.com/google/google-api-nodejs-client

//https://developers.google.com/apis-explorer/#p/youtube/v3/youtube.playlistItems.list?part=contentDetails&maxResults=50&playlistId=PLP6DbQBkn9ymGQh2qpk9ImLHdSH5T7yw7&_h=8&

//https://github.com/fent/node-ytdl



var fs = require('fs');
var ytdl = require('ytdl');
var gapis = require('googleapis');

exports.ytpldl = function (apiKey, playlistId) {
    gapis.discover('youtube', 'v3')
        .execute(function (err, client) {
            var request = client.youtube.playlistItems.list({
                part: 'snippet,contentDetails',
                playlistId: playlistId,
                maxResults: 2
            });

            request.withApiKey(apiKey)
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
};
'use strict';

const logger = require('./src/utils/logger');

const config = require('./src/config/configuration');

// var search = require('youtube-search');
const youtubeService = require('./src/youtube/youtube_service');
const youtubeConfig = {
    key: 'xxx'
};
var opts = {
    maxResults: 2,
    channelId: 'xxx',
    part: 'snippet',

    // playlistId: 'xxx',
    type: 'video',

    pageToken: null,
};

const commentParams = {
    maxResults: 1,
    part: 'snippet',
    videoId: 'xxx',
    // pageToken: 'xxx'
};

return youtubeService.init(youtubeConfig)
    .then(function() {
        // return youtubeService.getComments(commentParams);
        //listPlaylist(opts);
        return youtubeService._getComments('xxx');
        //getVideoDetail('xxx');
        //fetchAllVideosFromChannel('xxx', []);
        //search(opts);
    })
    .then(function(res) {
        // res.forEach(function(item) {
        //     console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
        //     console.log('Video id: ', item.id.videoId);
        //     console.log('title: ', item.snippet.title);
        //     console.log('Description: ', item.snippet.description);
        //     console.log('publishedAt: ', item.snippet.publishedAt);
        //     console.log('thumbnails: ');
        //     console.log('\tdefault: ', item.snippet.thumbnails.default.url);
        //     console.log('\tmedium: ', item.snippet.thumbnails.medium.url);
        //     console.log('\thigh: ', item.snippet.thumbnails.high.url);
        // });
        console.log(JSON.stringify(res, null, 3));
    })
    .catch(function(err) {
        console.error(err);
    });
// search('', opts, function(err, results, pageinfo) {
//     if(err) return console.log(err);
//
//     console.log(JSON.stringify(results, null, 3));
//
//     console.log(pageinfo);
// });

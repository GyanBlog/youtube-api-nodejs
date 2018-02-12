
const uri = require('urijs');
const request = require('request-promise-native');
const logger = require('../utils/logger');

class YoutubeService {

    init(params) {
        this._baseuri = 'https://www.googleapis.com/youtube/v3/';
        this._key = params.key;

        return Promise.resolve(null);
    }

    fetchChannel(channelId) {
        const params = {
            maxResults: 10,
            channelId: 'UCNNxPxH_zIPxvWy5QMFkruA',
            part: 'snippet',
            type: 'video'
        };
        return this.fetchAllVideosFromChannel(channelId, [])
            .then(function() {
                //nextPageToken, pageInfo: {totalResults, resultsPerPage}
                //[items: {id: {videoId}, snippet: {publishedAt, channelId, title, description, thumbnails: {default: {url, width, height}, medium, high}}}]


            });
    }

    /**
     * Get snippets of all videos from a channel
     * @param channelId
     * @returns {Promise|*}
     */
    fetchAllVideosFromChannel(channelId, allVideos, nextPageToken) {
        logger.log('info', 'Fetching all videos from channel: ', channelId);

        return this._fetchAllVideosFromChannel(channelId, allVideos, nextPageToken);
    }

    search(params) {
        params.key = this._key;

        const restUri = uri(this._baseuri)
            .filename('search')
            .query(params);

        return this._doRequest(restUri);
    }

    /**
     * Get details of a video
     * @param videoId
     */
    getVideoDetail(videoId) {
        logger.log('info', 'Getting video details');

        const params = {
            key: this._key,
            id: videoId,
            part: 'snippet,contentDetails,topicDetails,statistics'
        };
        const restUri = uri(this._baseuri)
            .filename('videos')
            .query(params);

        return this._doRequest(restUri)
            .then(function(result) {
                return {
                    publishedAt: result.items[0].snippet.publishedAt,
                    title: result.items[0].snippet.title,
                    description: result.items[0].snippet.description,
                    thumbnails: {
                        default: result.items[0].snippet.thumbnails.default,
                        medium: result.items[0].snippet.thumbnails.medium,
                        high: result.items[0].snippet.thumbnails.high,
                        standard: result.items[0].snippet.thumbnails.standard,
                        maxres: result.items[0].snippet.thumbnails.maxres
                    },
                    tags: result.items[0].snippet.tags,
                    duration: result.items[0].contentDetails.duration,
                    viewCount: result.items[0].statistics.viewCount,
                    likeCount: result.items[0].statistics.likeCount,
                    commentCount: result.items[0].statistics.commentCount,
                    categories: result.items[0].topicDetails.topicCategories
                };
            });
    }

    listPlaylist(params) {
        params.key = this._key;

        const restUri = uri(this._baseuri)
            .filename('playlistItems')
            .query(params);

        return this._doRequest(restUri);
    }

    _getComments(videoId, allComments, nextPageToken) {
        const params = {
            key: this._key,
            part: 'snippet,replies',
            videoId: videoId,
            maxResults: 10,
            pageToken: nextPageToken
        };

        const restUri = uri(this._baseuri)
            .filename('commentThreads')
            .query(params);

        return this._doRequest(restUri)
            .then(function(result) {
                if (result && result.items && result.items.length > 0) {
                    allComments = allComments.concat(result.items);
                }

                if (result.nextPageToken) {
                    return this._getComments(videoId, allComments, result.nextPageToken);
                }
                else {
                    return allComments;
                }
            }.bind(this));
    }

    _doRequest(uri) {
        if (!uri) {
            return Promise.reject(new Error('Please pass uri'));
        }
        const requestParams = {
            uri: uri.toString(),
            json: true
        };
        logger.log('info', 'Requesting url: ', requestParams.uri);
        return request(requestParams);
    }

    _fetchAllVideosFromChannel(channelId, allVideos, nextPageToken) {
        let params = {
            maxResults: 10,
            channelId: channelId,
            part: 'snippet',
            type: 'video',
            pageToken: nextPageToken
        };
        return this.search(params)
            .then(function(result) {
                if (result && result.items && result.items.length > 0) {
                    allVideos = allVideos.concat(result.items);
                }

                if (result.nextPageToken) {
                    return this.fetchAllVideosFromChannel(channelId, allVideos, result.nextPageToken);
                }
                else {
                    return allVideos;
                }
            }.bind(this));
    }
}

module.exports = new YoutubeService();
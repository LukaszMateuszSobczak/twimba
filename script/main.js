import { tweetsData } from './data.js';
import { v4 as uuidv4 } from 'https://cdn.jsdelivr.net/npm/uuid@11.1.0/+esm';

const getFeedHtml = () => {
    let feedHtml = '';

    tweetsData.forEach((tweet) => {
        let feedReplays = '';
        if (tweet.replies.length > 0) {
            tweet.replies.forEach((replay) => {
                feedReplays += `
                <div class="tweet-reply">
                    <div class="tweet-inner">
                        <img src="${replay.profilePic}" class="profile-pic">
                            <div>
                                <p class="handle">${replay.handle}</p>
                                <p class="tweet-text">${replay.tweetText}</p>
                            </div>
                        </div>
                </div>
                `;
            });
        }
        feedHtml += `
        <div class="tweet">
            <div class="tweet-inner">
                <img src="${tweet.profilePic}" class="profile-pic">
                <div>
                    <p class="handle">${tweet.handle}</p>
                    <p class="tweet-text">${tweet.tweetText}</p>
                    <div class="tweet-details">
                        <span class="tweet-detail">
                        <i class="fa-regular fa-comment-dots" 
                            data-reply-icon="${tweet.uuid}"></i>
                            ${tweet.replies.length}
                        </span>
                        <span class="tweet-detail">
                        <i class="fa-solid fa-heart ${
                            tweet.isLiked ? 'liked' : ''
                        }" 
                            data-like-icon="${tweet.uuid}"></i>
                            ${tweet.likes}
                        </span>
                        <span class="tweet-detail">
                        <i class="fa-solid fa-retweet ${
                            tweet.isRetweeted ? 'retweeted' : ''
                        }" 
                        data-share-icon="${tweet.uuid}"></i>
                            ${tweet.retweets}
                        </span>
                    </div>   
                </div>            
            </div>
            <div id="replies-${tweet.uuid}" class="hidden">
                ${feedReplays}
            </div>
        </div>
        `;
    });

    return feedHtml;
};

const renderHtml = () => {
    document.querySelector('#feed').innerHTML = getFeedHtml();
};

const handleLikeClick = (tweetId) => {
    const targetTweetObj = tweetsData.find((tweet) => {
        return tweet.uuid === tweetId;
    });
    if (targetTweetObj.isLiked) {
        targetTweetObj.likes--;
    } else {
        targetTweetObj.likes++;
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked;
    renderHtml();
};

const handleRetweetClick = (tweetId) => {
    const targetTweetObj = tweetsData.find((tweet) => {
        return tweet.uuid === tweetId;
    });

    if (targetTweetObj.isRetweeted) {
        targetTweetObj.retweets--;
    } else {
        targetTweetObj.retweets++;
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted;
    renderHtml();
};

const handleReplayClick = (tweetId) => {
    document.querySelector(`#replies-${tweetId}`).classList.toggle('hidden');
};

const handleTweetBtnClick = () => {
    const tweetInput = document.querySelector('#tweet-input');

    if (tweetInput.value !== '') {
        let newTweet = {
            handle: `@Scrimba`,
            profilePic: `images/scrimbalogo.png`,
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4(),
        };
        tweetsData.unshift(newTweet);
        renderHtml();
        tweetInput.value = '';
    }
};

document.addEventListener('click', (event) => {
    if (event.target.dataset.replyIcon) {
        handleReplayClick(event.target.dataset.replyIcon);
    } else if (event.target.dataset.likeIcon) {
        handleLikeClick(event.target.dataset.likeIcon);
    } else if (event.target.dataset.shareIcon) {
        handleRetweetClick(event.target.dataset.shareIcon);
    } else if (event.target.id === 'tweet-btn') {
        handleTweetBtnClick();
    }
});

renderHtml();

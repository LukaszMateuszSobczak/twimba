import { tweetsData } from './data.js';

const tweetInput = document.querySelector('#tweet-input');
const tweetBtn = document.querySelector('#tweet-btn');

tweetBtn.addEventListener('click', () => {
    console.log(tweetInput.value);
});

const getFeedHtml = () => {
    let feedHtml = '';
    tweetsData.forEach((tweet) => {
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
        if (tweet.uuid === tweetId) {
            return tweet;
        }
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

document.addEventListener('click', (event) => {
    if (event.target.dataset.replyIcon) {
        console.log(event.target.dataset.replyIcon, 'reply');
    } else if (event.target.dataset.likeIcon) {
        handleLikeClick(event.target.dataset.likeIcon);
    } else if (event.target.dataset.shareIcon) {
        handleRetweetClick(event.target.dataset.shareIcon);
    }
});

renderHtml();

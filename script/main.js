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
                        <i class="fa-solid fa-heart" 
                            data-like-icon="${tweet.uuid}"></i>
                            ${tweet.likes}
                        </span>
                        <span class="tweet-detail">
                        <i class="fa-solid fa-retweet" 
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

const renderHtml = (elementToRender, destinationElement) => {
    destinationElement.innerHTML += elementToRender;
};

const reRenderElement = (elementLocation, elementContent) => {
    elementLocation.nextSibling.textContent = elementContent;
};

const handleLikeClick = (uuid) => {
    tweetsData.forEach((tweet) => {
        if (tweet.uuid === uuid) {
            tweet.likes += 1;
            reRenderElement(
                document.querySelector(`[data-like-icon="${tweet.uuid}"]`),
                tweet.likes
            );
        }
    });
};

document.addEventListener('click', (event) => {
    if (event.target.dataset.replyIcon) {
        console.log(event.target.dataset.replyIcon, 'reply');
    } else if (event.target.dataset.likeIcon) {
        handleLikeClick(event.target.dataset.likeIcon);
    } else if (event.target.dataset.shareIcon) {
        console.log(event.target.dataset.shareIcon, 'share');
    }
});

renderHtml(getFeedHtml(), document.querySelector('#feed'));

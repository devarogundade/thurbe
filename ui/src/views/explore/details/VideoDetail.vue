<script setup lang="ts">
import LockIcon from '@/components/icons/LockIcon.vue';
import FlashIcon from '@/components/icons/FlashIcon.vue';
import LikeIcon from '@/components/icons/LikeIcon.vue';
import DislikeIcon from '@/components/icons/DislikeIcon.vue';
import ShareIcon from '@/components/icons/ShareIcon.vue';
import UserCheckIcon from '@/components/icons/UserCheckIcon.vue';
import UserGroupIcon from '@/components/icons/UserGroupIcon.vue';
import CalendarIcon from '@/components/icons/CalendarIcon.vue';
import SortIcon from '@/components/icons/SortIcon.vue';
import SmileIcon from '@/components/icons/SmileIcon.vue';
import CoinsDollarIcon from '@/components/icons/CoinsDollarIcon.vue';
import SendIcon from '@/components/icons/SendIcon.vue';

const sendTip = () => {

};

const sendComment = (text: string) => {

};
</script>

<template>
    <div class="detail_container">
        <div class="detail_container_1">
            <div class="video_wrapper">
                <img src="/images/game.png" alt="" class="thumbnail">
                <div class="restricted">
                    <LockIcon />
                    <h3>Oops, Sorry You are Ineligible to View this Content</h3>
                    <p>This channel owner only set this content to be to be viewable by Super followers only, Click the
                        button below to super follow.</p>
                    <button>
                        <FlashIcon />
                        <p>Super Follow</p>
                    </button>
                </div>
            </div>

            <div class="video_info">
                <div class="video_title">
                    <h3>Top 10 Best Cartoon Movies</h3>
                    <p>14 Hours ago</p>
                </div>

                <div class="video_reactions">
                    <div class="video_reaction">
                        <LikeIcon />
                    </div>
                    <div class="video_reaction">
                        <DislikeIcon />
                    </div>
                    <div class="video_reaction">
                        <ShareIcon />
                    </div>
                </div>
            </div>

            <div class="creator">
                <div class="creator_info">
                    <img src="/images/game.png" alt="">
                    <div class="creator_name">
                        <h3>The CartoonistGuy</h3>
                        <p><span>1,455</span> Followers</p>
                    </div>
                </div>

                <div class="creator_follow">
                    <button>
                        <UserCheckIcon />
                        <p>Following</p>
                    </button>

                    <button>
                        <FlashIcon />
                    </button>
                </div>
            </div>

            <div class="video_contents">
                <div class="video_contents_stats">
                    <div class="video_contents_stat">
                        <div class="video_contents_stat_icon">
                            <UserGroupIcon />
                        </div>
                        <div class="video_contents_stat_text">
                            <p>Views</p>
                            <h3>14,599</h3>
                        </div>
                    </div>

                    <div class="video_contents_stat">
                        <div class="video_contents_stat_icon">
                            <LikeIcon />
                        </div>
                        <div class="video_contents_stat_text">
                            <p>Likes</p>
                            <h3>14,599</h3>
                        </div>
                    </div>

                    <div class="video_contents_stat">
                        <div class="video_contents_stat_icon">
                            <CalendarIcon />
                        </div>
                        <div class="video_contents_stat_text">
                            <p>Posted On</p>
                            <h3>Jul 02, 24</h3>
                        </div>
                    </div>
                </div>

                <div class="video_contents_desc">
                    <p>
                        Lorem ipsum dolor sit amet consectetur. Proin sed non placerat neque bibendum dolor. Integer
                        porta mi tempus volutpat tempor velit ultricies risus malesuada. Scelerisque dui aliquam felis
                        amet.
                        <br> <br>
                        Vitae tortor gravida leo consequat odio. Nunc lectus semper tempor et morbi sagittis nunc nibh
                        nunc.
                        <br> <br>
                        Massa imperdiet a quis bibendum tortor nulla. In vulputate neque lectus volutpat ut purus massa.
                        hac pellentesque suspendisse enim justo commodo.Vitae tortor gravida leo consequat odio.
                        <br> <br>
                        Nunc lectus semper tempor et morbi sagittis nunc nibh nunc
                    </p>
                </div>
            </div>
        </div>
        <div class="detail_container_2">
            <div class="comment_container">
                <div class="comment_header">
                    <div class="comment_header_text">
                        <h3>Comments</h3>
                        <p>415</p>
                    </div>

                    <button class="comment_header_icon">
                        <SortIcon />
                    </button>
                </div>

                <div class="comment_list"></div>

                <div class="comment_send">
                    <div class="comment_input">
                        <input type="text" placeholder="Type your comment.." />
                        <SmileIcon />
                    </div>

                    <div class="comment_react">
                        <div class="comment_tip">
                            <CoinsDollarIcon />
                        </div>

                        <button>
                            <SendIcon />
                            <p>Comment</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.detail_container {
    display: grid;
    grid-template-columns: 650px 340px;
    gap: 30px;
    justify-content: center;
    margin-top: 60px;
}

.video_wrapper {
    width: 100%;
    height: 326px;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
}

.thumbnail {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.restricted {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    backdrop-filter: blur(6px);
    background: rgba(115, 115, 115, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    padding: 30px;
}

.restricted h3 {
    font-size: 14px;
    font-weight: 600;
    line-height: 21px;
    color: var(--bg);
    margin-top: 20px;
}

.restricted>p {
    margin-top: 10px;
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
    color: rgba(255, 255, 255, 0.8);
    width: 327px;
    max-width: 100%;
}

.restricted button {
    margin-top: 30px;
    width: 172px;
    height: 40px;
    gap: 12px;
    border-radius: 6px;
    background: var(--primary);
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
}

.restricted button p {
    font-size: 14px;
    font-weight: 500;
    line-height: 14px;
    color: var(--bg);
}

.video_info {
    margin-top: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
}

.video_title h3 {
    font-size: 14px;
    font-weight: 600;
    color: var(--tx-normal);
}

.video_title p {
    font-size: 12px;
    font-weight: 500;
    color: var(--tx-dimmed);
    margin-top: 4px;
}

.video_reactions {
    display: flex;
    align-items: center;
    gap: 20px;
}

.video_reaction {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    border: 1px solid var(--bg-darker);
    cursor: pointer;
}

.creator {
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
}

.creator_info {
    display: flex;
    align-items: center;
    gap: 16px;
}

.creator_info img {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    object-fit: cover
}

.creator_name h3 {
    font-size: 14px;
    font-weight: 500;
    color: var(--tx-normal);
}

.creator_name p {
    font-size: 12px;
    font-weight: 500;
    color: var(--tx-dimmed);
    margin-top: 4px;
}

.creator_name p span {
    color: var(--tx-normal);
}

.creator_follow {
    display: flex;
    align-items: center;
    gap: 20px;
}

.creator_follow button:first-child {
    width: 145px;
    height: 40px;
    gap: 12px;
    border-radius: 6px;
    background: var(--bg-dark);
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
}

.creator_follow button:first-child p {
    font-size: 14px;
    font-weight: 500;
    line-height: 14px;
    color: var(--tx-normal);
}

.creator_follow button:last-child {
    width: 40px;
    height: 40px;
    border-radius: 6px;
    background: var(--primary);
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
}

.video_contents {
    margin-top: 30px;
    background: var(--bg-dark);
    border-radius: 8px;
    overflow: hidden;
    width: 100%;
}

.video_contents_stats {
    border-bottom: 3px solid var(--bg);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30px 30px 24px 30px;
}

.video_contents_stat {
    width: 130px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.video_contents_stat_icon {
    width: 40px;
    height: 40px;
    border-radius: 6px;
    background: var(--bg-darker);
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
}

.video_contents_stat_text p {
    font-size: 12px;
    font-weight: 500;
    color: var(--tx-dimmed);
}

.video_contents_stat_text h3 {
    font-size: 14px;
    font-weight: 500;
    color: var(--tx-normal);
    margin-top: 4px;
}

.video_contents_desc {
    padding: 24px 30px 30px 30px;
}

.video_contents_desc p {
    font-size: 14px;
    font-weight: 500;
    line-height: 21px;
    color: var(--tx-dimmed);
}

.comment_container {
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
    position: sticky;
    top: 150px;
}

.comment_header {
    background: var(--bg-darker);
    padding: 30px 30px 24px 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--bg);
}

.comment_header_text h3 {
    font-size: 14px;
    font-weight: 600;
    line-height: 14px;
    color: var(--tx-normal);
}

.comment_header_text p {
    margin-top: 6px;
    font-size: 12px;
    font-weight: 500;
    line-height: 14.4px;
    color: var(--tx-dimmed);
}

.comment_header_icon {
    width: 40px;
    height: 40px;
    border-radius: 6px;
    background: var(--bg);
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
}

.comment_send {
    padding: 20px;
    background: var(--bg-darkest);
    border-top: 1px solid var(--bg);
}

.comment_input {
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    gap: 12px;
    border-radius: 6px;
    border: 1px solid var(--tx-dimmed);
    background: var(--bg);
    padding: 0 12px;
}

.comment_input input {
    font-size: 12px;
    font-weight: 500;
    color: var(--tx-normal);
    border: none;
    outline: none;
    width: 100%;
}

.comment_input input::placeholder {
    color: var(--tx-dimmed);
}

.comment_list {
    height: 550px;
    background: var(--bg-dark);
}

.comment_react {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 16px;
}

.comment_tip {
    width: 40px;
    height: 40px;
    border-radius: 6px;
    background: var(--bg);
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
}

.comment_react button {
    width: 150px;
    height: 40px;
    gap: 12px;
    border-radius: 6px;
    background: var(--primary);
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
}

.comment_react button p {
    font-size: 14px;
    font-weight: 500;
    line-height: 14px;
    color: var(--bg);
}
</style>
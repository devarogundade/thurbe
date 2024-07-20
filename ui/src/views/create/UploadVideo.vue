<script setup lang="ts">
import ArrowRightIcon from '@/components/icons/ArrowRightIcon.vue';
import ImportIcon from '@/components/icons/ImportIcon.vue';
import FlashIcon from '@/components/icons/FlashIcon.vue';
import UserFullIcon from '@/components/icons/UserFullIcon.vue';
import { ref } from 'vue';

const activeTab = ref<number>(1);
</script>

<template>
    <div class="upload_container">
        <div class="toolbar">
            <div class="nav_items">
                <div class="nav">
                    <ArrowRightIcon />
                    <p>Back</p>
                </div>
            </div>
            <div class="tab_items">
                <div :class="activeTab == 1 ? 'tab tab_active' : 'tab'">
                    <p>Video Details</p>
                </div>
                <div :class="activeTab == 2 ? 'tab tab_active' : 'tab'">
                    <p>Preview</p>
                </div>
            </div>
            <div class="nav_items">
                <div class="nav">
                    <ArrowRightIcon style="rotate: 180deg;" />
                    <p>Next</p>
                </div>
            </div>
        </div>

        <div class="detail_form_wrapper">
            <div class="detail_form">
                <div class="input">
                    <p class="label">Upload Video <span>*</span></p>
                    <div class="file_picker">
                        <img src="/images/game.png" alt="">
                        <div class="file_picker_text">
                            <input type="file">
                            <div class="file_picker_text_text">
                                <ImportIcon />
                                <p><span>Click to upload</span> to Upload a Video File, MP4, GIF 1920 x 1080px
                                    recommended</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="input">
                    <p class="label">Upload Video <span>*</span></p>
                    <input type="text" placeholder="John Doe" />
                </div>

                <div class="input">
                    <p class="label">Description</p>
                    <textarea name="" id="" cols="30" rows="4"
                        placeholder="What the video is about and more"></textarea>
                </div>

                <div class="input">
                    <p class="label">Thumbnail <span>*</span></p>
                    <div class="file_picker">
                        <img src="/images/game.png" alt="">
                        <div class="file_picker_text">
                            <input type="file">
                            <div class="file_picker_text_text">
                                <ImportIcon />
                                <p><span>Click to upload</span> tJPG or PNG 1920 x 1080px recommended</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="input">
                    <div class="label_wrapper">
                        <div class="label">
                            Who can view content <span>*</span>
                        </div>

                        <div class="public_check">
                            <p>Everyone Instead</p>
                            <div class="checkbox"></div>
                        </div>
                    </div>

                    <div class="viewers">
                        <div class="viewer">
                            <div class="radio"></div>
                            <div class="viewer_title">
                                <UserFullIcon />
                                <p>Followers Only</p>
                            </div>
                            <p class="viewer_desc">
                                Content is viewable to users that at least to either follow or Super follow
                            </p>
                        </div>

                        <div class="viewer">
                            <div class="radio"></div>
                            <div class="viewer_title">
                                <FlashIcon />
                                <p>Super Followers Only</p>
                            </div>
                            <p class="viewer_desc">
                                Content is only viewable by users that super follows.
                            </p>
                        </div>
                    </div>
                </div>

                <div class="input">
                    <div class="label_wrapper">
                        <div class="label">
                            Accept Tips on this Video
                        </div>

                        <div class="public_check">
                            <p>Enabled</p>
                            <div class="checkbox"></div>
                        </div>
                    </div>

                    <p class="accept_tip_desc">
                        Generate revenues from contents creation by receiving Tips from content consumers.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
.upload_container {
    top: -66px;
    position: sticky;
    z-index: 2;
}

.toolbar {
    margin-top: 60px;
    width: 100%;
    height: 40px;
    padding: 0 60px;
    border-bottom: 1px var(--bg-darkest) solid;
    display: flex;
    justify-content: space-between;
    backdrop-filter: blur(8px);
    background: rgba(255, 255, 255, 0.8);
}

.tab_items {
    display: flex;
    gap: 20px;
    height: 100%;
}

.tab {
    display: flex;
    height: 40px;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 0 20px;
    border-bottom: 2px solid transparent;
}

.tab p {
    font-weight: 500;
    font-size: 16px;
    color: var(--tx-dimmed);
}

.tab_active p {
    color: var(--tx-normal);
}

.tab_active {
    border-bottom: 2px solid var(--primary-light);
}

.nav_items {
    display: flex;
    gap: 20px;
}

.nav {
    gap: 10px;
    padding: 10px 20px;
    background: var(--bg-dark);
    border-radius: 4px 4px 0px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    user-select: none;
}

.nav p {
    font-weight: 500;
    font-size: 14px;
    color: var(--tx-normal);
}

.detail_form_wrapper {
    display: flex;
    justify-content: center;
    margin-top: 60px;
}

.detail_form {
    width: 550px;
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.input {
    width: 100%;
}

.label {
    font-size: 14px;
    font-weight: 500;
    color: var(--tx-normal);
    margin-bottom: 20px;
}

.label span {
    color: rgba(255, 0, 102, 0.6);
}

.file_picker {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.file_picker>img {
    width: 318px;
    height: 160px;
    border-radius: 8px;
    object-fit: cover;
}

.file_picker_text {
    display: flex;
    justify-content: center;
    position: relative;
}

.file_picker_text input {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
}

.file_picker_text_text {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    width: 183px;
}

.file_picker_text_text p {
    font-size: 14px;
    font-weight: 500;
    line-height: 21px;
    text-align: center;
    color: var(--tx-dimmed);
}

.file_picker_text_text p span {
    color: var(--tx-normal);
}

.input>input {
    width: 100%;
    height: 44px;
    padding: 0 14px;
    border-radius: 6px;
    border: 1px solid var(--tx-dimmed);
    font-size: 14px;
    font-weight: 500;
    color: var(--tx-normal);
    outline: none;
}

.input>textarea {
    width: 100%;
    padding: 12px 14px;
    border-radius: 6px;
    border: 1px solid var(--tx-dimmed);
    font-size: 14px;
    font-weight: 500;
    color: var(--tx-normal);
    outline: none;
    resize: none;
}

.input>input::placeholder,
.input>textarea::placeholder {
    color: var(--tx-dimmed);
}

.label_wrapper {
    display: flex;
    justify-content: space-between;
}

.viewers {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
}

.viewer {
    padding: 14px;
    border-radius: 6px;
    border: 1px solid var(--bg-darkest);
}

.viewer_title {
    display: flex;
    align-items: center;
    gap: 12px;
}

.viewer_title p {
    font-size: 14px;
    font-weight: 500;
    color: var(--tx-normal);
}

.viewer_desc {
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
    color: var(--tx-dimmed);
    margin-top: 10px;
}

.public_check p {
    font-size: 14px;
    font-weight: 500;
    color: var(--tx-semi);
}

.accept_tip_desc {
    width: 341px;
    max-width: 100%;
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
    color: var(--tx-dimmed);
}
</style>
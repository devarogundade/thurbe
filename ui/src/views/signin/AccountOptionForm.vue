<script setup lang="ts">
import CloseIcon from '@/components/icons/CloseIcon.vue';
import ImportIcon from '@/components/icons/ImportIcon.vue';
import ArrowRightIcon from '@/components/icons/ArrowRightIcon.vue';
</script>

<template>
    <div class="blur">
        <div class="container">
            <div class="close">
                <div class="back">
                    <ArrowRightIcon />
                    <p>Back</p>
                </div>
                <CloseIcon />
            </div>

            <div class="signin_profile">
                <div class="label">Proflle Pic <span>*</span></div>

                <div class="signin_profile_image">
                    <div class="signin_profile_image_bg">
                        <img src="/images/image_default.png" alt="image_default">
                    </div>

                    <div class="signin_profile_image_content">
                        <div class="signin_profile_image_text">
                            <ImportIcon />
                            <p><span>Click to upload</span> JPG or PNG 100 x 100px recommended</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="signin_input">
                <div class="label">Username <span>*</span></div>
                <input type="text" placeholder="e.g John Doe" />
            </div>

            <div class="signin_input">
                <div class="label">Email Address</div>
                <input type="text" placeholder="e.g JohnDoe@gmail.com" />
            </div>

            <div class="signin_action">
                <button>Confirm</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.blur {
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(219, 219, 219, 0.4);
    z-index: 10;
    top: 0;
    left: 0;
    backdrop-filter: blur(3px);
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    width: 420px;
    border-radius: 6px;
    padding: 30px;
    padding-top: 20px;
    background: var(--bg);
}

.close {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.close .back {
    display: flex;
    align-items: center;
    gap: 4px;
    user-select: none;
    cursor: pointer;
}

.close .back p {
    font-size: 14px;
    font-weight: 500;
    color: var(--tx-dimmed);
    margin-top: 2px;
}

.close>svg {
    width: 24px;
    height: 24px;
    border-radius: 4px;
    background: var(--bg-darkest);
    cursor: pointer;
}

.signin_action button {
    width: 360px;
    height: 50px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--primary);
    user-select: none;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    color: var(--bg);
    border: none;
}

.signin_profile {
    margin-top: -4px;
}

.label {
    font-size: 14px;
    font-weight: 500;
    color: var(--tx-normal);
}

.label span {
    color: rgba(255, 0, 102, 0.6);
}

.signin_profile_image {
    display: grid;
    grid-template-columns: 120px 240px;
    align-items: flex-end;
    width: 100%;
    margin-top: 20px;
}

.signin_profile_image_bg {
    background: var(--bg-dark);
    border: 1px dashed var(--bg-darkest);
    width: 120px;
    height: 120px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.signin_profile_image_bg img {
    width: 40px;
    height: 40px;
    object-fit: contain;
}

.signin_profile_image_content {
    display: flex;
    justify-content: center;
}

.signin_profile_image_text {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    width: 183px;
}

.signin_profile_image_text p {
    font-size: 14px;
    font-weight: 500;
    line-height: 21px;
    text-align: center;
    color: var(--tx-dimmed);
}

.signin_profile_image_text p span {
    color: var(--tx-normal);
}

.signin_input {
    width: 100%;
}

.signin_input input {
    margin-top: 20px;
    width: 100%;
    height: 44px;
    padding: 0 14px;
    border-radius: 6px;
    border: 1px solid var(--tx-dimmed);
    color: var(--tx-normal);
    font-size: 14px;
    font-weight: 500;
    outline: none;
}

.signin_input input::placeholder {
    color: var(--tx-dimmed);
}
</style>
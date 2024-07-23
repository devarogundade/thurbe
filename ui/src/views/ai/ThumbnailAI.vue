<script setup lang="ts">
import { ref } from 'vue';

const prompt = ref<string | undefined>(undefined);
</script>

<template>
    <div class="detail_form_wrapper">
        <div class="detail_form">
            <div class="about">Generate thumbnail for your video & livestream contents.</div>
            <div class="input">
                <p class="label">Prompt <span>*</span></p>
                <textarea name="" id="" cols="30" rows="4" v-model="prompt"
                    placeholder="Enter prompt to generate thumbnail"></textarea>
            </div>
            <button>Generate</button>
        </div>
    </div>
</template>


<style scoped>
.detail_form_wrapper {
    display: flex;
    justify-content: center;
    margin-top: 60px;
}

.about {
    font-size: 20px;
    font-weight: 500;
    color: var(--tx-normal);
    text-align: center;
}

.detail_form {
    width: 550px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
}

.input {
    width: 100%;
    user-select: none;
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


.input>textarea::placeholder {
    color: var(--tx-dimmed);
}

.label_wrapper {
    display: flex;
    justify-content: space-between;
}

.detail_container_1 {
    width: 650px;
}

.detail_form button {
    background: var(--primary);
    width: 140px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    gap: 10px;
    border: none;
    color: var(--bg);
    cursor: pointer;
    user-select: none;
}
</style>
<script setup lang="ts">
import { ref } from 'vue';
import StableAI from '@/scripts/stable-ai.js';
import ImportIcon from '@/components/icons/ImportIcon.vue';

const loading = ref<boolean>(false);
const prompt = ref<string | undefined>(undefined);
const imageUrl = ref<string | undefined>(undefined);
const downloadLink = ref<HTMLLinkElement | null>(null);

const generate = async () => {
    if (loading.value) return;
    if (!prompt.value) return;

    loading.value = true;

    const data = await StableAI.generate(prompt.value);

    if (data) {
        const blob = new Blob([data], { type: 'image/webp' });
        imageUrl.value = URL.createObjectURL(blob);
    }

    loading.value = false;
};

const download = () => {
    if (!imageUrl) return;
    downloadLink.value?.click();
};
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
            <button @click="generate">{{ loading ? 'Loading..' : 'Generate' }}</button>
        </div>

        <div class="output" v-if="imageUrl">
            <div class="output_image">
                <img :src="imageUrl" alt="">
            </div>
            <a :href="imageUrl" :download="'thurbeai_image.webp'" ref="downloadLink" style="display:none;"> </a>
            <button @click="download">
                <ImportIcon />
            </button>
        </div>
    </div>
</template>


<style scoped>
.detail_form_wrapper {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
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

.output {
    display: flex;
    justify-content: center;
    margin-top: 60px;
    align-items: center;
    flex-direction: column;
    position: relative;
}

.output_image {
    width: 400px;
}

.output_image img {
    width: 100%;
    border-radius: 8px;
}

.output button {
    position: absolute;
    bottom: 20px;
    z-index: 1;
    background: var(--bg-darker);
    width: 40px;
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
<script setup lang="ts">
import CloseIcon from '@/components/icons/CloseIcon.vue';
import ConfigIcon from '@/components/icons/ConfigIcon.vue';
import CopyIcon from '@/components/icons/CopyIcon.vue';
import { notify } from '@/reactives/notify';

const emit = defineEmits(['close']);

const props = defineProps({
    configs: { type: Object, required: true }
});

const copyText = (text: string) => {
    try {
        navigator.clipboard.writeText(text);

        notify.push({
            title: 'Text copied',
            description: text,
            category: 'success'
        });
    } catch (error) {
        notify.push({
            title: 'Failed to copy',
            description: 'Try again',
            category: 'error'
        });
    }
};
</script>

<template>
    <div class="blur">
        <div class="container">
            <div class="close" @click="emit('close')">
                <CloseIcon />
            </div>

            <div class="title">
                <h3>
                    <ConfigIcon /> Livestream Configs
                </h3>
                <p>Use the details sown below to broadcast a stream to your Thurbe channel.</p>
            </div>

            <div class="configs">
                <div class="config">
                    <p class="label">Stream Server</p>
                    <div class="input">
                        <p>{{ props.configs.stream_server }}</p>
                        <CopyIcon @click="copyText(props.configs.stream_server)" />
                    </div>
                </div>

                <div class="config">
                    <p class="label">Stream Key</p>
                    <div class="input">
                        <p>{{ props.configs.stream_key }}</p>
                        <CopyIcon @click="copyText(props.configs.stream_key)" />
                    </div>
                </div>

                <div class="config">
                    <p class="label">Reaction URL</p>
                    <div class="input">
                        <p>{{ props.configs.stream_reaction }}</p>
                        <CopyIcon @click="copyText(props.configs.stream_reaction)" />
                    </div>
                </div>
            </div>

            <div class="close_action">
                <button @click="emit('close')">Close</button>
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
    gap: 20px;
    width: 420px;
    border-radius: 6px;
    padding: 30px;
    padding-top: 20px;
    background: var(--bg);
}

.close {
    display: flex;
    justify-content: flex-end;
    width: 100%;
}

.close svg {
    width: 24px;
    height: 24px;
    border-radius: 4px;
    background: var(--bg-darkest);
    cursor: pointer;
}

.title {
    width: 318px;
    max-width: 100%;
    text-align: center;
}

.title h3 {
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
    color: var(--tx-normal);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
}

.title p {
    margin-top: 14px;
    font-size: 14px;
    font-weight: 500;
    line-height: 21px;
    color: var(--tx-dimmed);
}

.amount {
    width: 300px;
    height: 232px;
    border-radius: 8px;
    background: var(--bg-dark);
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 20px;
}

.amount img {
    width: 50px;
    height: 50px;
    border-radius: 8px;
    object-fit: cover;
}

.amount h3 {
    margin-top: 24px;
    font-size: 20px;
    font-weight: 500;
    line-height: 24px;
    color: var(--tx-semi);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
}

.amount input {
    border: none;
    outline: none;
    width: 50px;
    font-size: 20px;
    font-weight: 500;
    color: var(--tx-normal);
    text-align: right;
    background: none;
}

.amount input::placeholder {
    color: var(--tx-semi);
}

.amount h3 span {
    color: var(--tx-normal);
}


.configs {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 30px;
    align-items: center;
    margin-top: 20px;
}

.config {
    width: 100%;
}

.config .label {
    font-size: 14px;
    font-weight: 500;
    color: var(--tx-normal);
}

.config .input {
    width: 100%;
    height: 40px;
    border-radius: 6px;
    border: 1px solid var(--bg-darkest);
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
}

.config .input p {
    width: 85%;
    text-wrap: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 14px;
    font-weight: 500;
    color: var(--tx-semi);
}

.close_action {
    margin-top: 40px;
    width: 100%;
}

.close_action button {
    width: 100%;
    height: 50px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg-dark);
    user-select: none;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    color: var(--tx-normal);
    border: none;
}
</style>
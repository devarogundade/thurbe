<script setup lang="ts">
import CloseIcon from '@/components/icons/CloseIcon.vue';
import CoinsDollarIcon from '@/components/icons/CoinsDollarIcon.vue';
import { ref } from "vue";

const emit = defineEmits(['close', 'continue']);

const amount = ref<undefined | number>(undefined);
const props = defineProps({
    channel: { type: Object, required: true }
});
</script>

<template>
    <div class="blur">
        <div class="container">
            <div class="close" @click="emit('close')">
                <CloseIcon />
            </div>

            <div class="title">
                <h3>
                    <CoinsDollarIcon /> Tip
                </h3>
                <p>You are about to send a Tip to this Channel Creator Proceed to make payment.</p>
            </div>

            <div class="amount">
                <img src="/images/logo.png" alt="">
                <h3><input type="number" placeholder="0.00" v-model="amount"> THUB</h3>
                <p>~$0.00</p>
            </div>

            <div class="creator">
                <img :src="props.channel.image" alt="">
                <h3>{{ props.channel.name }}</h3>
            </div>

            <div class="pay">
                <button @click="emit('continue', amount?.valueOf())">Confirm</button>
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

.amount p {
    margin-top: 4px;
    font-size: 12px;
    font-weight: 500;
    color: var(--tx-semi);
}

.creator {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
    margin-top: -40px;
}

.creator img {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    object-fit: cover
}

.creator h3 {
    font-size: 14px;
    font-weight: 500;
    color: var(--tx-normal);
}


.pay {
    margin-top: 40px;
    width: 100%;
}

.pay button {
    width: 100%;
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
</style>
<script setup lang="ts">
import CloseIcon from '@/components/icons/CloseIcon.vue';
import FlashIcon from '@/components/icons/FlashIcon.vue';
import Converter from '@/scripts/converter';

const emit = defineEmits(['close', 'continue']);

const props = defineProps({
    channel: { type: Object, required: true },
    amount: { required: true },
    loading: { type: Boolean, required: true },
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
                    <FlashIcon /> Super Follow
                </h3>
                <p>To be eligible to View all Exclusive contents on a channel, Super Follow it.</p>
            </div>

            <div class="amount">
                <img src="/images/tfuel.png" alt="">
                <h3><span>{{ Converter.fromWei(props.amount) }}</span> TFUEL</h3>
                <p>~$0.00</p>
            </div>

            <div class="creator">
                <img :src="props.channel.image" alt="">
                <h3>{{ props.channel.name }}</h3>
            </div>

            <div class="pay" @click="emit('continue')">
                <button>{{ loading ? 'Loading..' : 'Make Payment' }}</button>
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
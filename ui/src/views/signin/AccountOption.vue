<script setup lang="ts">
import CloseIcon from '@/components/icons/CloseIcon.vue';
import { AccountType } from '@/types';
import { useWalletStore } from '@/stores/wallet';

const emit = defineEmits(['close', 'continue']);
const walletStore = useWalletStore();

const selectAccountType = (accountType: AccountType) => {
    walletStore.setAccountType(accountType);
};

const fillForm = () => {
    if (walletStore.accountType == AccountType.Google) {
        emit('continue', AccountType.Google);
    }

    if (walletStore.accountType == AccountType.Manual) {
        emit('continue', AccountType.Manual);
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
                <h3>Get Started</h3>
                <p>Start account Sign Up, Choose a method to continue with.</p>
            </div>

            <div class="signin_account_options">
                <div :class="walletStore.accountType == AccountType.Google ? `signin_account_option signin_account_option_active` : `signin_account_option`"
                    @click="() => { selectAccountType(AccountType.Google); }">
                    <div class="signin_account_option_name">
                        <img src="/images/google.png" alt="metamask">
                        <p>Use Google Account</p>
                    </div>

                    <div class="signin_account_option_radio">
                        <div class="signin_account_option_radio_inner"></div>
                    </div>
                </div>

                <div :class="walletStore.accountType == AccountType.Manual ? `signin_account_option signin_account_option_active` : `signin_account_option`"
                    @click="() => { selectAccountType(AccountType.Manual); }">
                    <div class="signin_account_option_name">
                        <img src="/images/form.png" alt="wallet_connect">
                        <p>Continue Manually</p>
                    </div>

                    <div class="signin_account_option_radio">
                        <div class="signin_account_option_radio_inner"></div>
                    </div>
                </div>
            </div>

            <div class="signin_action">
                <button @click="fillForm">Continue</button>
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
    gap: 40px;
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
    margin-top: 10px;
}

.title h3 {
    font-size: 30px;
    font-weight: 600;
    line-height: 36px;
    color: var(--tx-normal);
}

.title p {
    margin-top: 14px;
    font-size: 14px;
    font-weight: 500;
    line-height: 21px;
    color: var(--tx-dimmed);
}

.signin_account_options {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    width: 360px;
    max-width: 100%;
}

.signin_account_option {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    border: 1px solid var(--bg-darkest);
    border-radius: 6px;
    user-select: none;
    cursor: pointer;
}

.signin_account_option_active {
    border: 1px solid var(--primary);
}

.signin_account_option_name {
    display: flex;
    align-items: center;
    gap: 16px;
}

.signin_account_option_name img {
    width: 22px;
    height: 22px;
}

.signin_account_option_name p {
    font-size: 14px;
    font-weight: 500;
    color: var(--tx-normal);
}

.signin_account_option_radio {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid var(--bg-darkest);
}

.signin_account_option:hover .signin_account_option_radio {
    border: 2px solid var(--primary-light);
}

.signin_account_option_active .signin_account_option_radio {
    border: 2px solid var(--primary-light);
}

.signin_account_option_active .signin_account_option_radio_inner {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: var(--primary);
    border: 2.5px solid var(--bg);
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
</style>
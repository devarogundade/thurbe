<script setup lang="ts">
import AccountOption from './AccountOption.vue';
import AccountOptionForm from './AccountOptionForm.vue';
</script>

<template>
    <section>
        <div class="app_width">
            <div class="signin">
                <div class="signin_title">
                    <h3>Welcome to Thurbe</h3>
                    <p>Choose a preferred wallet to Sign In or Sign Up with</p>
                </div>

                <div class="signin_wallets">
                    <div class="signin_wallet">
                        <div class="signin_wallet_name">
                            <img src="/images/metamask.png" alt="metamask">
                            <p>Metamask</p>
                        </div>

                        <div class="signin_wallet_radio"></div>
                    </div>

                    <div class="signin_wallet signin_wallet_active">
                        <div class="signin_wallet_name">
                            <img src="/images/wallet_connect.png" alt="wallet_connect">
                            <p>WalletConnect</p>
                        </div>

                        <div class="signin_wallet_radio">
                            <div class="signin_wallet_radio_inner"></div>
                        </div>
                    </div>

                    <div class="signin_wallet">
                        <div class="signin_wallet_name">
                            <img src="/images/theta_wallet.png" alt="theta_wallet">
                            <p>Theta Wallet</p>
                        </div>

                        <div class="signin_wallet_radio"></div>
                    </div>
                </div>

                <div class="signin_action">
                    <button>Connect Wallet</button>
                </div>
            </div>
        </div>

        <!-- <AccountOption /> -->
        <!-- <AccountOptionForm /> -->
    </section>
</template>

<style scoped>
section {
    padding-top: 120px;
    padding-bottom: 60px;
}

.app_width {
    width: 1314px;
}

.signin {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;
}

.signin_title {
    width: 318px;
    text-align: center;
}

.signin_title h3 {
    font-size: 30px;
    font-weight: 600;
    line-height: 36px;
    color: var(--tx-normal);
}

.signin_title p {
    margin-top: 14px;
    font-size: 14px;
    font-weight: 500;
    line-height: 21px;
    color: var(--tx-dimmed);
}

.signin_wallets {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 360px;
    max-width: 100%;
}

.signin_wallet {
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

.signin_wallet_active {
    border: 1px solid var(--primary);
}

.signin_wallet_name {
    display: flex;
    align-items: center;
    gap: 16px;
}

.signin_wallet_name img {
    width: 22px;
    height: 22px;
}

.signin_wallet_name p {
    font-size: 14px;
    font-weight: 500;
    color: var(--tx-normal);
}

.signin_wallet_radio {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid var(--bg-darkest);
}

.signin_wallet:hover .signin_wallet_radio {
    border: 2px solid var(--primary-light);
}

.signin_wallet_active .signin_wallet_radio {
    border: 2px solid var(--primary-light);
}

.signin_wallet_active .signin_wallet_radio_inner {
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
<script setup lang="ts">
import CoinsIcon from '@/components/icons/CoinsIcon.vue';
</script>

<template>
    <div class="revenue_container">
        <div class="revenue">
            <div class="revenue_title">
                <p>Total Videos Revenue</p>
                <h3>$0,00</h3>
            </div>
            <div class="revenue_amounts">
                <div class="revenue_amount">
                    <div class="revenue_amount_name">
                        <div class="revenue_amount_name_text">
                            <img src="/images/tfuel.png" alt="theta">
                            <p><span>0,00</span> TFUEL ~ $0,00</p>
                        </div>

                        <div class="revenue_amount_percent">60%</div>
                    </div>
                    <div class="revenue_amount_progress">
                        <div class="revenue_amount_bar"></div>
                        <div class="revenue_amount_bar_dot"></div>
                    </div>
                </div>

                <div class="revenue_amount">
                    <div class="revenue_amount_name">
                        <div class="revenue_amount_name_text">
                            <img src="/images/tfuel.png" alt="theta">
                            <p><span>12,451</span> TFUEL ~ $0,00</p>
                        </div>

                        <div class="revenue_amount_percent">60%</div>
                    </div>
                    <div class="revenue_amount_progress">
                        <div class="revenue_amount_bar"></div>
                        <div class="revenue_amount_bar_dot"></div>
                    </div>
                </div>
            </div>
            <div class="revenue_claim">
                <div class="revenue_claim_text">
                    <p>Unclaimed Revenue</p>
                    <div class="revenue_claim_balance">
                        <div class="revenue_claim_balance_images">
                            <img src="/images/tfuel.png" alt="">
                            <img src="/images/tfuel.png" alt="">
                        </div>
                        <p>~ $0,00</p>
                    </div>
                </div>

                <button class="revenue_claim_btn">
                    <CoinsIcon /> Claim
                </button>
            </div>
        </div>

        <div class="revenue">
            <div class="revenue_title">
                <p>Total Streams Revenue</p>
                <h3>$0,00</h3>
            </div>
            <div class="revenue_amounts">
                <div class="revenue_amount">
                    <div class="revenue_amount_name">
                        <div class="revenue_amount_name_text">
                            <img src="/images/logo.png" alt="theta">
                            <p><span>12,451</span> THUBE ~ $0,00</p>
                        </div>

                        <div class="revenue_amount_percent">60%</div>
                    </div>
                    <div class="revenue_amount_progress">
                        <div class="revenue_amount_bar"></div>
                        <div class="revenue_amount_bar_dot"></div>
                    </div>
                </div>

                <div class="revenue_amount">
                    <div class="revenue_amount_name">
                        <div class="revenue_amount_name_text">
                            <img src="/images/logo.png" alt="theta">
                            <p><span>12,451</span> THUBE ~ $0,00</p>
                        </div>

                        <div class="revenue_amount_percent">60%</div>
                    </div>
                    <div class="revenue_amount_progress">
                        <div class="revenue_amount_bar"></div>
                        <div class="revenue_amount_bar_dot"></div>
                    </div>
                </div>
            </div>
            <div class="revenue_claim">
                <div class="revenue_claim_text">
                    <p>Unclaimed Revenue</p>
                    <div class="revenue_claim_balance">
                        <div class="revenue_claim_balance_images">
                            <img src="/images/logo.png" alt="">
                            <img src="/images/logo.png" alt="">
                        </div>
                        <p>~ $14,215</p>
                    </div>
                </div>

                <button class="revenue_claim_btn">
                    <CoinsIcon /> Claim
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.revenue_container {
    padding: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 50px;
}

.revenue {
    width: 482px;
    max-width: 100%;
    border-radius: 8px;
    background: var(--bg-dark);
    overflow: hidden;
}

.revenue_title {
    padding: 24px 30px;
    border-bottom: 2px solid var(--bg);
}

.revenue_title p {
    font-size: 12px;
    font-weight: 500;
    color: var(--tx-dimmed);
}

.revenue_title h3 {
    margin-top: 14px;
    font-size: 20px;
    line-height: 20px;
    font-weight: 600;
    color: var(--tx-normal);
}

.revenue_amount {
    padding: 24px 30px;
    border-bottom: 2px solid var(--bg);
}

.revenue_amount:first-child {
    border-bottom: 2px solid var(--bg);
}

.revenue_amount_name {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.revenue_amount_name img {
    width: 24px;
    height: 24px;
    border-radius: 8px;
    object-fit: cover;
}

.revenue_amount_name_text {
    display: flex;
    align-items: center;
    gap: 10px;
}

.revenue_amount_name_text p {
    font-size: 14px;
    font-weight: 500;
    color: var(--tx-dimmed);
}

.revenue_amount_name_text p span {
    color: var(--tx-normal);
}

.revenue_amount_percent {
    font-size: 12px;
    font-weight: 500;
    color: var(--tx-normal);
}

.revenue_amount_progress {
    margin-top: 16px;
    position: relative;
    width: 100%;
    height: 4px;
    border-radius: 2px;
    background: var(--bg-darkest);
}

.revenue_amount_bar {
    height: 100%;
    border-radius: 2px;
    background: var(--primary-light);
    width: 60%;
}

.revenue_amount_bar_dot {
    width: 14px;
    height: 14px;
    border-radius: 5px;
    background: var(--primary-light);
    border: 4px solid var(--primary);
    position: absolute;
    left: 60%;
    top: 50%;
    transform: translate(0, -50%);
}

.revenue_claim {
    padding: 24px 30px;
    border-bottom: 2px solid var(--bg);
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.revenue_claim_text>p {
    font-size: 12px;
    line-height: 12px;
    font-weight: 500;
    color: var(--tx-dimmed);
}

.revenue_claim_balance {
    margin-top: 10px;
    display: flex;
    align-items: center;
    gap: 12px;
}

.revenue_claim_balance_images {
    display: flex;
    align-items: center;
}

.revenue_claim_balance_images img {
    width: 20px;
    height: 20px;
    border-radius: 6px;
    object-fit: cover;
}

.revenue_claim_balance_images img:first-child {
    z-index: 1;
}

.revenue_claim_balance_images img:last-child {
    margin-left: -6px;
}

.revenue_claim_balance>p {
    font-size: 14px;
    font-weight: 500;
    color: var(--tx-normal);
}

.revenue_claim_btn {
    background: var(--primary-light);
    width: 113px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    gap: 10px;
    border: none;
    cursor: pointer;
    user-select: none;
}
</style>
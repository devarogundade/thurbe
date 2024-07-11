import type { Tip } from '@/types';
import { reactive } from 'vue';

export const react = reactive({
    tips: [] as Tip[],

    push: function (react: Tip) {
        this.tips = [...this.tips, react];

        setTimeout(() => {
            this.remove(this.tips.length - 1);
        }, 2000);
    },

    remove: function (index: number) {
        this.tips.splice(index, 1);
    }
});
import type { React } from '@/types';
import { reactive } from 'vue';

export const react = reactive({
    reacts: [] as React[],

    push: function (react: React) {
        this.reacts = [...this.reacts, react];

        setTimeout(() => {
            this.remove(this.reacts.length - 1);
        }, 2000);
    },

    remove: function (index: number) {
        this.reacts.splice(index, 1);
    }
});
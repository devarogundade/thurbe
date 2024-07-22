import convert from './baseconverter';

const Converter = {
    validateEmail: (email: string) => {
        const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    fineAddress: function (hash: string | null, space: number) {
        if (hash == null || hash.length == 0) return '- - - - -';
        return hash.substring(0, space) + '...' + hash.substring(hash.length - space, hash.length);
    },

    formatNumber: function (value: number) {
        if (value >= 1e9) {
            return (value / 1e9).toFixed(1) + 'b';
        } else if (value >= 1e6) {
            return (value / 1e6).toFixed(1) + 'm';
        } else if (value >= 1e3) {
            return (value / 1e3).toFixed(1) + 'k';
        } else {
            return value.toString();
        }
    },

    fromWei: function (wei: any) {
        try {
            if (wei == '' || wei == '0') return '0';
            return convert(wei, 'wei', 'ether');
        } catch (error) {
            console.error('ether', error);
            return '0';
        }
    },

    toWei: function (ether: any) {
        try {
            if (ether == '') return '0';
            return convert(ether, 'ether', 'wei');
        } catch (error) {
            console.error('wei', error);
            return '0';
        }
    },

    toMoney: function (amount: number, max = null) {
        let maxF = max ? max : 6;
        if (amount > 1) {
            maxF = 3;
        }
        if (amount > 10) {
            maxF = 2;
        }
        if (amount > 200) {
            maxF = 0;
        }
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: maxF
        });
        return formatter.format(amount).replace('$', '');
    },

    fullMonth: function (date: Date): string {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
        return date.toLocaleString('en-US', options);
    },

    nFormatter: function (num: number, digits: number) {
        if (num < 1000) return this.toMoney(num);
        const lookup = [
            { value: 1, symbol: "" },
            { value: 1e3, symbol: "k" },
            { value: 1e6, symbol: "M" },
            { value: 1e9, symbol: "G" },
            { value: 1e12, symbol: "T" },
            { value: 1e15, symbol: "P" },
            { value: 1e18, symbol: "E" }
        ];
        const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
        const item = lookup.slice().reverse().find(function (item) {
            return num >= item.value;
        });
        const result = item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
        return result.replace('$', '');
    }
};

export default Converter;
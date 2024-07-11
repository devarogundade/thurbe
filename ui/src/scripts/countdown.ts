const Countdown = {
    start: function (to: any, callback: any) {
        const fnc = function () {
            const from = Date.now();
            const distance = to - from;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

            const text = `${days}d : ${hours}h : ${minutes}min`;
            callback(text);

            if (distance < 0) {
                const text = `0d : 0h : 0min`;
                callback(text);
                clearInterval(interval);
            }
        };
        const interval = setInterval(fnc, 10000);
        fnc();
    },
    startOnlyDay: function (to: any, callback: any) {
        const fnc = function () {
            const from = Date.now();
            const distance = to - from;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            callback(days);

            if (distance < 0) {
                callback(0);
                clearInterval(interval);
            }
        };
        const interval = setInterval(fnc, 60000);
        fnc();
    },
    toDate: function (timestamp: number) {
        const a = new Date(timestamp);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = months[a.getMonth()];
        const date = a.getDate();
        const hour = a.getHours();
        const min = a.getMinutes();
        const year = a.getFullYear();
        return `${hour}:${min}, ${date} ${month} ${year.toString().replace('20', '')}`;
    }
};

export default Countdown;
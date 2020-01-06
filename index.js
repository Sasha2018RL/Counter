require('dotenv').config();

const Telegram = require("node-telegram-bot-api");
const moment = require("moment");
const bot = new Telegram(
    process.env.TOKEN, {polling: false}
);

const emoji = [
    "😎",
    "🏄",
    "🏊",
    "🐚",
    "🌻",
    "🌴",
    "🍹",
    "🏝️",
    "☀️",
    "🌞",
    "🕶️",
    "🍨"
];

function getDays() {
    let one_day = 1000 * 60 * 60 * 24;
    let present_date = new Date();
    let parts = process.env.DATE.split('.');
    let date = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));

    let Result = Math.round(date.getTime() - present_date.getTime()) / (one_day);

    return Result.toFixed(0);
}

function getEmoji() {
    return emoji[(Math.random() * emoji.length).toFixed(0)];
}

function num2str(n, text_forms) {
    n = Math.abs(n) % 100;
    let n1 = n % 10;

    if (n > 10 && n < 20) {
        return text_forms[2];
    }

    if (n1 > 1 && n1 < 5) {
        return text_forms[1];
    }

    if (n1 === 1) {
        return text_forms[0];
    }

    return text_forms[2];
}

let sent = "";

setInterval(() => {
    if (moment().format("HH:mm") === process.env.TIME)
        if (sent !== moment().format("DD.MM.YY")) {
            let days = getDays();
            let options = {
                disable_notification: true
            };
            if (days < 30) options.disable_notification = false;

            bot.sendMessage(process.env.CHAT, `До ${process.env.EVENT} ${num2str(days, ["остался", "осталось", "осталось"])} ${days} ${num2str(days, ["день", "дня", "дней"])} ${getEmoji()}`, options).catch(e => {
                console.log(e);
            });

            sent = moment().format("DD.MM.YY");
        }
}, 59000);

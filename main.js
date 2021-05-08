if (process.version.slice(1).split(".")[0] < 12) { throw new SyntaxError(
"Node 12.0.0 or higher is required. Update Node on your system."
)
}
const astroide = {
    version: require('./package.json').version,
    number: number,
    oyun: oyun,
    sayi: sayi,
    renk: renk,
    random: random
}
function number(length) {
    if (length === undefined) return new TypeError("Lütfen Sayı Giriniz!");
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
function oyun(gamename) {
    if (gamename === undefined) { throw new TypeError(`Lütfen bir oyun ismi giriniz. ["seviyor_sevmiyor", "yazı_tura", "zar","slots"]`) }
    if (gamename === "seviyor_sevmiyor") {
        return ["Seviyor", "Sevmiyor"].random()
    }
    if (gamename === "yazı_tura") {
        return ["yazı", "tura"].random();
    }
    if (gamename === "zar") {
        return ["1 [Bir]", "2 [İki]", "3 [Üç]", "4 [Dört]", "5 [Beş]", "6 [Altı]"].random();
    }
    if (gamename === "slots") {
        return ["🍋", "🍍", "🥑", "🥥"].random()
    }
}
function sayi(sayı1, sayı2, sayı3) {
    if (sayı3 === undefined) {
        if (sayı2 === undefined) {
            if (sayı1 === undefined) {
                return Math.floor(Math.random() * 100)
            } else {
                const randomItems = [];
                for (let i = 0; i < sayı1; i++) {
                    randomItems.push(Math.floor(Math.random() * 100))
                }
                return randomItems;
            }
        } else {
            const randomItems2 = [];
            for (let i = 0; i < sayı1; i++) {
                randomItems2.push(Math.floor(Math.random() * sayı2))
            }
            return randomItems2
        }
    } else {
        const randomItems3 = [];
        for (let i = 0; i < sayı1; i++) {
            randomItems3.push(Math.floor(Math.random() * (sayı3 - sayı2 + 1)) + sayı2)
        }
        return randomItems3
    }
}

function renk(number) {
    if (number === undefined) {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.round(Math.random() * 15)];
        }
        return color;
    } else {
        const randomItems2 = [];
        for (let i = 0; i < number; i++) {

            var letters2 = '0123456789ABCDEF'.split('');
            var color2 = '#';
            for (var i2 = 0; i2 < 6; i2++) {
                color2 += letters2[Math.round(Math.random() * 15)];
            }

            randomItems2.push(color2)
        }
        return randomItems2
    }
}
function random(values) {
    if (Array.isArray(values)) {
        return values.random()
    } else {
        let keys = Object.keys(values)
        let random = Math.floor(Math.random() * keys.length);
        return values[random]
    }
}
Array.prototype.random = function () {
    return Math.floor(Math.random() * this.length);
};
module.exports = astroide
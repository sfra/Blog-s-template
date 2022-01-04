function passwordMetter(password, criteria) {
    let chars = [];
    switch (criteria) {
        case "upperLetters":
            chars = [
                "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M",];

            break;
        case "containsNumbers":
            chars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
            break;
        case "containsSpecialCharacters":
            chars = "!@#$%^&*(){}[]:\";'<>?,./".split("");
        case "scorring":
            return (() => {
                let score = 0;
                if (!password) return score;
                const letters = {};
                for (let i = 0; i < password.length; i++) {
                    letters[password[i]] = (letters[password[i]] || 0) + 1;
                    score += 5.0 / letters[password[i]];
                }
                const variations = {
                    digits: /\d/.test(password),
                    lower: /[a-z]/.test(password),
                    upper: /[A-Z]/.test(password),
                    nonWords: /\W/.test(password),
                };

                let variationCount = 0;
                for (let check in variations) {
                    variationCount += variations[check] == true ? 1 : 0;
                }
                score += (variationCount - 1) * 10;
                return parseInt(score);
            })();
    }

    return chars.filter((el) => password.indexOf(el) >= 0).length * 0.8;
}

// if (passwordMetter($password0.value, ) > .8) {
//     $tips.children[0].children[1].style.display = 'none';
// } else {
//     $tips.children[0].children[1].style.display = '';
// };

// if (passwordMetter($password0.value, 'containsNumbers') > 0) {
//     $tips.children[0].children[0].style.display = 'none';
// } else {
//     $tips.children[0].children[0].style.display = '';
// };

// if (passwordMetter($password0.value, 'containsSpecialCharacters') > 0)

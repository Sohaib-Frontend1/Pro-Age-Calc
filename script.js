let btn = document.getElementById("calbtn"),
    birthdayBtn = document.getElementById("calcBirthday"),
    birthInput = document.getElementById("inputBirthDate"),
    result = document.getElementById("result");

let currentDate = new Date();
currentDate.setHours(0, 0, 0, 0);

let msgTimeout;

function showMsg(msg, isError) {
    clearTimeout(msgTimeout);

    result.textContent = msg;
    result.style.color = isError ? "#ff4d4d" : "#facc15";

    if (isError) {
        msgTimeout = setTimeout(() => {
            result.textContent = "";
            result.style.color = "";
            birthInput.value = "";
        }, 5000);
    }
}

function check() {
    if (birthInput.value === "") {
        showMsg("Please input Your birth date", true);
        return null;
    }

    let birthDate = new Date(birthInput.value);
    birthDate.setHours(0, 0, 0, 0);

    let years = currentDate.getFullYear() - birthDate.getFullYear(),
        months = currentDate.getMonth() - birthDate.getMonth(),
        days = currentDate.getDate() - birthDate.getDate();

    if (days < 0) {
        months--;
        let lastMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            0
        );
        days += lastMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    if (years < 3 || years > 120) {
        showMsg(
            `Please input the right birth date between ${currentDate.getFullYear() - 120} and ${currentDate.getFullYear() - 3}`,
            true
        );
        return null;
    }

    return { birthDate, years, months, days };
}

btn.addEventListener("click", function () {
    let data = check();
    if (!data) return;

    let yText = data.years === 1 ? "year" : "years",
        mText = data.months === 1 ? "month" : "months",
        dText = data.days === 1 ? "day" : "days";

    showMsg(
        `Your age is: ${data.years} ${yText}, ${data.months} ${mText} and ${data.days} ${dText}.`,
        false
    );
});

birthdayBtn.addEventListener("click", function () {
    let data = check();
    if (!data) return;

    let nextBirthday = new Date(
        currentDate.getFullYear(),
        data.birthDate.getMonth(),
        data.birthDate.getDate()
    );
    nextBirthday.setHours(0, 0, 0, 0);

    if (currentDate > nextBirthday) {
        nextBirthday.setFullYear(currentDate.getFullYear() + 1);
    }

    if (
        currentDate.getMonth() === data.birthDate.getMonth() &&
        currentDate.getDate() === data.birthDate.getDate()
    ) {
        showMsg("Happy Birthday! It's your birthday today.", false);
        return;
    }

    let monthsLeft = nextBirthday.getMonth() - currentDate.getMonth(),
        daysLeft = nextBirthday.getDate() - currentDate.getDate();

    if (daysLeft < 0) {
        monthsLeft--;
        let previousMonth = new Date(
            nextBirthday.getFullYear(),
            nextBirthday.getMonth(),
            0
        );
        daysLeft += previousMonth.getDate();
    }

    if (monthsLeft < 0) monthsLeft += 12;

    if (monthsLeft == 0 && daysLeft == 1) {
        showMsg("Happy Birthday! Tomorrow is your birthday.", false);
        return;
    }

    let mText = monthsLeft === 1 ? "month" : "months",
        dText = daysLeft === 1 ? "day" : "days";

    if (monthsLeft == 0) {
        showMsg(
            `Only ${daysLeft} ${dText} left until your next birthday`,
            false
        );
        return;
    }

    showMsg(
        `Only ${monthsLeft} ${mText} and ${daysLeft} ${dText} left until your next birthday`,
        false
    );
});

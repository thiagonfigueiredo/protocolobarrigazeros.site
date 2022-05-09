// Handle Calories
document.querySelector("#info-calories").addEventListener("click", () => {
  if (
    !Object.values(
      document.getElementById("block-calories").classList
    ).includes("summary-block--active")
  ) {
    document
      .querySelector("#block-calories")
      .classList.add("summary-block--active");
  } else {
    document
      .querySelector("#block-calories")
      .classList.remove("summary-block--active");
  }
});
// Handle Fats
document.querySelector("#info-fats").addEventListener("click", () => {
  if (
    !Object.values(document.getElementById("block-fats").classList).includes(
      "summary-block--active"
    )
  ) {
    document
      .querySelector("#block-fats")
      .classList.add("summary-block--active");
  } else {
    document
      .querySelector("#block-fats")
      .classList.remove("summary-block--active");
  }
});
// Handle Protein
document.querySelector("#info-protein").addEventListener("click", () => {
  if (
    !Object.values(document.getElementById("block-protein").classList).includes(
      "summary-block--active"
    )
  ) {
    document
      .querySelector("#block-protein")
      .classList.add("summary-block--active");
  } else {
    document
      .querySelector("#block-protein")
      .classList.remove("summary-block--active");
  }
});
// Handle Carbs
document.querySelector("#info-carbs").addEventListener("click", () => {
  if (
    !Object.values(document.getElementById("block-carbs").classList).includes(
      "summary-block--active"
    )
  ) {
    document
      .querySelector("#block-carbs")
      .classList.add("summary-block--active");
  } else {
    document
      .querySelector("#block-carbs")
      .classList.remove("summary-block--active");
  }
});
// Handle Water
document.querySelector("#info-water").addEventListener("click", () => {
  if (
    !Object.values(document.getElementById("block-water").classList).includes(
      "summary-block--active"
    )
  ) {
    document
      .querySelector("#block-water")
      .classList.add("summary-block--active");
  } else {
    document
      .querySelector("#block-water")
      .classList.remove("summary-block--active");
  }
});
// Handle BMI
document.querySelector("#info-bmi").addEventListener("click", () => {
  if (
    !Object.values(document.getElementById("block-bmi").classList).includes(
      "summary-block--active"
    )
  ) {
    document.querySelector("#block-bmi").classList.add("summary-block--active");
  } else {
    document
      .querySelector("#block-bmi")
      .classList.remove("summary-block--active");
  }
});
// Handle Activity
document.querySelector("#info-activity").addEventListener("click", () => {
  if (
    !Object.values(
      document.getElementById("block-activity").classList
    ).includes("summary-block--active")
  ) {
    document
      .querySelector("#block-activity")
      .classList.add("summary-block--active");
  } else {
    document
      .querySelector("#block-activity")
      .classList.remove("summary-block--active");
  }
});
// Handle Achievable
document.querySelector("#info-achievable").addEventListener("click", () => {
  if (
    !Object.values(
      document.getElementById("block-achievable").classList
    ).includes("summary-block--active")
  ) {
    document
      .querySelector("#block-achievable")
      .classList.add("summary-block--active");
  } else {
    document
      .querySelector("#block-achievable")
      .classList.remove("summary-block--active");
  }
});

const cookies = document.cookie
  .split(";")
  .map((cookie) => cookie.split("="))
  .reduce(
    (accumulator, [key, value]) => ({
      ...accumulator,
      [key.trim()]: decodeURIComponent(value),
    }),
    {}
  );

if (cookies.name) {
  document.getElementById("name").innerHTML = `${cookies.name} `;
  document.getElementById("name2").innerHTML = `${cookies.name} `;
}
if (cookies.user) {
  const user = JSON.parse(cookies.user);
  const activityMap = {
    Preguiçoso: 1.2,
    "Um Pouco Ativo": 1.375,
    "Atividade Média": 1.55,
    "Muito Ativo": 1.725,
    "Extremamente ativo": 1.9,
  };
  let BMR;
  if (user.gender === "Mulher") {
    BMR = 655.1 + 9.563 * user.weight + 1.85 * user.height - 4.676 * user.age;
  } else {
    BMR = 66.47 + 13.75 * user.weight + 5.003 * user.height - 6.755 * user.age;
  }
  const AMR = BMR * activityMap[user.activityLevel] * 0.75;
  const dailyCalorieCount = Math.round(AMR / 100) * 100;
  const fatsMultiplier = 0.076;
  const proteinMultiplier = 0.065;
  const carbsMultiplier = 0.014;
  const dailyWaterIntake = () => {
    if (user.age < 18) {
      return ((user.weight * 40) / 1000).toFixed(1);
    } else if (user.age < 56 && user.age > 17) {
      return ((user.weight * 35) / 1000).toFixed(1);
    } else if (user.age < 66 && user.age > 55) {
      return ((user.weight * 30) / 1000).toFixed(1);
    } else {
      return ((user.weight * 25) / 1000).toFixed(1);
    }
  };
  const bmi = (numeric = false) => {
    const bmiNumeric = (user.weight / user.height / user.height) * 10000;
    if (numeric) {
      return bmiNumeric.toFixed(1);
    }
    if (bmiNumeric < 18.5) {
      return "Abaixo do peso";
    } else if (bmiNumeric < 25 && bmiNumeric >= 18.5) {
      return "Normal";
    } else if (bmiNumeric < 30 && bmiNumeric >= 25) {
      return "Acima do peso";
    } else {
      return "Obeso";
    }
  };
  const getBmiClass = () => {
    const bmiNumeric = (user.weight / user.height / user.height) * 10000;
    if (bmiNumeric < 18.5) {
      return "Underweight";
    } else if (bmiNumeric < 25 && bmiNumeric >= 18.5) {
      return "Normal";
    } else if (bmiNumeric < 30 && bmiNumeric >= 25) {
      return "Overweight";
    } else {
      return "Obese";
    }
  };
  const achievableWeight = Math.round(
    Math.max(user.weight - 5, user.targetWeight)
  );
  document.getElementById(
    "daily-calories"
  ).innerHTML = `${dailyCalorieCount}&nbsp;-&nbsp;${dailyCalorieCount + 100}g`;
  document.getElementById(
    "daily-calories2"
  ).innerHTML = `${dailyCalorieCount}&nbsp;-&nbsp;${dailyCalorieCount + 100}g`;
  document.getElementById("daily-fats").innerHTML = `${
    Math.round(((dailyCalorieCount + 50) * fatsMultiplier) / 10) * 10
  }&nbsp;-&nbsp;${
    Math.round(((dailyCalorieCount + 50) * fatsMultiplier) / 10) * 10 + 20
  }g`;
  document.getElementById("daily-fats2").innerHTML = `${
    Math.round(((dailyCalorieCount + 50) * fatsMultiplier) / 10) * 10
  }&nbsp;-&nbsp;${
    Math.round(((dailyCalorieCount + 50) * fatsMultiplier) / 10) * 10 + 20
  }g`;
  document.getElementById("daily-protein").innerHTML = `${
    Math.round(((dailyCalorieCount + 50) * proteinMultiplier) / 10) * 10
  }&nbsp;-&nbsp;${
    Math.round(((dailyCalorieCount + 50) * proteinMultiplier) / 10) * 10 + 20
  }g`;
  document.getElementById("daily-protein2").innerHTML = `${
    Math.round(((dailyCalorieCount + 50) * proteinMultiplier) / 10) * 10
  }&nbsp;-&nbsp;${
    Math.round(((dailyCalorieCount + 50) * proteinMultiplier) / 10) * 10 + 20
  }g`;
  document.getElementById("daily-carbs").innerHTML = `${
    Math.round(((dailyCalorieCount + 50) * carbsMultiplier) / 10) * 10
  }&nbsp;-&nbsp;${
    Math.round(((dailyCalorieCount + 50) * carbsMultiplier) / 10) * 10 + 20
  }g`;
  document.getElementById("daily-carbs2").innerHTML = `${
    Math.round(((dailyCalorieCount + 50) * carbsMultiplier) / 10) * 10
  }&nbsp;-&nbsp;${
    Math.round(((dailyCalorieCount + 50) * carbsMultiplier) / 10) * 10 + 20
  }g`;
  document.getElementById(
    "daily-water-intake"
  ).innerHTML = `${dailyWaterIntake()}L`;
  document.getElementById(
    "daily-water-intake2"
  ).innerHTML = `${dailyWaterIntake()}L`;
  document.getElementById("bmi").innerHTML = `${bmi(true)}`;
  document.getElementById("bmi2").innerHTML = `${bmi()}`;
  document.querySelector(".bmi-diagram").classList.add(getBmiClass());
  document.getElementById("activityLevel").innerHTML = user.activityLevel;
  document.getElementById("achievableWeight").innerHTML = achievableWeight;
} else {
  document.querySelector(".container-fluid").classList.add("hide");
  // window.location.href = "/guia-completo-da-dieta-cetogenica/obter-dieta";
}
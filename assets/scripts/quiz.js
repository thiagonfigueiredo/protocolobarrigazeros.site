const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

const promo = params.promo;

const setUserCookie = (user) => {
  document.cookie = `user=${JSON.stringify(user)}; expires=${new Date(
    new Date().getTime() + 30 * 60 * 1000
  ).toGMTString()}; path=/`;
};
class Quiz extends React.Component {
  state = {
    stepsTotal: 2,
    currentStep: 0,
    gender: "",
    activityLevel: "",
    age: "",
    height: "",
    weight: "",
    targetWeight: "",
    error: {},
  };

  render() {
    const {
      currentStep,
      stepsTotal,
      gender,
      activityLevel,
      age,
      height,
      weight,
      targetWeight,
      error,
    } = this.state;

    const stepBackward = () => {
      if (currentStep > 0) {
        this.setState({ currentStep: currentStep - 1 });
      }
    };
    const stepForward = () => {
      if (currentStep < stepsTotal) {
        this.setState({ currentStep: currentStep + 1 });
      } else {
        let error = {};
        if (age >= 14) {
          delete error.age;
        } else {
          error = {
            ...error,
            age: "A idade precisa ser 14 anos ou superior",
          };
        }

        if (height >= 130) {
          delete error.height;
        } else {
          error = {
            ...error,
            height: "Insira um valor maior ou igual a 130",
          };
        }

        if (weight >= 40) {
          delete error.weight;
        } else {
          error = {
            ...error,
            weight: "Insira um valor maior ou igual a 40",
          };
        }

        if (targetWeight >= 40) {
          delete error.targetWeight;
        } else {
          error = {
            ...error,
            targetWeight: "Insira um valor maior ou igual a 40",
          };
        }
        this.setState({ error });
        if (Object.keys(error).length === 0) {
          setUserCookie({
            gender,
            activityLevel,
            age,
            height,
            weight,
            targetWeight,
          });

          if (window.location.pathname.split("/")[1].toLowerCase() === "calculadora") {
            document.querySelector(".container-fluid").classList.remove("hide");
            reload_js("./assets/scripts/calculadora.js");
          } else {
            const url = promo
              ? `https://emagrecimentodescomplicadoceto.com?promo=${promo}`
              : "https://emagrecimentodescomplicadoceto.com";
            window.location.href = url;
          }
        }
      }
    };

    const handleInput = (name, e) =>
      this.setState({ [name]: parseInt(e.target.value) });

    const initialStep = () => {
      const goNext = (gender) => {
        this.setState({ gender });
        stepForward();
      };
      return (
        <React.Fragment>
          <div className="quiz-title">
            <h1>{window.location.pathname.split("/")[1].toLowerCase() === "calculadora" ? "CALCULADORA EDC" : "SELECIONE PARA CONTINUAR"}</h1>
          </div>
          <div className="quiz-header">Para começar, escolha seu sexo.</div>
          <div className="gender-container">
            <div className="gender-select male" onClick={() => goNext("Homem")}>
              <span>Homem</span>
            </div>
            <div className="or">
              <span>OU</span>
            </div>
            <div
              className="gender-select female"
              onClick={() => goNext("Mulher")}
            >
              <span>Mulher</span>
            </div>
          </div>
        </React.Fragment>
      );
    };

    const secondStep = () => {
      const goNext = (activityLevel) => {
        this.setState({ activityLevel });
        stepForward();
      };
      return (
        <React.Fragment>
          <div className="quiz-title">
            <h1>Nível de atividade física diária</h1>
          </div>
          <div className="quiz-header">Quão fisicamente ativo você é?</div>
          <div className="daily-activity-container">
            <div
              className="activity-item-border"
              onClick={() => goNext("Preguiçoso")}
            >
              <div className="activity-item">Preguiçoso</div>
            </div>
            <div
              className="activity-item-border"
              onClick={() => goNext("Um Pouco Ativo")}
            >
              <div className="activity-item">Um Pouco Ativo</div>
            </div>
            <div
              className="activity-item-border"
              onClick={() => goNext("Atividade Média")}
            >
              <div className="activity-item">Atividade Média</div>
            </div>
            <div
              className="activity-item-border"
              onClick={() => goNext("Muito Ativo")}
            >
              <div className="activity-item">Muito Ativo</div>
            </div>
            <div
              className="activity-item-border"
              onClick={() => goNext("Extremamente ativo")}
            >
              <div className="activity-item">Extremamente ativo</div>
            </div>
          </div>
        </React.Fragment>
      );
    };

    const thirdStep = () => {
      const goNext = (activityLevel) => stepForward();
      return (
        <React.Fragment>
          <div className="quiz-title">
            <h1>Suas Medidas</h1>
          </div>
          <div>
            <div id="metric-form" className="mt-3 metric-form">
              <div>
                <div
                  className={`input-field-row ${
                    error.age ? "input--error" : ""
                  }`}
                >
                  <input
                    id="input-age"
                    name="age"
                    type="number"
                    placeholder="Idade"
                    min="14"
                    max="100"
                    className="cake-icon inner-icon"
                    value={age}
                    onChange={(e) => handleInput("age", e)}
                  />
                  <div className="a-input__unit">Idade</div>
                  <span className="a-input__input--error">{error.age}</span>
                </div>
              </div>
              <div>
                <div
                  className={`input-field-row ${
                    error.height ? "input--error" : ""
                  }`}
                >
                  <input
                    id="input-height"
                    name="height"
                    type="number"
                    placeholder="Altura (CM)"
                    min="130"
                    max="242"
                    className="height-icon inner-icon"
                    value={height}
                    onChange={(e) => handleInput("height", e)}
                  />
                  <div className="a-input__unit">cm</div>
                  <span className="a-input__input--error">{error.height}</span>
                </div>
              </div>
              <div>
                <div
                  className={`input-field-row ${
                    error.weight ? "input--error" : ""
                  }`}
                >
                  <input
                    id="input-weight"
                    name="weight"
                    type="number"
                    placeholder="Peso (KG)"
                    min="40"
                    max="180"
                    className="weight-icon inner-icon"
                    value={weight}
                    onChange={(e) => handleInput("weight", e)}
                  />
                  <div className="a-input__unit">kg</div>
                  <span className="a-input__input--error">{error.weight}</span>
                </div>
              </div>
              <div>
                <div
                  className={`input-field-row ${
                    error.targetWeight ? "input--error" : ""
                  }`}
                >
                  <input
                    id="input-target_weight"
                    name="target_weight"
                    type="number"
                    placeholder="Peso Alvo (KG)"
                    min="40"
                    max="180"
                    className="weight-icon inner-icon"
                    value={targetWeight}
                    onChange={(e) => handleInput("targetWeight", e)}
                  />
                  <div className="a-input__unit">kg</div>
                  <span className="a-input__input--error">
                    {error.targetWeight}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <a
                id="continue"
                className="download-ebook-button"
                onClick={goNext}
              >
                Continue&nbsp;→
              </a>
            </div>
            {Object.keys(error).length > 0 && (
              <div className="error-msg">
                Por favor, insira os valores corretos.
              </div>
            )}
          </div>
        </React.Fragment>
      );
    };

    const stepMap = {
      0: initialStep,
      1: secondStep,
      2: thirdStep,
    };

    const renderStep = () => {
      return stepMap[currentStep]();
    };

    const renderLineActive = () => {
      switch (currentStep) {
        case 1:
          return "line-active two";
        case 2:
          return "line-active three";
        default:
          return "line-active";
      }
    };

    const renderProgress = () => {
      return (
        <div className="progress-container">
          <div className="goBack" onClick={stepBackward}>
            <span>←</span>
          </div>
          <div className="progress">
            <div className="line">
              <div className={renderLineActive()}></div>
              <div className={currentStep > 0 ? "step active" : "step"}></div>
              <div
                className={currentStep > 1 ? "step two active" : "step two"}
              ></div>
              <div
                className={currentStep > 2 ? "step three active" : "step three"}
              ></div>
            </div>
          </div>
        </div>
      );
    };

    return (
      <React.Fragment>
        <div className="quiz-container">
          {renderStep()}
          {renderProgress()}
        </div>
      </React.Fragment>
    );
  }
}
ReactDOM.render(<Quiz />, document.getElementById("root"));

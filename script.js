const optionButtons = document.querySelectorAll(".activity-tracker__option");
const tracker = document.querySelector(".activity-tracker");

function renderCards(data, period = "weekly") {
    data.forEach(item => {
      // Generar una clase única para identificar la tarjeta
      const cardClass = item.title.toLowerCase().replace(" ", "-");
      let card = document.querySelector(`.activity-tracker__activity.${cardClass}`);
  
      if (!card) {
        // Si la tarjeta no existe, crearla
        card = document.createElement("section");
        card.classList.add("activity-tracker__activity", cardClass);
  
        card.innerHTML = `
          <div class="activity__bg">
            <img src="./images/icon-${cardClass}.svg" alt="">
          </div>
          <div class="activity__info">
            <div class="activity__name">
              <h2>${item.title}</h2>
            </div>
            <div class="activity__data">
              <p><span>${item.timeframes[period].current}hrs</span></p>
              <p>Last ${
                period === "daily"
                  ? "Day"
                  : period === "weekly"
                  ? "Week"
                  : "Month"
              } - ${item.timeframes[period].previous}hrs</p>
            </div>
          </div>
        `;
  
        tracker.appendChild(card);
      } else {
        // Si la tarjeta ya existe, solo actualizar los datos
        const activityData = card.querySelector(".activity__data");
        activityData.innerHTML = `
          <p><span>${item.timeframes[period].current}hrs</span></p>
          <p>Last ${
            period === "daily"
              ? "Day"
              : period === "weekly"
              ? "Week"
              : "Month"
          } - ${item.timeframes[period].previous}hrs</p>
        `;
      }
    });
  }

// Cargamos el JSON y conectamos eventos
fetch("./data.json")
  .then(res => res.json())
  .then(data => {
    // Render inicial
    renderCards(data, "weekly");

    // Botones
    optionButtons.forEach(button => {
      button.addEventListener("click", () => {
        const option = button.dataset.option;
        renderCards(data, option);
      });
    });
  })
  .catch(err => console.error("Error cargando data.json:", err));

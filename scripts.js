const canvas = document.getElementById("chart-canvas");
Chart.defaults.font.family = "DM Sans";

const root = document.documentElement;
const style = getComputedStyle(root);
const cyan = style.getPropertyValue("--cyan");
const softRed = style.getPropertyValue("--soft-red");

let activeIndex = null;

fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    const barChart = new Chart(canvas, {
      type: "bar",
      data: {
        labels: data.map((item) => item.day),
        datasets: [
          {
            data: data.map((item) => item.amount),
            backgroundColor: (context) => {
              const index = context.dataIndex;
              return index === activeIndex ? cyan : softRed;
            },
            borderRadius: 5,
            hoverBackgroundColor: (context) => {
              const index = context.dataIndex;
              return index === activeIndex
                ? "hsla(186, 34%, 60%, 0.7)"
                : "hsla(10, 79%, 65%, 0.7)";
            },
          },
        ],
      },
      options: {
        responsive: true,
        aspectRatio: 3,
        maintainAspectRatio: false,
        scales: {
          y: {
            ticks: {
              display: false,
            },
            grid: {
              display: false,
              drawTicks: false,
              drawBorder: false,
            },
            border: {
              display: false,
            },
          },
          x: {
            grid: {
              display: false,
              drawBorder: false,
            },
            border: {
              display: false,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: false,
          },
          tooltip: {
            padding: 10,
            yAlign: "bottom",
            displayColors: false,
            enabled: true,
            callbacks: {
              title: () => null,
              label: (context) => {
                let label = context.dataset.data[context.dataIndex];
                return "$" + label;
              },
            },
          },
        },
        onClick: (event, elements) => {
          if (elements.length > 0) {
            const index = elements[0].index;
            activeIndex = activeIndex === index ? null : index;
            barChart.update();
          }
        },
      },
    });
  });

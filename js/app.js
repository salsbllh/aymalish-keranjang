document.addEventListener("alpine:init", () => {
  Alpine.data("collection", () => ({
    items: [
      { id: 1, name: "Single Bouquet", img: "single.jpg", price: 10000 },
      { id: 2, name: "Gantungan Kunci", img: "ganci.jpg", price: 5000 },
      { id: 3, name: "Jepit Rambut", img: "jepit.jpg", price: 5000 },
      { id: 4, name: "Lampu Tidur", img: "lampu.jpg", price: 70000 },
    ],
    open: false,

    toggle() {
      this.open = !this.open;
    },
  }));
});

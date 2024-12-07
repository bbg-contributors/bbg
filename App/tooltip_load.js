module.exports = function () {
  const tooltipTriggerList = document.querySelectorAll(
    "[data-bs-toggle=\"tooltip\"]"
  );
  [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  );

  document.querySelectorAll(".tooltip").forEach((tooltip) => {
    tooltip.remove();
  });
};

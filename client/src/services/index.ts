export const handleBlur = (event: Event) => {
  const target = event.target as HTMLInputElement;
  target.style.borderColor = target.value
    ? "rgba(229,231,235, 1)"
    : "rgba(255, 0, 0, 1)";
};
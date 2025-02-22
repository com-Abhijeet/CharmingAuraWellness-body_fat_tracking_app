export const initScrollBlob = () => {
  const blob = document.querySelector(".homepage::before") as HTMLElement;

  if (blob) {
    window.addEventListener("scroll", () => {
      const scrollPosition = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const scrollFraction = scrollPosition / maxScroll;

      const startX = 5; // Starting left position in percentage
      const startY = 10; // Starting top position in percentage
      const endX = 95; // Ending right position in percentage
      const endY = 90; // Ending bottom position in percentage

      const currentX = startX + (endX - startX) * scrollFraction;
      const currentY = startY + (endY - startY) * scrollFraction;

      blob.style.transform = `translate(${currentX}%, ${currentY}%)`;
      console.log(`Blob position: (${currentX}%, ${currentY}%)`);
    });
  } else {
    console.error("Blob element not found");
  }
};
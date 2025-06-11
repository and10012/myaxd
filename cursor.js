    const floatingImg = document.getElementById("floating-image");
    let mouseX = 0, mouseY = 0, currentX = 0, currentY = 0;
    document.addEventListener("mousemove", e => {
      mouseX = e.clientX + 20; mouseY = e.clientY + 20;
    });
    (function animate() {
      currentX += (mouseX - currentX) * 0.05;
      currentY += (mouseY - currentY) * 0.05;
      floatingImg.style.left = currentX + 'px';
      floatingImg.style.top  = currentY + 'px';
      requestAnimationFrame(animate);
    })();


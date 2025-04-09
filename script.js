const imageClasses = ['img1', 'img2', 'img3', 'img4', 'img5'];
const container = document.getElementById('image-container');
const resetBtn = document.getElementById('reset');
const verifyBtn = document.getElementById('verify');
const para = document.getElementById('para');
const heading = document.getElementById('h');
let selectedImages = [];

// Create array of 6 images: 5 unique, 1 duplicate
let selected = [...imageClasses];
let duplicate = imageClasses[Math.floor(Math.random() * 5)];
selected.push(duplicate);

// Shuffle images
selected = selected.sort(() => Math.random() - 0.5);

// Render images
selected.forEach((cls, idx) => {
  const img = document.createElement('img');
  img.classList.add(cls);
  img.setAttribute('data-id', cls);
  img.addEventListener('click', () => handleImageClick(img));
  container.appendChild(img);
});

function handleImageClick(img) {
  if (selectedImages.length >= 2) return;
  if (img.classList.contains('selected')) return;
  
  img.classList.add('selected');
  selectedImages.push(img);

  resetBtn.style.display = 'inline-block';
  if (selectedImages.length === 2) {
    verifyBtn.style.display = 'inline-block';
  }
}

// Reset functionality
resetBtn.addEventListener('click', () => {
  selectedImages.forEach(img => img.classList.remove('selected'));
  selectedImages = [];
  resetBtn.style.display = 'none';
  verifyBtn.style.display = 'none';
  para.innerText = '';
  heading.innerText = "Please click on the identical tiles to verify that you are not a robot.";
});

// Verify functionality
verifyBtn.addEventListener('click', () => {
  verifyBtn.style.display = 'none';

  const [img1, img2] = selectedImages;
  const id1 = img1.getAttribute('data-id');
  const id2 = img2.getAttribute('data-id');

  if (id1 === id2) {
    para.innerText = "You are a human. Congratulations!";
  } else {
    para.innerText = "We can't verify you as a human. You selected the non-identical tiles.";
  }
});

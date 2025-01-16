const startDetectionButton = document.getElementById('start-detection');
const showEmotionsButton = document.getElementById('show-emotions');
const startAgainButton = document.getElementById('start-again');
const resultDiv = document.getElementById('result');
const cameraElement = document.getElementById('camera');
let captureInterval;
let mediaStream;

// Initialize the camera preview
async function initializeCamera() {
try {
mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
cameraElement.srcObject = mediaStream;
} catch (error) {
console.error('Error accessing camera:', error);
resultDiv.innerText = 'Unable to access camera. Please check permissions.';
}
}

// Capture and send frame to the backend
async function captureImage() {
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

canvas.width = cameraElement.videoWidth;
canvas.height = cameraElement.videoHeight;
context.drawImage(cameraElement, 0, 0, canvas.width, canvas.height);

const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg'));
const formData = new FormData();
formData.append('file', blob, 'frame.jpg');

try {
await fetch('/process-frame', {
method: 'POST',
body: formData,
});
} catch (error) {
console.error('Error sending frame to backend:', error);
}
}

// Fetch and display emotions
async function fetchTopEmotions() {
try {
const response = await fetch('/get-emotions');
const result = await response.json();

if (result.emotions) {
resultDiv.innerHTML = `
<h3>Top Detected Emotions:</h3>
<div class="emotion-list">
    ${result.emotions.map(emotion => `
    <div class="emotion-item">
        <strong>${emotion.emotion}</strong>: ${emotion.percentage}
    </div>
    `).join('')}
</div>
`;
} else {
resultDiv.innerText = result.error || 'No emotions detected yet.';
}
} catch (error) {
resultDiv.innerText = 'Error fetching emotions: ' + error.message;
}
}

// Clear emotions on the backend
async function clearEmotions() {
try {
const response = await fetch('/clear-emotions', { method: 'POST' });
const result = await response.json();
resultDiv.innerText = result.message || 'Emotions cleared.';
} catch (error) {
resultDiv.innerText = 'Error clearing emotions: ' + error.message;
}
}

// Handle Start Detection
startDetectionButton.addEventListener('click', () => {
startDetectionButton.style.display = 'none';
showEmotionsButton.style.display = 'inline-block';
startAgainButton.style.display = 'inline-block';

// Start capturing frames every 2 seconds
captureInterval = setInterval(captureImage, 2000);
});

// Handle Show Emotions
showEmotionsButton.addEventListener('click', fetchTopEmotions);

// Handle Start Again
startAgainButton.addEventListener('click', async () => {
await clearEmotions(); // Clear emotions in backend
clearInterval(captureInterval); // Stop capturing frames

// Reset UI
startDetectionButton.style.display = 'inline-block';
showEmotionsButton.style.display = 'none';
startAgainButton.style.display = 'none';

// Restart the camera preview
await initializeCamera();
});

// Initialize the camera on page load
initializeCamera();
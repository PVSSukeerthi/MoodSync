# MoodSync: Mood-Based Visual & Audio Effects Recommendation System through Facial Recognition

## Overview
MoodSync is a mood-based recommendation system leveraging facial recognition to enhance mental well-being. Built on the NXP EdgeReady Smart Machine Interface (SHMI) solution, our project utilizes the i.MX RT117H crossover MCU. By detecting the user’s mood, MoodSync curates calming visuals, relaxing physical activities, and mood-specific music to uplift their mental state.


This project is in its demo stage and aims to simplify how moods can be understood and improved.

---

## Features
- **Mood Detection**: 
  - Detects user mood via facial recognition using our ML model.
  - Incorporates OpenCV for face detection and video capture.
  - Utilizes a DeepFace pre-trained model for emotion detection.

- **Visual and Audio Recommendations**:
  - Displays calming visuals based on detected emotions, following principles of color psychology.
  - Plays curated music designed to shift the user’s mood gradually, following the ISO Principle.
  - Integrated RGB LED lighting to reflect the detected mood, with potential for room lighting adjustments in future applications.

---

## How It Works
1. **Mood Detection**:
   - User’s facial features are captured via the ML model.
   - Recommended to remove eyeglasses for accurate results.
   - Note: Stress on the forehead may slightly affect detection accuracy.

2. **Recommendations**:
   - Mood-specific visuals displayed on an LCD, developed using MCUXpresso IDE.
   - Mood-specific music played via a speaker, also programmed using MCUXpresso IDE.
   - Displays a QR code to access curated playlists, which can be customized later.

3. **Research and Design**:
   - Research on color psychology influences the selection of visuals.
   - Playlists curated through student reviews to ensure diverse and effective mood alignment.

---

## Hardware and Software
### Hardware
- **NXP EdgeReady SMHMI Solution**:
  - i.MX RT117H crossover MCU
  - Supports multimodal capabilities including vision, voice, and 2D GUI.

### Software
- **MCUXpresso IDE**:
  - Development environment for custom elements on the LCD and speaker.

- **Machine Learning Model**:
  - Developed using OpenCV for video capture.
  - Built on DeepFace pre-trained model with enhanced emotion detection features.
  - Integrated into a web application using Flask.
  - Improvements include:
  - Capturing emotions every 2 seconds and storing them in a list.
  - Providing the top three detected moods, which form the basis for personalized recommendations.
  g- Focuses on specific emotions: stress, happy, sad, neutral.


---

## Deployment and Use
- **QR Code Integration**:
  - Scan the QR code to access our website hosting the ML model.

- **Future Possibilities**:
  - Prototype can be extended as a home appliance for dynamic lighting and personalized environment adjustments.

---

## Collaboration and Contact
This repository hosts the ML model for MoodSync. If you are interested in using our project, particularly its hardware-dependent aspects, please contact us directly. 

---
## References and Credits

We would like to acknowledge the following GitHub repository as a reference for this project:

- **[DeepFace Pre-trained Model](https://github.com/manish-9245/Facial-Emotion-Recognition-using-OpenCV-and-Deepface)**: The DeepFace library was utilized as a foundation for emotion detection in our machine learning model. Additional enhancements were made to improve the functionality for our specific use case.


## Contributors

- [Sowmya Venigalla](https://github.com/sowmyavenigalla)
- [Varsha Yamsani](https://github.com/varshayamsani)
- [PVS Sukeerthi](https://github.com/PVSSukeerthi)
- [Akshaya Bysani](https://github.com/Akshaya8583)




# SpatialSkills - managed by Joseph Doogan
Code from spatial skills app created at University with accompanying documentation (minus dissertation)
Single Page Application created using JQueryMobile, JQuery, JavaScript, HTML and CSS.
Drawing Canvases are created using the HTML5 Canvas element supported by JavaScript and occasional JQuery.

Structure of app allows deployment to iOS and Android devices using PhoneGap.

# Test the app on a desktop browser

1. Navigate to the www folder and open the index.html page (e.g using Chrome)
2. Navigate through the app

# Simulate testing the app on a mobile device such as an iPad

1. Navigate to the www folder and open the index.html page in Chrome
2. Open Chrome Developer Tools and ensure Device Toolbar is enabled
3. Select an iPad for example, or any other device to simulate operation
4. Navigate through the app
5. Select the Rotate button to change between landscape and protrait modes

# Drawing Exercice Questions

Can be found in www\img\Section* - where Section represents the appropriate Moodle Section

# Spatial Skills with Admin Pages 

***Not Finished and needs tidied but this should enable new questions to be added***

1. Navigate to the www folder and open an Admin Page
2. Enable Chrome Developer Tools and simulate an iPad (mouse clicks may be enabled later)
3. Draw the question image and the answer image(s)
4. Click the WriteToJSON Button
5. Exit Chome Developer Tools
6. Copy the JSON String
7. Navigate to the releveant question file in the www\js\ folder e.g. js\Exercise1Questions.js
8. Paste the JSON string at the end of the question file (remember to leave commas between questions).
9. Navigate up one level to the www folder again and open index.html
10. Verify your new question has been added by testing the app
11. Take a screenshot of the question/answer and place it in www\img\Section* - where * is the relevant number

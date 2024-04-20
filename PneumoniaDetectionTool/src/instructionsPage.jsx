import React from "react";
import './instructionsPage.css'; // Ensure you have this CSS file to style the page

const InstructionsPage = () => {
    return (
        <div className="pageContainer">
            <div className="instructionsContainer">
                <h1>Instructions on How to Use the Tool</h1>
                <p>Open the Dropdown menu on the Homepage and navigate to "Take a Test".</p>
                <ol>
                    <li>Please upload an RGB x-ray. Do not upload a grayscale x-ray.</li>
                    <li>Click on "Submit" and let the Tool do its work!</li>
                    <li>The Tool will display the class of your X-ray and its confidence percentage.</li>
                    <li>If the tool shows the class of your X-ray as "Pneumonia" or a "Normal" class with confidence/probability less than 70%, <strong>Please refer to the Remedies section below.</strong></li>
                </ol>
            </div>

            <div className="remediesContainer">
                <h1>Remedies and When to See a Doctor</h1>
                <h2>Supportive Treatments and Home Remedies</h2>
                <ul>
                    <li><strong>Rest:</strong> Adequate rest helps the body fight the infection and speeds up recovery.</li>
                    <li><strong>Fluids:</strong> Drinking plenty of fluids (water, juice, clear broths) helps prevent dehydration and may assist in loosening mucus in the lungs.</li>
                    <li><strong>Humidifier:</strong> Using a cool-mist humidifier can help ease breathing and soothe irritated lungs and airways.</li>
                    <li><strong>Warm Compresses:</strong> Applying a warm damp cloth or a heating pad to the chest can help relieve discomfort.</li>
                    <li><strong>Avoid Smoke Exposure:</strong> Stay away from cigarette smoke and polluted air to avoid worsening lung irritation.</li>
                    <li><strong>Proper Nutrition:</strong> Eating a healthy, balanced diet rich in fruits, vegetables, lean proteins, and whole grains supports immune function.</li>
                    <li><strong>Elevate the Head During Sleep:</strong> Sleeping with the head elevated can make breathing easier and more comfortable.</li>
                </ul>

                <h2>Preventative Measures</h2>
                <ul>
                    <li><strong>Vaccinations:</strong> Stay up-to-date with vaccinations. The pneumococcal vaccine protects against one type of pneumonia and the annual flu vaccine can help prevent influenza-related pneumonia.</li>
                    <li><strong>Hand Hygiene:</strong> Regular hand washing is crucial in preventing the spread of infections.</li>
                    <li><strong>Avoid Ill Contacts:</strong> Keep distance from people who are sick, as pneumonia can be contagious, especially viral and bacterial types.</li>
                </ul>

                <h2>When to See a Doctor</h2>
                <p>It’s important to seek medical attention if you or someone you care for has symptoms of pneumonia, especially if they belong to a high-risk group. Symptoms include:</p>
                <ul>
                    <li>Persistent fever (temperature over 102°F)</li>
                    <li>Cough, often with phlegm</li>
                    <li>Chills or severe shaking</li>
                    <li>Shortness of breath or difficulty breathing</li>
                    <li>Chest pain that worsens with breathing or coughing</li>
                    <li>Sudden onset of confusion (especially in the elderly)</li>
                    <li>Bluish skin tone, signaling a lack of oxygen</li>
                </ul>
                <p>Immediate medical evaluation can determine the cause of pneumonia and the appropriate treatment. Delaying treatment of pneumonia can lead to serious complications.</p>
            </div>
        </div>
    );
};

export default InstructionsPage;

import sys,json,traceback
from tensorflow import keras
import numpy as np
from PIL import Image

def load_saved_model(model_path="C:\\PneumoniaDetectionTool\\PneumoniaDetectionTool\\resnet152v2_feature_extraction_final_best_model"):
    #print('Loading Model at:', model_path)
    model = keras.models.load_model(model_path)
    #print('Model Loaded Successfully')
    return model

def read_and_preprocess_image(image_path):
    #*print('Reading Image from:', "C:/Users/purih/Downloads/NORMAL2-IM-1427-0001.jpeg")
    #*im = Image.open("C:/Users/purih/Downloads/NORMAL2-IM-1427-0001.jpeg")
    #print('Reading Image from:', image_path)
    im = Image.open(image_path)
    #print('Image Loaded Successfully')
    #if im.mode == 'RGB':
        #print("The image is in RGB format.")
    #else:
        #print("The image is not in RGB format.")
    im_shape = np.array(im).shape
    #print('Received Image Shape:', im_shape)
    if len(im_shape) != 3:
        raise Exception('Uploaded Image is grayscale(has only 2 color channels) and cannot be processed!')
    if im_shape[2] != 3:
        raise Exception('Uploaded Image is grayscale(has only 2 color channels) and cannot be processed!')
    im = im.resize((224, 224))
    #print('Resized Image Shape:', np.array(im).shape)
    return im

def convert_image_to_numpy_array(im):
    x = np.array([
        np.array(im)
    ])
    #print('Predict Function Input X Shape:', x.shape)
    return x

# IMPORT & USE THIS FUNCTION
def predict_result(img_path, model = None):
    '''
    PASS THE FULL IMAGE PATH (better not to use relative paths)
    '''
    if model == None:
        model = load_saved_model()
        
    
    im = read_and_preprocess_image(img_path)
    x = convert_image_to_numpy_array(im)
    prediction = model.predict(x)
    predicted_proba = prediction[0][0]
    predicted_class = "NORMAL"
    predicted_proba = float(predicted_proba)
    if predicted_proba > 0.5:
        predicted_class = "PNEUMONIA"
    else:
        predicted_proba = (1 - predicted_proba)
        #predicted_proba = float(predicted_proba)
    return_dict = {
        'probability': predicted_proba,'most_probable_class': predicted_class
    }
    #print("Prediction Result:", return_dict)
    json_string = json.dumps(return_dict)
    return json_string
    
if __name__ == "__main__":
    try:
        img_path = sys.argv[1] if len(sys.argv) > 1 else None
        if img_path is None:
        #print("Error: No image path provided")
         sys.exit(1)
    
    # Optional: Load a specific model if a second argument is provided
        model_path = sys.argv[2] if len(sys.argv) > 2 else "C:\\PneumoniaDetectionTool\\PneumoniaDetectionTool\\resnet152v2_feature_extraction_final_best_model"
        model = load_saved_model(model_path)  
        result = predict_result(img_path, model)
        #print(json.dumps(result))
        print(result)
    except Exception as e:
        traceback.print_exc()
        sys.exit(1)

    





    #print(json.dumps(result))  # Ensure the output is in JSON format
    #res = predict_result('./test_images/normal_1.jpg')
    # res = predict_result('./test_images/pneumonia_1.jpeg')
    # print('Import and use predict_result()')
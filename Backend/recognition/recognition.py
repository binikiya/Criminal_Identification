import cv2
import numpy as np
import os
from django.conf import settings

class FaceRecognitionService:
    def __init__(self):
        cascade_path = os.path.join(settings.BASE_DIR, 'haarcascade_frontalface_default.xml')
        self.face_detector = cv2.CascadeClassifier(cascade_path)

        self.recognizer = cv2.face.LBPHFaceRecognizer_create()

    def detect_face(self, image_path):
        img = cv2.imread(image_path)
        if img is None:
            raise ValueError("Image could not be loaded. Please check the path.")

        gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

        faces = self.face_detector.detectMultiScale(
            gray_img, 
            scaleFactor=1.2, 
            minNeighbors=5, 
            minSize=(30, 30)
        )

        if len(faces) == 0:
            return None, None

        (x, y, w, h) = faces[0]

        cropped_face = gray_img[y:y+w, x:x+h]
        
        return cropped_face, faces[0]

    def train_model(self, faces, labels):
        labels_np = np.array(labels, dtype=np.int32)

        self.recognizer.train(faces, labels_np)

        model_path = os.path.join(settings.BASE_DIR, 'lbph_trained_model.yml')
        self.recognizer.save(model_path)
        return model_path

    def recognize_face(self, face_image):
        model_path = os.path.join(settings.BASE_DIR, 'lbph_trained_model.yml')
        if not os.path.exists(model_path):
            raise FileNotFoundError("Trained model not found. Please train the model first.")
            
        self.recognizer.read(model_path)

        label_id, confidence = self.recognizer.predict(face_image)

        return label_id, confidence
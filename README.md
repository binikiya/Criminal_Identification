# Criminal Identification System with Face Recognition

## 📌 Overview
The **Criminal Identification System with Face Recognition** is a web-based application designed to assist law enforcement agencies worldwide in identifying and managing criminal records.  
It leverages **Django REST Framework** for backend services, **React + Bootstrap** for frontend interfaces, and **PostgreSQL** for secure, scalable data storage.  
Facial recognition is implemented using **OpenCV** and deep learning models to generate embeddings that are matched against stored records.

---

## 🚀 Features
- Face detection and recognition using OpenCV and LBPH / deep learning models
- Criminal record management (add, update, delete, search)
- Case registration and scheduling (international calendar support)
- Role-based authentication with JWT (Admin, Officer, Investigator)
- Real-time alerts and notifications
- Report generation and analytics
- Scalable PostgreSQL database with backup and recovery support
- Responsive UI with React + Bootstrap

---

## 🏗️ System Architecture
The system follows a **three-tier architecture**:

1. **Frontend (React + Bootstrap)**  
   - User dashboards, case management, and recognition results  
   - API communication via Axios  

2. **Backend (Django REST Framework)**  
   - Authentication and role-based access control  
   - Facial recognition processing (OpenCV + embeddings)  
   - Business logic for case and criminal management  

3. **Database (PostgreSQL)**  
   - Stores criminal records, facial embeddings, case logs, and user accounts  
   - Optimized schema for large-scale queries  

---

## ⚙️ Tech Stack
- **Frontend:** React, Bootstrap, React Icons, Axios
- **Backend:** Django REST Framework, OpenCV, face-recognition library
- **Database:** PostgreSQL
- **Authentication:** JWT (JSON Web Token)
- **Deployment:** Docker, Nginx, Cloud (AWS/Azure/Heroku)

---

## 📂 Project Structure
- Criminal_Identification
    - Backend
        - recognition
        - users
        - cases
        - messages
    - Frontend
        - components
        - pages
        - layouts
        - services
        - docs

---

## 🔧 Installation & Setup

### Prerequisites
- Python 3.10+
- Node.js 18+
- PostgreSQL 14+
- Docker (optional, for containerized deployment)

---

### Backend Setup (Django)
```bash
cd backend
python -m venv venv
source venv/bin/activate   # Linux/Mac
venv\Scripts\activate      # Windows

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

---

### Frontend Setup (React)
```bash
cd frontend
npm install
npm start
```

---

### Database Setups (Postgres)
```bash
CREATE DATABASE criminal_db;
CREATE USER criminal_user WITH PASSWORD 'bini';
GRANT ALL PRIVILEGES ON DATABASE criminal_db TO criminal_user;
```

---

## 🔒 Security
- Passwords hashed with SHA-256
- JWT-based authentication
- Role-based access control (Admin, Officer, Investigator)
- Encrypted database connections

---

## 🧪 Testing
- Backend: Django unit tests (pytest, unittest)
- Frontend: React testing library + Jest
- Integration: API endpoint testing with Postman

```bash
pytest
npm test
```

---

## 📊 Future Enhancements
- Integration with Interpol and international law enforcement APIs
- Advanced deep learning models (FaceNet, Dlib, ArcFace)
- Distributed database for global scalability
- Mobile app support (React Native)

---

## 🤝 Contribution
Contributions are welcome!
- Fork the repository
- Create a feature branch (git checkout -b feature-name)
- Commit changes (git commit -m "Add feature")
- Push to branch (git push origin feature-name)
- Open a Pull Request

---

## 📜 License
This project is licensed under the MIT License.
You are free to use, modify, and distribute with proper attribution.

---

## 👥 Author
- Biniyam Tamene

---

## 🌍 Acknowledgements
- OpenCV community for face recognition libraries
- Django REST Framework contributors
- React & Bootstrap developers
- PostgreSQL open-source community
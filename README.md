# 📊 Full Stack Data Analytics Dashboard

A full-stack web application built with **React.js**, **Django REST Framework**, **Pandas**, and **Matplotlib** that allows users to upload CSV datasets, perform basic data cleaning, visualize data, and download the cleaned dataset.

---

## 🚀 Features

### 📂 Dataset Upload
- Upload CSV files
- Analyze uploaded datasets

### 📋 Dataset Information
- Dataset Shape
- Number of Rows & Columns
- Column Names
- Data Types
- Missing Values
- Duplicate Rows
- Memory Usage

### 🧹 Data Cleaning
- Remove Duplicate Rows
- Remove Rows with Missing Values
- Delete Selected Columns

### 📈 Data Visualization
- Histogram
- Bar Chart
- Pie Chart

### 💾 Download
- Download the cleaned dataset as a CSV file

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router
- Axios
- CSS

### Backend
- Django
- Django REST Framework

### Data Processing
- Pandas
- NumPy

### Data Visualization
- Matplotlib

---

## 📁 Project Structure

```
SAAS/
│
├── api/                 # Django Backend
│   ├── analytics/
│   ├── media/
│   ├── manage.py
│
├── frontend/            # React Frontend
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/fullstack-data-analytics-dashboard.git
```

```bash
cd fullstack-data-analytics-dashboard
```

---

### 2. Backend Setup

```bash
cd api
```

Create a virtual environment

```bash
python -m venv .venv
```

Activate it

Windows

```bash
.venv\Scripts\activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run the server

```bash
python manage.py runserver
```

---

### 3. Frontend Setup

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Run the development server

```bash
npm run dev
```

---

## 📷 Screenshots

### Dataset Information

_Add screenshot here_

### Data Cleaning

_Add screenshot here_

### Histogram

_Add screenshot here_

### Bar Chart

_Add screenshot here_

### Pie Chart

_Add screenshot here_

---

## 🌐 Live Demo

Frontend: _Coming Soon_

Backend API: _Coming Soon_

---

## 🔮 Future Enhancements

- Summary Statistics
- Fill Missing Values
- Excel (.xlsx) Support
- Additional Charts
- User Authentication
- Dashboard Improvements

---

## 👨‍💻 Author

**Ragupathy V**

GitHub: https://github.com/ragupayhy-v

LinkedIn: https://www.linkedin.com/in/ragupathyv/

---

## 📄 License

This project is developed for educational and portfolio purposes.
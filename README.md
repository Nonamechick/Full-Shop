# **Simple Product Store - MERN Stack**  

🛍️ **Lightweight E-Commerce with React 19, Node.js 22 & Vite**  

A minimal product store showcasing modern web development with:  
- **React 19** (with Vite for ultra-fast development)  
- **Node.js 22** (latest LTS version)  
- **MongoDB** for database  
- **Tailwind CSS** for styling  

## **✨ Core Features**  

### **Frontend (React 19 + Vite)**  
- 📦 Product listing with images  
- 🔍 Basic search functionality  
- 🛒 Simple cart system (client-side only)  
- 📱 Fully responsive design  

### **Backend (Node.js 22 + Express)**  
- 🗄️ MongoDB product storage  
- 📡 REST API endpoints for products  
- ⚡ Fast Node.js 22 performance  

## **🛠️ Technology Stack**  

| **Component** | **Technology** |  
|--------------|--------------|  
| Frontend | React 19, Vite 5, Tailwind CSS |  
| Backend | Node.js 22, Express, MongoDB |  
| Styling | Tailwind CSS |  
| Routing | React Router |  

## **🚀 Setup Instructions**  

1. **Clone repository**  
```bash
git clone https://github.com/your-username/product-store.git
cd product-store
```

2. **Install dependencies**  
```bash
# Frontend
cd client && npm install

# Backend 
cd ../server && npm install
```

3. **Configure MongoDB**  
Create `.env` in `/server`:  
```env
MONGO_URI=mongodb://localhost:27017/product-store
PORT=5000
```

4. **Run development servers**  
```bash
# Backend (Node.js)
cd server && npm start

# Frontend (React)
cd client && npm run dev
```

## **📸 Screenshot Preview**  
![Product Page](https://github.com/user-attachments/assets/ac484a81-6974-456a-aa3b-d80f00fbb747)  
*Clean product listing page with search*

## **📝 Notes**  
- No user authentication included  
- Cart data persists only in browser  
- Easy to extend with additional features  

## **📜 License**  
MIT - Free to use and modify  

---

🛒 **A clean, modern product store built with cutting-edge technologies**

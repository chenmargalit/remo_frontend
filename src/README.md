# React Frontend (Dockerized)

This is a simple React application, containerized for production use.

---

## 🚀 Quick Start

### 1. Build the Docker image
```bash
docker build -t react-client .
```

### 2. Run the container
```bash
docker run -p 3000:3000 react-client
```

Then visit: [http://localhost:3000](http://localhost:3000)

---

## 🧪 Development Mode (Optional)

To run with hot reload using host machine:
```bash
npm install
npm start
```

Make sure you have Node.js installed locally for development mode.

---

## 🗂 Project Structure

```
.
├── public/
├── src/
├── Dockerfile
├── package.json
└── README.md
```

---

## 🛠 Built With

- React
- Docker
- serve (for static production server)

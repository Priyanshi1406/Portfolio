# Priyanshi — Personal Portfolio Website
**Thiranex Internship Project #1 · Full Stack · Node.js + MongoDB + Vercel**

---

## Tech Stack
| Layer | Tool | Why |
|---|---|---|
| Frontend | HTML, CSS, JS | No framework overhead, full control |
| Backend | Node.js + Express.js | Fast, lightweight server |
| Database | MongoDB + Mongoose | Flexible NoSQL for project data |
| Deployment | Vercel | Free, instant, auto-deploy from GitHub |

---

## Project Structure
```
portfolio/
├── public/
│   ├── index.html      ← Frontend (all sections)
│   ├── style.css       ← Dark editorial design + animations
│   └── script.js       ← Cursor, scroll effects, API calls
├── models/
│   ├── Project.js      ← MongoDB schema for projects
│   └── Contact.js      ← MongoDB schema for messages
├── routes/
│   ├── projects.js     ← GET/POST /api/projects
│   └── contact.js      ← POST /api/contact
├── server.js           ← Express app entry point
├── vercel.json         ← Vercel deployment config
├── .env.example        ← Environment variables template
└── package.json
```

---

## Setup (Local)

### 1. Clone & Install
```bash
git clone https://github.com/YOUR_USERNAME/portfolio.git
cd portfolio
npm install
```

### 2. Set Environment Variables
```bash
cp .env.example .env
# Edit .env and add your MongoDB Atlas URI
```

### 3. Get MongoDB Atlas URI
1. Go to [mongodb.com/atlas](https://mongodb.com/atlas) → Login
2. Create a Cluster (free M0 tier)
3. Click **Connect** → **Drivers** → Copy URI
4. Replace `<username>` and `<password>` in your `.env`

### 4. Run Locally
```bash
npm start
# Open http://localhost:3000
```
Projects are auto-seeded on first run if DB is empty!

---

## Deploy to Vercel

### Step 1 — Push to GitHub
```bash
git init
git add .
git commit -m "Initial portfolio"
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
```

### Step 2 — Deploy
1. Go to [vercel.com](https://vercel.com) → Sign in with GitHub
2. Click **Add New Project** → Import your repo
3. Framework: **Other**
4. Add Environment Variable:
   - Key: `MONGO_URI`
   - Value: your MongoDB Atlas URI
5. Click **Deploy** → Done! 🎉

---

## API Endpoints
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/projects` | Get all projects from MongoDB |
| POST | `/api/projects` | Add a new project |
| DELETE | `/api/projects/:id` | Delete a project |
| POST | `/api/contact` | Save contact message |
| GET | `/api/contact` | View all messages (admin) |

---

## Customization
- Edit **name, bio, links** in `public/index.html`
- Change **colors** in `public/style.css` (`:root` CSS variables)
- Add projects via API: `POST /api/projects` with JSON body
- Update GitHub/LinkedIn links in the contact section

---

*Built for Thiranex Full Stack Internship · THX-MAY2526-1056*

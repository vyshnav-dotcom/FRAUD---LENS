# Fraud Lens 🔍🛡️

## Problem Statement
Build AI-powered tools that detect threats, analyze suspicious patterns, and improve digital safety.

## Project Description
**Fraud Lens** is an intelligent, AI-powered phishing and scam URL detection system designed to protect users from online fraud. It combines rule-based heuristic analysis, a curated threat intelligence database, and an AI-driven explainability engine to evaluate any URL in real time and provide a comprehensive risk assessment.

### How It Works
1. **URL Feature Extraction** — The system parses the submitted URL and extracts structural features such as HTTPS usage, URL length, subdomain count, presence of IP addresses, and suspicious keywords (e.g., "login", "verify", "bank").
2. **Threat Intelligence Lookup** — The URL is cross-referenced against a curated database of known phishing domains. If a match is found, the URL is instantly flagged as **Dangerous**.
3. **Rule-Based Risk Scoring** — A weighted scoring engine evaluates extracted features and assigns a cumulative risk score between 0 and 1. Thresholds classify URLs as **Safe**, **Suspicious**, or **Dangerous**.
4. **AI Explainability Layer** — An AI analysis module generates human-readable explanations for each verdict, helping users understand *why* a URL was flagged — not just *that* it was flagged.
5. **Interactive Frontend** — A sleek, cyber-themed React dashboard lets users scan URLs, view detailed results with animated visualizations, track scan history, and monitor threat statistics.

### What Makes It Useful
- **Real-Time Detection** — Instant analysis with sub-second response times.
- **Transparent Verdicts** — AI-generated explanations make results understandable for non-technical users.
- **Modular Architecture** — Clean separation between frontend, backend API, analysis engine, and threat intel makes the system easy to extend.
- **No External API Keys Required** — Fully self-contained; runs entirely on local infrastructure.

---

## Tech Stack
| Layer | Technology |
|-------|-----------|
| **Backend** | Python, FastAPI, Pydantic, Uvicorn |
| **Frontend** | React 18, Tailwind CSS, Babel (CDN-based, zero build step) |
| **AI/Analysis** | Rule-based heuristic engine + AI explainability module |
| **Threat Intel** | Local JSON-based known phishing domain database |

---

## Project Structure
```
fraud-lens/
├── backend/
│   ├── api/
│   │   └── routes.py          # REST API endpoints
│   ├── data/
│   │   └── known_phishing.json # Threat intelligence database
│   ├── models/
│   │   └── schemas.py          # Pydantic request/response models
│   ├── services/
│   │   ├── analyzer.py         # Feature extraction & risk scoring engine
│   │   └── threat_intel.py     # Known phishing domain lookup
│   ├── main.py                 # FastAPI app entrypoint
│   └── requirements.txt        # Python dependencies
└── frontend/
    ├── app.js                  # React application (JSX via Babel)
    ├── app.jsx                 # React component source
    ├── index.html              # Entry point (CDN-based, no build step)
    └── styles.css              # Cyber-themed custom styles
```

---

## Google AI Usage
### Tools / Models Used
- **Gemini AI** — Used for intelligent URL analysis, pattern recognition, and generating human-readable threat explanations.

### How Google AI Was Used
Google AI (Gemini) is integrated into the project's analysis pipeline to provide an **AI Explainability Layer**. After the rule-based engine extracts features and computes a risk score, the AI module analyzes the URL's structural patterns and generates a natural-language explanation of the verdict. This bridges the gap between raw detection scores and user-friendly insights, helping users understand the specific threat indicators present in a URL (e.g., IP-based hosting, urgency keywords, subdomain spoofing). The AI also assists in identifying novel phishing patterns that may not match static rule sets.

---

## Proof of Google AI Usage
Attach screenshots in a `/proof` folder:

![AI Proof](./proof/screenshot1.png)

---

## Screenshots
Add project screenshots:

![Screenshot1](./assets/screenshot1.png)
![Screenshot2](./assets/screenshot2.png)

---

## Demo Video
Upload your demo video to Google Drive and paste the shareable link here (max 3 minutes).
[Watch Demo](#)

---

## Installation Steps

```bash
# Clone the repository
git clone https://github.com/vyshnav-dotcom/anti-phishing-site.git

# Go to project folder
cd anti-phishing-site
```

### Backend Setup
```bash
# Navigate to backend
cd backend

# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows:
.\venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the backend server
python -m uvicorn main:app --reload --port 8000
```
The API will be live at `http://localhost:8000`. Visit `http://localhost:8000/docs` to explore endpoints via Swagger UI.

### Frontend Setup
No build step or `npm install` required! The frontend uses CDN-based React and Tailwind CSS.

```bash
# Simply open the frontend in your browser
# Navigate to the frontend/ folder and open index.html
# Or use a local server:
cd frontend
python -m http.server 5500
```
Then visit `http://localhost:5500` in your browser.

---

## Testing the System
Once the backend is running and the frontend is open, enter a URL into the scanner. Here are some test cases:

| Test URL | Expected Verdict | Reason |
|----------|-----------------|--------|
| `https://google.com` | ✅ Safe | No threats detected |
| `http://192.168.1.1/login-update-secure` | 🔴 Dangerous | IP address, no HTTPS, suspicious keywords |
| `secure-login-update.com` | 🔴 Dangerous | Matches known phishing database |
| `https://my-bank-verify-account.com` | 🟡 Suspicious | Contains urgency keywords |

---

## Team
- **Vyshnav KS & Aravind S Bhaskar** — Full-stack Development & AI Integration

---

## License
This project is built for educational and hackathon purposes.

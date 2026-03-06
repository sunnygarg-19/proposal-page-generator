# 💌 Proposal Page Generator

> Create a personalized, animated proposal page and share it with your crush — get secretly notified when they say YES! ❤️

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## ✨ What is this?

**Proposal Page Generator** is a fun, no-backend web app that lets you:

1. Fill out a simple form with your name, your crush's name, and a few personal details.
2. Get a unique shareable link customized just for them.
3. Send the link — they go through a cute animated proposal flow.
4. When they click **YES ❤️**, you get a secret email notification instantly!

---

## 🚀 Live Demo

> 🔗 [Add your deployed link here once live!]

---

## 🖼️ Features

- 💖 **Animated Proposal Flow** — 6 interactive steps to build up the big question
- 🎨 **Glassmorphism UI** — Beautiful frosted-glass card design with floating hearts
- 🎯 **Personalized Details** — Crush's name, dream car, favourite outfit, and a custom success message
- 📧 **Secret Email Notification** — Powered by [FormSubmit](https://formsubmit.co/), no backend needed
- 😂 **Elusive "NO" Button** — The NO button runs away when hovered/touched 😈
- 🎉 **Confetti on YES** — Celebration confetti burst when they say yes
- 📱 **Fully Responsive** — Works beautifully on mobile and desktop

---

## 📁 Project Structure

```
proposal-page-generator/
├── index.html        # Main HTML — all three views (Landing, Share, Proposal)
├── styles.css        # Styling, animations & glassmorphism design
├── app.js            # All app logic — URL params, step transitions, effects
├── DEPLOYMENT_GUIDE.md  # Step-by-step guide to deploy for free
└── README.md
```

---

## 🛠️ How to Run Locally

No installation needed! Just:

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/proposal-page-generator.git

# Navigate into it
cd proposal-page-generator

# Open in browser (or use Live Server in VS Code)
open index.html
```

> ⚠️ The generated link will use `localhost` when running locally. See the [Deployment Guide](./DEPLOYMENT_GUIDE.md) to make links that work on any device.

---

## 🌍 How to Deploy (Free)

### Option 1 — Netlify Drop *(Easiest, 60 seconds)*
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag & drop your project folder
3. Get a live `https://` link instantly!

### Option 2 — GitHub Pages
1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Select `main` branch → Save
4. Your site will be live at `https://yourusername.github.io/proposal-page-generator`

📖 Full step-by-step instructions in [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

---

## 💡 How It Works

| Step | What Happens |
|------|-------------|
| 1 | You fill the form → a unique URL is generated with all details as query params |
| 2 | You share the link with your crush |
| 3 | They open it and go through the animated 6-step proposal |
| 4 | They click **YES** → confetti fires 🎊 |
| 5 | A silent POST request is sent to FormSubmit with your email → you get notified! |

---

## 📧 Email Notification Setup

This project uses [FormSubmit.co](https://formsubmit.co/) — a free, no-signup email service.

- Enter **your email** in the form
- The first time someone clicks YES, FormSubmit will send you a **confirmation email** — check your spam folder and click the link to activate it
- After that, every YES will land straight in your inbox ❤️

---

## 🤝 Contributing

Got ideas to make this more fun? PRs are welcome!

1. Fork the repo
2. Create your branch: `git checkout -b feature/my-cool-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push: `git push origin feature/my-cool-feature`
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">Made with ❤️ to help people shoot their shot</p>

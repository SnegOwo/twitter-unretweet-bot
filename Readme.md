# 🐦 Twitter/X Auto-Unretweet Script (Humanized & Safe)

> Automatically removes visible retweets from your profile while simulating human behavior to reduce the risk of account blocks.

---

## ⚠️ Disclaimer
- This script is **for personal use only**.
- Never share your tokens or sensitive account info.
- Use at your own risk. Script is provided **for educational purposes only**.
- Follow Twitter/X terms of service.

---

## 💡 Features
- Deletes visible retweets on your profile.
- Randomized pauses and “Coffee Breaks” to appear human.
- Configurable limit per session.
- Error handling to avoid spamming Twitter/X.
- Clear console logs to track progress.

---

## 🛠 How to run it in the backgroundBrowsers 
> Like Chrome or Firefox often "freeze" (hibernate) tabs that are not active or are minimized to save memory. If this happens, the script will stop.To keep the script running while you work on other things:Detach the tab: Click on your Twitter tab and drag it out of the browser bar to create a new, separate window.Keep it visible: Do NOT minimize this window to the taskbar/dock.Background it: Simply click on your other windows (Work, Youtube, etc.) to bring them to the front. As long as the Twitter window is "open" behind your main window (and not minimized), the script will keep running perfectly!
> The "Ding": The script will play a sound when it's done or if it hits an error, so you don't even need to check on it.

---

## ⚙️ Installation
1. Go to your Twitter/X profile → **Tweets & Replies** tab.
2. Open your browser console (`F12` or `Ctrl+Shift+J` on Windows).
3. Copy the contents of `twitter_deleter.js`.
4. Paste it into the console and press **Enter**.

---

## ⏱️ Configuration
Modify in the script:

```js
MAX_DELETE_LIMIT        // Max retweets per session
MIN_PAUSE / MAX_PAUSE   // Minimum and maximum time between actions (ms)
COFFEE_BREAK_EVERY      // Take a long break every X retweets
COFFEE_BREAK_DURATION   // Duration of long break (ms)
MAX_CONSECUTIVE_ERRORS  // Stop after X consecutive errors






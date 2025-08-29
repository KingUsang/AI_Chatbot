import "./globals.css";
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/github-dark.css'; 

export const metadata = {
  title: "MYGPT BOT AI",
  description: "AI ASSISTANT Similar to ChatGpt",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

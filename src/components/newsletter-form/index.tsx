"use client"

import { useEffect, useRef } from "react"

import styles from "./newsletter-form.module.scss"

export default function NewsletterForm() {
  const scriptContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scriptContainerRef.current && !scriptContainerRef.current.querySelector("script")) {
      const script = document.createElement("script")
      script.src = "https://cdn.jsdelivr.net/ghost/signup-form@~0.3/umd/signup-form.min.js"
      script.setAttribute("data-button-color", "#04A8FF")
      script.setAttribute("data-button-text-color", "#FFFFFF")
      script.setAttribute("data-site", "https://ghost.ctrlz.club/")
      script.setAttribute("data-locale", "en")
      script.async = true
      scriptContainerRef.current.appendChild(script)
    }
  }, [])

  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.heading}>Subscribe to the CTRL Z Newsletter</h2>
        <p className="mb-0">
          A bitesize weekly <a href="/newsletter/">newsletter</a> with the
          latest tunes and updates from CTRL Z
        </p>
      </div>
      <div
        ref={scriptContainerRef}
        style={{
          minHeight: "58px",
          maxWidth: "440px",
          margin: "1rem auto 0",
          width: "100%",
        }}
      />
    </div>
  )
}

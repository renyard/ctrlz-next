import styles from "./newsletter-form.module.scss"

export default function NewsletterForm() {
  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.heading}>Subscribe to the CTRL Z Newsletter</h2>
        <p className="mb-0">
          A bitesize weekly <a href="/newsletter/">newsletter</a> with the
          latest tunes and updates from CTRL Z
        </p>
      </div>
      <div>
        <iframe
          className={styles.iframe}
          src="https://embeds.beehiiv.com/eb5545ec-8b05-407e-8c5c-e69ac2e5254c?slim=true"
          data-test-id="beehiiv-embed"
          frameBorder="0"
          scrolling="no"
          title="CTRL Z Newsletter Signup"
          style={{
            backgroundColor: "transparent",
            width: "300px",
            height: "52px",
          }}
        ></iframe>
      </div>
    </div>
  )
}

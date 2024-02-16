import styles from "./newsletter-form.module.scss";

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
          src="https://embeds.beehiiv.com/9505af10-3840-4257-b5ed-9fd03f5ef1ad?slim=true"
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
  );
}

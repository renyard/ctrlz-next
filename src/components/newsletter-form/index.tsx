export default function NewsletterForm() {
  return (
    <div className="flex flex-wrap space-y-4 sm:space-y-0 py-4 items-center bg-white">
      <div className="basis-full sm:flex-1 mx-4 font-bebas-neue">
        <h2 className="uppercase font-black">
          Subscribe to the CTRL Z Newsletter
        </h2>
        <p className="mb-0">
          A bitesize weekly <a href="/newsletter/">newsletter</a> with the
          latest tunes and updates from CTRL Z
        </p>
      </div>
      <div className="mx-4 mb-0">
        <iframe
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

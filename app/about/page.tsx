import styles from './about.module.css';

export const metadata = {
  title: 'About Us | BACKBAR',
  description: 'Learn about BACKBAR, our mission to democratize spirits education, and the company behind the platform.',
};

export default function AboutPage() {
  return (
    <div className={styles.pageContainer}>
      
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>About Us</h1>
          <p className={styles.heroSubtitle}>
            BACKBAR is a digital magazine dedicated to spirits education — bringing you 
            the history, craft, and culture behind the world's most celebrated distilled 
            beverages. No memberships. No paywalls. Just quality knowledge, freely accessible.
          </p>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className={styles.missionSection}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>Our Mission</h2>
          <p className={styles.missionText}>
            Great spirits education shouldn't be locked behind expensive certifications or 
            scattered across countless sources that demand your email before offering a single 
            insight. BACKBAR exists to <span className={styles.highlight}>democratize beverage 
            knowledge</span> — presenting complex topics with clarity and depth for hospitality 
            professionals and enthusiasts alike. From the volcanic soils that shape mezcal to the 
            oak barrels that define Scotch whisky, we bring you the stories behind the spirits — no 
            strings attached.
          </p>
        </div>
      </section>

      {/* About Informative Media Section */}
      <section className={styles.companySection}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>About Informative Media</h2>
          <p className={styles.sectionText}>
            BACKBAR is part of Informative Media, a hospitality education company operating a 
            portfolio of digital platforms dedicated to beverage knowledge and service excellence. 
            From wine and spirits to fine dining standards, our platforms serve professionals and 
            enthusiasts who believe that quality education should be accessible to everyone. 
            We combine over two decades of luxury hospitality experience with modern technology 
            to create content that makes a real impact.
          </p>
          <a 
            href="https://informativemedia.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.companyLink}
          >
            Learn more about Informative Media →
          </a>
        </div>
      </section>

      {/* Let's Collaborate Section */}
      <section className={styles.collaborateSection}>
        <div className={styles.collaborateContent}>
          <h2 className={styles.collaborateTitle}>Let&#39;s Collaborate</h2>
          <p className={styles.collaborateText}>
            Whether you're a spirits brand looking to tell your story, a hospitality group 
            seeking to elevate your team's beverage knowledge, or an organization that wants 
            to put quality content in front of an engaged audience — we'd love to hear from you.
          </p>
          <a href="mailto:derekengles@gmail.com" className={styles.contactLink}>
            Get in Touch
          </a>
        </div>
      </section>

    </div>
  );
}
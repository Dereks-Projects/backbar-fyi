import Link from 'next/link';
import styles from './about.module.css';

export const metadata = {
  title: 'About Us | BACKBAR',
  description: 'Learn about BACKBAR, our mission to democratize spirits education, and the creator behind the platform.',
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
            the history, craft, and culture behind the world's most celebrated distilled beverages. 
            No memberships. No paywalls. Just quality knowledge, freely accessible.
          </p>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className={styles.missionSection}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>Our Mission</h2>
          <p className={styles.missionText}>
            The spirits industry is rich with <span className={styles.highlight}>remarkable stories</span> — 
            tales of craft distillers perfecting recipes across generations, of regions that have shaped 
            entire categories of spirits, of the bartenders and visionaries who transformed how the world 
            drinks. Yet too often, this knowledge remains locked behind expensive certifications, 
            industry gatekeepers, or scattered across countless sources that demand your email before 
            offering a single insight.
          </p>
          <p className={styles.missionText}>
            We believe that <span className={styles.highlight}>great beverage education should be accessible to everyone</span>. 
            Whether you're a hospitality professional looking to deepen your expertise, an enthusiast 
            eager to understand what makes a bourbon different from a rye, or simply someone who wants 
            to appreciate the craftsmanship in their glass — you deserve access to quality content 
            without the friction of sign-up forms, membership tiers, or content drip campaigns.
          </p>
          <p className={styles.missionText}>
            BACKBAR exists to <span className={styles.highlight}>democratize spirits knowledge</span>. We 
            curate and create educational content that respects your time and intelligence, presenting 
            complex topics with clarity and depth. From the volcanic soils that shape mezcal to the 
            oak barrels that define Scotch whisky, we bring you the stories behind the spirits — 
            no strings attached.
          </p>
        </div>
      </section>

      {/* About the Creator Section */}
      <section className={styles.creatorSection}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>About the Creator</h2>
          <p className={styles.sectionText}>
            BACKBAR was created by Derek Engles, a hospitality professional with over two decades of 
            experience in luxury beverage service. After years working as a sommelier and wine director 
            at properties including Wynn Resort and MGM Grand, Derek transitioned into technology 
            development — combining deep industry knowledge with a modern tech stack to build educational 
            platforms that make a real impact in the hospitality space.
          </p>
        </div>
      </section>

      {/* Let's Collaborate Section */}
      <section className={styles.collaborateSection}>
        <div className={styles.collaborateContent}>
          <h2 className={styles.collaborateTitle}>Let's Collaborate</h2>
          <p className={styles.collaborateText}>
            Whether you're a spirits brand looking to tell your story, a hospitality group seeking to 
            elevate your team's beverage knowledge, or an organization that wants to put quality content 
            in front of an engaged audience — we'd love to hear from you. We partner with brands and 
            businesses to create educational content that brings your team up to speed and places your 
            brand front and center with consumers who care about craft and quality.
          </p>
          <a href="mailto:derekengles@gmail.com" className={styles.contactLink}>
            Get in Touch
          </a>
        </div>
      </section>

    </div>
  );
}
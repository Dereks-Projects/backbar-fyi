
import Link from 'next/link';
import styles from '../legal-pages.module.css';

export const metadata = {
  title: 'Content Disclaimer | BACKBAR',
  description: 'Content Disclaimer for BACKBAR - important information about our educational content and responsible consumption.',
};

export default function ContentDisclaimer() {
  return (
    <div className={styles.pageContainer}>
      
      <div className={styles.contentWrapper}>
        <section className={styles.section}>
          <h1 className={styles.title}>Content Disclaimer</h1>
          <p className={styles.lastUpdated}>Last Updated: December 2, 2025</p>
          
          <div className={styles.content}>
            <p>
              Please read this Content Disclaimer carefully before using BACKBAR. This disclaimer applies to all 
              articles, guides, and educational materials published on our website.
            </p>

            <h2>Educational Purpose Only</h2>
            <p>
              All content on BACKBAR is provided for educational and informational purposes only. Our articles, 
              guides, and reference materials are designed to enhance knowledge and appreciation of spirits, 
              cocktails, and the beverage industry. This content is not intended to serve as:
            </p>
            <ul>
              <li>Professional bartending or mixology certification</li>
              <li>Legal advice regarding alcohol service or licensing</li>
              <li>Medical or health advice</li>
              <li>A substitute for formal hospitality training programs</li>
              <li>Official certification from any regulatory body</li>
            </ul>

            <h2>Age Requirement</h2>
            <p>
              BACKBAR contains content related to alcoholic beverages. This website is intended for adults of 
              legal drinking age only. In the United States, you must be at least 21 years of age to access 
              this content. By using this website, you confirm that you meet the legal drinking age requirement 
              in your jurisdiction.
            </p>

            <h2>Responsible Consumption</h2>
            <p>
              BACKBAR is committed to promoting responsible and moderate consumption of alcoholic beverages. 
              Our content is intended to educate readers about the history, production, and appreciation of 
              spirits — not to encourage excessive or irresponsible drinking.
            </p>
            <p>
              We strongly encourage all readers to:
            </p>
            <ul>
              <li>Drink responsibly and in moderation</li>
              <li>Never drink and drive</li>
              <li>Be aware of alcohol's effects on the body</li>
              <li>Respect local laws and regulations regarding alcohol</li>
              <li>Seek help if you or someone you know struggles with alcohol</li>
            </ul>

            <h2>Health Considerations</h2>
            <p>
              Alcohol affects individuals differently based on factors including body weight, metabolism, 
              medications, and overall health. The content on BACKBAR does not constitute medical advice. 
              If you have health concerns related to alcohol consumption, please consult a qualified healthcare 
              professional.
            </p>
            <p>
              Certain individuals should avoid alcohol entirely, including:
            </p>
            <ul>
              <li>Pregnant women or those trying to become pregnant</li>
              <li>Individuals taking medications that interact with alcohol</li>
              <li>People with certain medical conditions</li>
              <li>Those with a history of alcohol dependency</li>
              <li>Anyone under the legal drinking age</li>
            </ul>

            <h2>Accuracy of Information</h2>
            <p>
              While we strive to provide accurate, well-researched content, BACKBAR makes no warranties or 
              representations regarding the completeness, accuracy, reliability, or suitability of the 
              information presented. The spirits industry evolves continuously, and information about specific 
              products, producers, regulations, and practices may change over time.
            </p>
            <p>
              Readers should verify critical information independently, particularly regarding:
            </p>
            <ul>
              <li>Legal requirements for alcohol service in their jurisdiction</li>
              <li>Specific product availability and specifications</li>
              <li>Certification and licensing requirements</li>
              <li>Health and safety guidelines</li>
            </ul>

            <h2>Product Mentions and Brand References</h2>
            <p>
              BACKBAR may reference specific spirits brands, products, and producers for educational purposes. 
              Unless explicitly stated otherwise:
            </p>
            <ul>
              <li>Product mentions do not constitute endorsements</li>
              <li>We do not receive compensation for mentioning specific brands</li>
              <li>Brand names and trademarks belong to their respective owners</li>
              <li>Product availability, pricing, and specifications vary by region and time</li>
            </ul>
            <p>
              Any sponsored content or paid partnerships will be clearly disclosed as such.
            </p>

            <h2>Regional Variations</h2>
            <p>
              Laws and regulations regarding alcohol production, sale, service, and consumption vary significantly 
              by country, state, and locality. Content on BACKBAR is written primarily from a United States 
              perspective and may not reflect the legal requirements or cultural practices of other regions.
            </p>
            <p>
              Readers are responsible for understanding and complying with the laws applicable in their own 
              jurisdiction.
            </p>

            <h2>Professional Certification</h2>
            <p>
              Reading BACKBAR content does not qualify readers for any professional certification, license, 
              or credential. If you are pursuing a career in the hospitality industry, we encourage you to 
              seek formal training and certification through recognized programs and institutions.
            </p>

            <h2>User Responsibility</h2>
            <p>
              By using BACKBAR, you acknowledge that:
            </p>
            <ul>
              <li>You are of legal drinking age in your jurisdiction</li>
              <li>You will use the information responsibly</li>
              <li>You understand the risks associated with alcohol consumption</li>
              <li>You will not hold BACKBAR liable for your personal choices or actions</li>
              <li>You will comply with all applicable laws and regulations</li>
            </ul>

            <h2>Limitation of Liability</h2>
            <p>
              BACKBAR, its owners, authors, and contributors shall not be held liable for any damages, injuries, 
              or losses arising from the use of information presented on this website. This includes, but is not 
              limited to, damages resulting from reliance on content accuracy, alcohol consumption decisions, 
              or professional career choices.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have questions about this Content Disclaimer or concerns about any content on our website, 
              please contact us through the information provided on our <Link href="/about">About page</Link>.
            </p>

            <div className={styles.navigationLinks}>
              <Link href="/about" className={styles.navLink}>About</Link>
              <Link href="/" className={styles.navLink}>Home</Link>
            </div>
          </div>
        </section>
      </div>
      
    </div>
  );
}
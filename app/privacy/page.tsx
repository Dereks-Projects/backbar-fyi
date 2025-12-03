
import Link from 'next/link';
import styles from '../legal-pages.module.css';

export const metadata = {
  title: 'Privacy Policy | BACKBAR',
  description: 'Privacy Policy for BACKBAR - learn how we collect, use, and protect your information.',
};

export default function PrivacyPolicy() {
  return (
    <div className={styles.pageContainer}>
      
      <div className={styles.contentWrapper}>
        <section className={styles.section}>
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={styles.lastUpdated}>Last Updated: December 2, 2025</p>
          
          <div className={styles.content}>
            <p>
              At BACKBAR, we respect your privacy and are committed to protecting your personal information. 
              This Privacy Policy explains how we collect, use, and safeguard information when you visit our website.
            </p>

            <h2>Information We Collect</h2>
            <p>
              We collect information that you voluntarily provide to us when you subscribe to our newsletter 
              or engage with our educational content. This may include:
            </p>
            <ul>
              <li>Name and email address</li>
              <li>Professional information related to the hospitality industry</li>
              <li>Communication preferences</li>
            </ul>

            <h3>Automatically Collected Information</h3>
            <p>
              When you visit our website, we automatically collect certain information about your device and 
              browsing activity through cookies and similar technologies. This includes:
            </p>
            <ul>
              <li>IP address and browser type</li>
              <li>Pages visited and time spent on pages</li>
              <li>Referring website addresses</li>
              <li>Device and operating system information</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our educational content and services</li>
              <li>Send you updates, newsletters, and educational content</li>
              <li>Respond to your inquiries and provide support</li>
              <li>Analyze website usage to enhance user experience</li>
              <li>Comply with legal obligations and protect our rights</li>
            </ul>

            <h2>Analytics and Tracking</h2>
            <p>
              We use Google Analytics to understand how visitors interact with our website. Google Analytics 
              collects information anonymously and reports website trends without identifying individual visitors. 
              You can opt out of Google Analytics by installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a>.
            </p>

            <h2>Data Sharing and Disclosure</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We do not engage in 
              data harvesting or share your information with data brokers. We may share your information only in 
              the following limited circumstances:
            </p>
            <ul>
              <li><strong>Service Providers:</strong> With trusted third-party service providers who assist in operating our website and delivering our services, under strict confidentiality agreements</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights, property, or safety</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets, where user information may be transferred as part of the transaction</li>
            </ul>

            <h2>Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information 
              against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission 
              over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.
            </p>

            <h2>Your Rights and Choices</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access and review the personal information we hold about you</li>
              <li>Request correction of inaccurate or incomplete information</li>
              <li>Request deletion of your personal information, subject to certain exceptions</li>
              <li>Opt out of marketing communications at any time</li>
              <li>Disable cookies through your browser settings</li>
            </ul>

            <h2>Children's Privacy</h2>
            <p>
              Our website contains content related to alcoholic beverages and is not intended for individuals 
              under the age of 21. We do not knowingly collect personal information from minors. If you believe 
              we have inadvertently collected information from a minor, please contact us immediately.
            </p>

            <h2>International Users</h2>
            <p>
              Our website is operated in the United States. If you are accessing our website from outside the 
              United States, please be aware that your information may be transferred to, stored, and processed 
              in the United States where our servers are located and our central database is operated.
            </p>

            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or for 
              other operational, legal, or regulatory reasons. We will notify you of any material changes by 
              posting the updated policy on this page and updating the "Last Updated" date.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have questions or concerns about this Privacy Policy or our privacy practices, please 
              contact us through the information provided on our <Link href="/about">About page</Link>.
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
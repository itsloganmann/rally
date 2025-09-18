import Link from 'next/link'

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen relative">
      {/* Background orbs */}
      <div className="bg-orbs">
        <div className="orb-conic"></div>
        <div className="orb-radial"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 p-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-start to-accent-end rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <span className="text-xl font-bold text-white">Rally</span>
          </Link>
          
          <Link 
            href="/"
            className="text-white/80 hover:text-white transition-colors"
          >
            ← Back to Waitlist
          </Link>
        </div>
      </nav>

      {/* Main content */}
      <div className="relative z-10 px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-2xl p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
              Privacy Policy
            </h1>
            <p className="text-white/70 text-center mb-8">
              Effective Date: January 1, 2025
            </p>

            <div className="prose prose-invert max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
                <p className="text-white/80 mb-4">
                  Rally (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">2. Information We Collect</h2>
                
                <h3 className="text-xl font-medium text-white mb-3">2.1 Information You Provide</h3>
                <p className="text-white/80 mb-4">
                  When you join our waitlist or use our services, we may collect:
                </p>
                <ul className="text-white/80 mb-4 list-disc pl-6">
                  <li>Email address</li>
                  <li>Role information (student or brand)</li>
                  <li>Educational institution</li>
                  <li>Club and organization affiliations</li>
                  <li>Social media platform information</li>
                  <li>Follower counts</li>
                  <li>Interests and preferences</li>
                  <li>Company information (for brands)</li>
                  <li>Industry and campaign details</li>
                </ul>

                <h3 className="text-xl font-medium text-white mb-3">2.2 Automatically Collected Information</h3>
                <p className="text-white/80 mb-4">
                  We may automatically collect certain information about your device and usage:
                </p>
                <ul className="text-white/80 mb-4 list-disc pl-6">
                  <li>IP address</li>
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Referring website</li>
                  <li>Pages viewed and time spent</li>
                  <li>Device identifiers</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
                <p className="text-white/80 mb-4">We use your information to:</p>
                <ul className="text-white/80 mb-4 list-disc pl-6">
                  <li>Provide and maintain our services</li>
                  <li>Process your waitlist registration</li>
                  <li>Match students with relevant brand campaigns</li>
                  <li>Communicate with you about our services</li>
                  <li>Send you updates and promotional materials</li>
                  <li>Improve our platform and user experience</li>
                  <li>Comply with legal obligations</li>
                  <li>Protect against fraud and abuse</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">4. Information Sharing and Disclosure</h2>
                <p className="text-white/80 mb-4">
                  We may share your information in the following circumstances:
                </p>
                
                <h3 className="text-xl font-medium text-white mb-3">4.1 With Your Consent</h3>
                <p className="text-white/80 mb-4">
                  We will share your information when you explicitly consent to such sharing.
                </p>

                <h3 className="text-xl font-medium text-white mb-3">4.2 Service Providers</h3>
                <p className="text-white/80 mb-4">
                  We may share information with third-party service providers who assist us in operating our platform, including email services, analytics providers, and hosting services.
                </p>

                <h3 className="text-xl font-medium text-white mb-3">4.3 Legal Requirements</h3>
                <p className="text-white/80 mb-4">
                  We may disclose information if required by law or to protect our rights, safety, or property.
                </p>

                <h3 className="text-xl font-medium text-white mb-3">4.4 Business Transfers</h3>
                <p className="text-white/80 mb-4">
                  In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">5. Data Security</h2>
                <p className="text-white/80 mb-4">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">6. Data Retention</h2>
                <p className="text-white/80 mb-4">
                  We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">7. Your Rights</h2>
                <p className="text-white/80 mb-4">
                  Depending on your location, you may have the following rights regarding your personal information:
                </p>
                <ul className="text-white/80 mb-4 list-disc pl-6">
                  <li>Right to access your personal information</li>
                  <li>Right to correct inaccurate information</li>
                  <li>Right to delete your personal information</li>
                  <li>Right to restrict processing</li>
                  <li>Right to data portability</li>
                  <li>Right to object to processing</li>
                  <li>Right to withdraw consent</li>
                </ul>
                <p className="text-white/80 mb-4">
                  To exercise these rights, please contact us at rallyfounders@gmail.com.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">8. Cookies and Tracking Technologies</h2>
                <p className="text-white/80 mb-4">
                  We use cookies and similar tracking technologies to enhance your experience on our website. You can control cookies through your browser settings, but disabling cookies may affect the functionality of our services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">9. Third-Party Links</h2>
                <p className="text-white/80 mb-4">
                  Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites and encourage you to review their privacy policies.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">10. Children&apos;s Privacy</h2>
                <p className="text-white/80 mb-4">
                  Our services are intended for users who are at least 18 years old or have reached the age of majority in their jurisdiction. We do not knowingly collect personal information from children under 13 years of age.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">11. International Data Transfers</h2>
                <p className="text-white/80 mb-4">
                  Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place for such transfers in accordance with applicable data protection laws.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">12. Changes to This Privacy Policy</h2>
                <p className="text-white/80 mb-4">
                  We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the updated policy on our website and updating the effective date. Your continued use of our services after such changes constitutes acceptance of the updated policy.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">13. Contact Information</h2>
                <p className="text-white/80 mb-4">
                  If you have any questions about this Privacy Policy or our privacy practices, please contact us at rallyfounders@gmail.com.
                </p>
              </section>

              <div className="text-center mt-12 pt-8 border-t border-white/10">
                <p className="text-white/60 text-sm">
                  Last updated: January 1, 2025
                </p>
                <Link 
                  href="/"
                  className="btn-primary mt-4 inline-block px-8 py-3"
                >
                  Return to Waitlist
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-4 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-white/60 text-sm">
            © 2025 Rally. Building the future of campus marketing.
          </p>
        </div>
      </footer>
    </main>
  )
}

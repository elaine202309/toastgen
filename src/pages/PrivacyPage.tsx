import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold font-heading text-charcoal mb-8">Privacy Policy</h1>

        <div className="prose prose-lg max-w-none text-charcoal-light space-y-6">
          <p className="text-sm text-charcoal-light/60">Last updated: May 2026</p>

          <h2 className="text-xl font-bold font-heading text-charcoal mt-8">1. Information We Collect</h2>
          <p>
            When you use ToastGen, we collect the information you voluntarily provide to generate your wedding speech, including names, stories, and relationship details. We also collect your email address if you choose to receive your speech via email.
          </p>

          <h2 className="text-xl font-bold font-heading text-charcoal mt-8">2. How We Use Your Information</h2>
          <p>
            The stories and details you share are used solely to generate your personalized wedding speech. We do not sell, share, or use your personal stories for any other purpose. Your speech content is processed through our AI provider solely for the purpose of generation.
          </p>

          <h2 className="text-xl font-bold font-heading text-charcoal mt-8">3. Data Storage</h2>
          <p>
            Generated speeches and input data are stored temporarily to allow you to edit and download your speech. You can request deletion of your data at any time by contacting us. We do not retain your speech content longer than necessary to provide the service.
          </p>

          <h2 className="text-xl font-bold font-heading text-charcoal mt-8">4. Third-Party Services</h2>
          <p>
            We use third-party AI providers to generate speech content. These providers process your input data solely for the purpose of text generation and do not retain your data for training purposes. We use secure payment processors for any transactions and do not store your payment information.
          </p>

          <h2 className="text-xl font-bold font-heading text-charcoal mt-8">5. Cookies</h2>
          <p>
            We use minimal cookies necessary for the website to function properly. We do not use tracking cookies or third-party analytics that identify individual users.
          </p>

          <h2 className="text-xl font-bold font-heading text-charcoal mt-8">6. Your Rights</h2>
          <p>
            You have the right to access, correct, or delete any personal data we hold about you. You may also request a copy of your data or ask us to stop processing it. To exercise these rights, please contact us.
          </p>

          <h2 className="text-xl font-bold font-heading text-charcoal mt-8">7. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please reach out through our <a href="/contact" className="text-champagne hover:underline">Contact page</a>.
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
}

import Link from 'next/link';

export default function HelpPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 border-b pb-4">Help Center</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Frequenly Asked Question(FAQ)</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold">How do I change my password?</h3>
                <p>The password change feature is currently under development. Please contact your administrator for further information.</p>
              </div>
              <div>
                <h3 className="font-bold">How do I white an article?</h3>
                <p>If you have the role of author, you can access the dashboard through your profile menu to start writing.</p>
              </div>
               <div>
                <h3 className="font-bold">Who should I contact if I find a bug?</h3>
                <p>Please report bugs or technical issues via our <Link href="/contact" className="text-orange-600 hover:underline">Contact Us</Link> page.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Support</h2>
            <p>
                If you don't find the answer to your question here, please don't hesitate to contact our support team. Visit our <Link href="/contact" className="text-orange-600 hover:underline">Contact Us</Link> page for more information.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'Are your courses nationally recognised?',
    answer: 'Yes, all our courses are nationally recognised and accredited within the Australian Qualifications Framework (AQF). Optimum Academy is a Registered Training Organisation (RTO).',
  },
  {
    question: 'Do you offer flexible learning options?',
    answer: 'We provide a variety of learning modes, including on-campus, online, and blended learning to suit your schedule and lifestyle.',
  },
  {
    question: 'Is there a placement component for care courses?',
    answer: 'Most of our care and support courses include a mandatory practical placement component. This ensures you gain real-world experience and are job-ready upon graduation. We help facilitate these placements with our industry partners.',
  },
  {
    question: 'How do I enrol in a course?',
    answer: 'You can start by submitting an enquiry through our website. One of our student advisors will contact you to discuss your goals, check entry requirements, and guide you through the enrolment process.',
  },
];

export function FAQSection() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Everything you need to know about studying with Optimum Academy.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-2xl border shadow-sm p-6 sm:p-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className={index === faqs.length - 1 ? 'border-b-0' : ''}>
                <AccordionTrigger className="text-left font-semibold hover:no-underline hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Individual Support Graduate',
    content: 'Optimum Academy gave me the confidence and skills to start my career in aged care. The trainers were incredibly supportive and the practical training was exactly what I needed.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Disability Support Worker',
    content: 'I transitioned from a completely different industry. The flexible learning options at Optimum Academy allowed me to study while working. I had a job offer before I even finished my course!',
    rating: 5,
  },
  {
    name: 'Emma Thompson',
    role: 'Community Services Student',
    content: 'The facilities are top-notch and simulate real-world environments perfectly. I feel truly prepared for my placement and future career. Highly recommend to anyone looking to enter the care sector.',
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">What Our Students Say</h2>
          <p className="text-lg text-slate-600">
            Real stories from students who have transformed their careers with Optimum Academy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <Card key={i} className="border-none shadow-sm rounded-3xl overflow-hidden bg-white">
              <CardContent className="p-8">
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-slate-700 leading-relaxed mb-8 italic">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div>
                  <p className="font-bold text-slate-900">{testimonial.name}</p>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

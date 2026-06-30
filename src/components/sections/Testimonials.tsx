import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { getTestimonials } from '@/lib/api/cms';
import Image from 'next/image';

export async function Testimonials() {
  const testimonials = await getTestimonials();

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
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-none shadow-sm rounded-3xl overflow-hidden bg-white">
              <CardContent className="p-8">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-slate-700 leading-relaxed mb-8 italic">
                  &ldquo;{testimonial.testimonialFields.quoteContent}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  {testimonial.testimonialFields.avatar?.sourceUrl && (
                    <div className="relative h-12 w-12 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.testimonialFields.avatar.sourceUrl}
                        alt={testimonial.testimonialFields.studentName}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-slate-900">{testimonial.testimonialFields.studentName}</p>
                    <p className="text-sm text-slate-500">{testimonial.testimonialFields.courseGraduated}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

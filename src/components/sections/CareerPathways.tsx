import { getCareerPathways } from '@/lib/api/cms';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Briefcase } from 'lucide-react';

export async function CareerPathways() {
  const pathways = await getCareerPathways();

  if (pathways.length === 0) return null;

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Your Career Pathways</h2>
          <p className="text-lg text-slate-600">
            Explore the diverse professional opportunities available after graduating from Optimum Academy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pathways.map((pathway) => (
            <Card key={pathway.id} className="border-none shadow-sm rounded-3xl overflow-hidden bg-slate-50 transition-all hover:shadow-md">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-brand-purple-100 rounded-2xl flex items-center justify-center mb-6 text-primary">
                  {pathway.careerPathwayFields.icon?.sourceUrl ? (
                    <div className="relative w-8 h-8">
                      <Image
                        src={pathway.careerPathwayFields.icon.sourceUrl}
                        alt={pathway.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <Briefcase className="w-8 h-8" />
                  )}
                </div>
                <h3 className="text-xl font-bold mb-3">{pathway.title}</h3>
                <p className="text-slate-600 mb-6 text-sm line-clamp-3">
                  {pathway.careerPathwayFields.description}
                </p>
                {pathway.careerPathwayFields.salaryRange && (
                   <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider">
                      <span className="text-slate-400">Potential Salary</span>
                      <span className="text-primary">{pathway.careerPathwayFields.salaryRange}</span>
                   </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

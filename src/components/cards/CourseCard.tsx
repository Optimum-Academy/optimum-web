import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Users, Clock } from 'lucide-react';
import { Course } from '@/lib/types';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border transition-all hover:shadow-xl">
      <div className="aspect-[16/9] overflow-hidden relative">
        {course.featuredImage?.node.sourceUrl ? (
          <Image
            src={course.featuredImage.node.sourceUrl}
            alt={course.featuredImage.node.altText || course.title}
            fill
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-slate-100 flex items-center justify-center">
             <span className="text-slate-400">No Image</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="secondary" className="bg-brand-blue-50 text-brand-blue-700 hover:bg-brand-blue-100 border-none">
            {course.courseFields.level}
          </Badge>
        </div>
        <h3 className="font-heading text-xl font-bold leading-tight text-slate-900 group-hover:text-primary transition-colors">
          <Link href={`/courses/${course.slug}`}>
            <span className="absolute inset-0" />
            {course.title}
          </Link>
        </h3>

        <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
           <div className="flex items-center gap-1">
             <Clock className="h-4 w-4" />
             <span>{course.courseFields.duration}</span>
           </div>
           <div className="flex items-center gap-1">
             <Users className="h-4 w-4" />
             <span>{course.courseFields.deliveryMode}</span>
           </div>
        </div>

        <div className="mt-6 pt-6 border-t flex items-center justify-between">
          <span className="text-sm font-semibold text-primary inline-flex items-center gap-1">
            View Course <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </div>
  );
}

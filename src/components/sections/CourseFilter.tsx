'use client';

import { Course } from '@/lib/types';
import { CourseCard } from '@/components/cards/CourseCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CourseFilterProps {
  courses: Course[];
}

export function CourseFilter({ courses }: CourseFilterProps) {
  const domesticCourses = courses.filter(c => c.courseFields.audience !== 'International');
  const internationalCourses = courses.filter(c => c.courseFields.audience === 'International');
  const shortCourses = courses.filter(c => c.courseFields.level === 'Unit of Competency');

  return (
    <Tabs defaultValue="all" className="w-full">
      <div className="flex justify-center mb-12 max-w-full overflow-x-auto pb-4 scrollbar-hide">
        <TabsList className="bg-white border p-1 h-14 rounded-full shadow-sm whitespace-nowrap inline-flex">
          <TabsTrigger value="all" className="rounded-full px-6 sm:px-8 h-full data-active:bg-brand-purple-500 data-active:text-white">
            All Courses
          </TabsTrigger>
          <TabsTrigger value="short" className="rounded-full px-6 sm:px-8 h-full data-active:bg-brand-purple-500 data-active:text-white">
            Short Courses
          </TabsTrigger>
          <TabsTrigger value="domestic" className="rounded-full px-6 sm:px-8 h-full data-active:bg-brand-purple-500 data-active:text-white">
            Domestic Students
          </TabsTrigger>
          <TabsTrigger value="international" className="rounded-full px-6 sm:px-8 h-full data-active:bg-brand-purple-500 data-active:text-white">
            International (CRICOS)
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="all" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="domestic" className="mt-0">
        {domesticCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {domesticCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed">
            <p className="text-slate-500">No domestic courses available at the moment.</p>
          </div>
        )}
      </TabsContent>

      <TabsContent value="short" className="mt-0">
        {shortCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {shortCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed">
            <p className="text-slate-500">No short courses available at the moment.</p>
          </div>
        )}
      </TabsContent>

      <TabsContent value="international" className="mt-0">
        {internationalCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {internationalCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed">
            <p className="text-slate-500">No international courses available at the moment.</p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}

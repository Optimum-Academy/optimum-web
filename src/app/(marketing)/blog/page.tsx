import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getPosts } from '@/lib/api/cms';
import { Metadata } from 'next';
import { BlogCard } from '@/components/cards/BlogCard';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Stay updated with the latest news, career advice, and success stories from Optimum Academy.',
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="bg-slate-900 py-12 md:py-20 text-white relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight">
              Latest Insights
            </h1>
            <p className="mt-6 text-xl text-slate-300 max-w-2xl mx-auto">
              News, guides, and student stories from the heart of Australia’s care sector.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-20 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                {posts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 max-w-xl mx-auto">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">No Articles Published Yet</h2>
                <p className="text-slate-600">Check back soon for news, guides, and student stories from Optimum Training Academy.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

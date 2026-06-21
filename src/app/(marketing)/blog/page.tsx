import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getPosts } from '@/lib/api/cms';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Calendar, ArrowRight } from 'lucide-react';

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
        <section className="bg-slate-900 py-20 text-white relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight">
              Latest Insights
            </h1>
            <p className="mt-6 text-xl text-slate-300 max-w-2xl mx-auto">
              News, guides, and student stories from the heart of Australia’s care sector.
            </p>
          </div>
        </section>

        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {posts.map((post) => (
                <article key={post.id} className="group bg-white rounded-3xl border overflow-hidden transition-all hover:shadow-xl flex flex-col">
                  <div className="aspect-[16/10] overflow-hidden relative">
                    {post.featuredImage?.node.sourceUrl && (
                       <Image
                         src={post.featuredImage.node.sourceUrl}
                         alt={post.featuredImage.node.altText || post.title}
                         fill
                         className="object-cover transition-transform duration-500 group-hover:scale-105"
                       />
                    )}
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                       <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(post.date).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}
                       </span>
                       {post.categories?.nodes[0] && (
                         <Badge variant="outline" className="bg-brand-blue-50 text-brand-blue-600 border-none">
                           {post.categories.nodes[0].name}
                         </Badge>
                       )}
                    </div>
                    <h2 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="text-slate-600 mb-8 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto pt-6 border-t">
                       <Link href={`/blog/${post.slug}`} className="font-bold text-primary inline-flex items-center gap-2 group/link">
                          Read More <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                       </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

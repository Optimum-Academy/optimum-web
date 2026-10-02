import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getPostBySlug, getPosts } from '@/lib/api/cms';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Metadata } from 'next';
import { Calendar, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-white">
        <article className="py-12 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <Button variant="ghost" className="mb-8 p-0 hover:bg-transparent text-slate-500 hover:text-primary" asChild>
                 <Link href="/blog">
                    <ChevronLeft className="mr-2 h-4 w-4" /> Back to Blog
                 </Link>
              </Button>

              <div className="flex items-center gap-4 text-sm text-slate-500 mb-6 flex-wrap">
                 <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(post.date).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}
                 </span>
                 {post.categories?.nodes?.map((cat) => (
                    <span key={cat.slug} className="bg-brand-blue-50 text-brand-blue-600 px-3 py-1 rounded-full text-xs font-bold">
                       {cat.name}
                    </span>
                 ))}
              </div>

              <h1 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-6 md:mb-10 leading-[1.2]">
                {post.title}
              </h1>

              <div className="aspect-video relative rounded-3xl overflow-hidden mb-12 shadow-lg">
                 {post.featuredImage?.node.sourceUrl && (
                   <Image
                     src={post.featuredImage.node.sourceUrl}
                     alt={post.featuredImage.node.altText || post.title}
                     fill
                     className="object-cover"
                   />
                 )}
              </div>

              <div className="prose prose-lg prose-slate max-w-none">
                 {post.content ? (
                   <div dangerouslySetInnerHTML={{ __html: post.content }} />
                 ) : (
                   <p className="text-xl text-slate-600 leading-relaxed mb-8 italic">
                     {post.excerpt}
                   </p>
                 )}
              </div>

              <div className="mt-16 pt-10 border-t flex items-center gap-4">
                 <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 overflow-hidden relative flex-shrink-0">
                    <Image
                      src={post.author?.node?.avatar?.url || '/images/avatar-placeholder.svg'}
                      alt={post.author?.node?.name || 'Optimum Academy Team'}
                      fill
                      className="object-cover p-1"
                    />
                 </div>
                 <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Written by</p>
                    <p className="font-bold text-slate-900">{post.author?.node?.name || 'Optimum Academy Team'}</p>
                 </div>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}

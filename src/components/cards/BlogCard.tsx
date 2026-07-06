import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Post } from '@/lib/types';

interface BlogCardProps {
  post: Post;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group bg-white rounded-3xl border overflow-hidden transition-all hover:shadow-xl flex flex-col">
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
            {new Date(post.date).toLocaleDateString('en-AU', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </span>
          {post.categories?.nodes[0] && (
            <Badge
              variant="outline"
              className="bg-brand-blue-50 text-brand-blue-600 border-none"
            >
              {post.categories.nodes[0].name}
            </Badge>
          )}
        </div>
        <h2 className="text-xl md:text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>
        <p className="text-slate-600 mb-8 line-clamp-3">{post.excerpt}</p>
        <div className="mt-auto pt-6 border-t">
          <Link
            href={`/blog/${post.slug}`}
            className="font-bold text-primary inline-flex items-center gap-2 group/link"
          >
            Read More{' '}
            <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}

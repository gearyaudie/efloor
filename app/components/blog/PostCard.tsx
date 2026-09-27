import Image from "next/image";
import Link from "next/link";

export type PostCardData = {
  slug: string;
  title: string;
  excerpt?: string;
  img?: string;
  date?: string;
  minutes?: number;
};

export default function PostCard({ post }: { post: PostCardData }) {
  return (
    <Link
      href={`/blogs/${post.slug}`}
      className="group flex flex-col h-full rounded-[24px] bg-white shadow-e1 hover:shadow-e2 hover:-translate-y-[3px] transition-[box-shadow,translate] duration-300 overflow-hidden"
    >
      <div className="relative aspect-[16/10] bg-surface overflow-hidden">
        <Image
          src={post.img ?? "/img/blog-placeholder.png"}
          alt={post.title}
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-col flex-1 p-5 md:p-6">
        {(post.date || post.minutes) && (
          <span className="font-mono text-[12px] text-muted">
            {[post.date, post.minutes ? `${post.minutes} menit baca` : undefined].filter(Boolean).join(" · ")}
          </span>
        )}
        <h3 className="mt-2 text-[18px] font-semibold leading-snug tracking-[-0.01em] line-clamp-2 group-hover:text-brand-flame transition-colors">
          {post.title}
        </h3>
        {post.excerpt && <p className="mt-2 text-[14.5px] text-muted leading-relaxed line-clamp-3">{post.excerpt}</p>}
        <span className="mt-auto pt-4 text-[14px] font-semibold text-ink">Baca artikel →</span>
      </div>
    </Link>
  );
}

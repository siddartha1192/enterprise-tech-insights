import { ArrowRight } from "lucide-react";
import { BlogPost } from "@/data/posts";
import { useNavigate } from "react-router-dom";

interface FeaturedPostProps {
  post: BlogPost;
}

const FeaturedPost = ({ post }: FeaturedPostProps) => {
  const navigate = useNavigate();

  return (
    <article
      onClick={() => navigate(`/post/${post.id}`)}
      className="group cursor-pointer rounded-xl border border-border bg-card p-8 md:p-10 glow hover:border-primary/30 transition-all duration-300"
    >
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-medium text-primary uppercase tracking-widest">
            Featured
          </span>
          <span className="text-muted-foreground text-xs">·</span>
          <span className="text-xs text-muted-foreground">{post.date}</span>
          <span className="text-muted-foreground text-xs">·</span>
          <span className="text-xs text-muted-foreground">{post.readTime} read</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold leading-tight text-foreground group-hover:text-gradient transition-colors duration-300">
          {post.title}
        </h2>
        <p className="text-secondary-foreground text-lg leading-relaxed max-w-2xl">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-4 mt-2">
          <div className="flex gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-1.5 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
            Read article <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </article>
  );
};

export default FeaturedPost;

import { ArrowUpRight } from "lucide-react";
import { BlogPost } from "@/data/posts";
import { useNavigate } from "react-router-dom";

interface PostCardProps {
  post: BlogPost;
  index: number;
}

const PostCard = ({ post, index }: PostCardProps) => {
  const navigate = useNavigate();

  return (
    <article
      onClick={() => navigate(`/post/${post.id}`)}
      className="group cursor-pointer rounded-lg border border-border bg-card p-6 hover:border-primary/20 hover:bg-secondary/50 transition-all duration-300 animate-fade-in"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="flex flex-col gap-3 h-full">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readTime} read</span>
        </div>
        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
          {post.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between mt-2">
          <div className="flex gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-mono px-2 py-0.5 rounded bg-secondary text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
      </div>
    </article>
  );
};

export default PostCard;

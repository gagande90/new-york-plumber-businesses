
import { Link } from "react-router-dom";
import { CalendarIcon, ClockIcon } from "lucide-react";
import { BlogPost } from "@/types";
import { Badge } from "@/components/ui/badge";

interface BlogPostCardProps {
  post: BlogPost;
  featured?: boolean;
}

const BlogPostCard = ({ post, featured = false }: BlogPostCardProps) => {
  // Format date
  const formattedDate = new Date(post.date).toLocaleDateString("en-AU", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  
  return (
    <div className={`border rounded-lg overflow-hidden shadow-md transition-all hover:shadow-lg ${
      featured ? "md:flex" : ""
    }`}>
      <div className={`aspect-video bg-gray-200 ${featured ? "md:w-1/3" : ""}`}>
        {post.featuredImage ? (
          <img 
            src={post.featuredImage} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-primary-light opacity-30">
            <span className="sr-only">Blog Post Image Placeholder</span>
          </div>
        )}
      </div>
      
      <div className={`p-6 ${featured ? "md:w-2/3" : ""}`}>
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="outline" className="bg-blue-50 text-primary">
            {post.category}
          </Badge>
          <div className="flex items-center text-gray-500 text-sm">
            <CalendarIcon size={14} className="mr-1" />
            {formattedDate}
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <ClockIcon size={14} className="mr-1" />
            5 min read
          </div>
        </div>
        
        <h3 className={`font-bold ${featured ? "text-2xl" : "text-xl"} text-primary mb-3`}>
          <Link to={`/blog/${post.slug}`} className="hover:text-primary-light transition-colors">
            {post.title}
          </Link>
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-500">
            By {post.author}
          </div>
          <Link 
            to={`/blog/${post.slug}`}
            className="text-primary font-medium hover:text-primary-light transition-colors"
          >
            Read More →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;

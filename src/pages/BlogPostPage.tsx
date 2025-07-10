
import { useParams, Link } from "react-router-dom";
import { ChevronRight, Calendar, User, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import PageHero from "@/components/common/PageHero";
import BlogPostCard from "@/components/common/BlogPostCard";
import { getBlogPostBySlug, getBlogPosts } from "@/utils/blogLoader";
import MarkdownRenderer from "@/components/common/MarkdownRenderer";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : null;
  
  // Get related posts (same category, excluding current post)
  const relatedPosts = post 
    ? getBlogPosts()
        .filter(p => p.category === post.category && p.id !== post.id)
        .slice(0, 3)
    : [];

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
        <p className="mb-6">Sorry, we couldn't find the article you're looking for.</p>
        <Link to="/blog">
          <Button>Back to Blog</Button>
        </Link>
      </div>
    );
  }
  
  // Format date
  const formattedDate = new Date(post.date).toLocaleDateString("en-AU", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <div>
      <PageHero
        title={post.title}
        subtitle={post.excerpt}
      />
      
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight size={14} className="mx-1" />
          <Link to="/blog" className="hover:text-primary">Blog</Link>
          <ChevronRight size={14} className="mx-1" />
          <Link to={`/blog?category=${encodeURIComponent(post.category)}`} className="hover:text-primary">
            {post.category}
          </Link>
          <ChevronRight size={14} className="mx-1" />
          <span className="text-gray-800 font-medium">
            {post.title.length > 30 ? post.title.substring(0, 30) + "..." : post.title}
          </span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Featured Image */}
              <div className="aspect-video bg-gray-100">
                {post.featuredImage ? (
                  <img 
                    src={post.featuredImage} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary-light opacity-30"></div>
                )}
              </div>
              
              {/* Article Header */}
              <div className="p-8">
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <Badge variant="outline" className="bg-blue-50 text-primary">
                    {post.category}
                  </Badge>
                  <div className="flex items-center text-gray-500">
                    <Calendar size={14} className="mr-1" />
                    {formattedDate}
                  </div>
                  <div className="flex items-center text-gray-500">
                    <User size={14} className="mr-1" />
                    {post.author}
                  </div>
                </div>
                
                <h1 className="text-3xl font-bold text-primary mb-6">{post.title}</h1>
                
                {/* Article Content */}
                <MarkdownRenderer content={post.content} className="prose max-w-none text-gray-700" />
                
                {/* Tags */}
                <div className="mt-8 pt-6 border-t">
                  <div className="flex flex-wrap items-center gap-2">
                    <Tag size={16} className="text-gray-500" />
                    {post.tags.map(tag => (
                      <Badge 
                        key={tag} 
                        variant="outline" 
                        className="bg-gray-50"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div>
            {/* Author Card */}
            <Card className="mb-8">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                    <span className="font-medium text-gray-600">{post.author.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="font-medium">{post.author}</h3>
                    <p className="text-sm text-gray-500">Plumbing Expert</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Professional plumber with over 15 years of experience in residential and commercial plumbing across Melbourne.
                </p>
              </CardContent>
            </Card>
            
            {/* Categories */}
            <Card className="mb-8">
              <CardContent className="pt-6">
                <h3 className="font-medium mb-4">Categories</h3>
                <div className="space-y-2">
                  <Link 
                    to="/blog?category=DIY Plumbing" 
                    className="block p-2 rounded hover:bg-gray-100 transition-colors"
                  >
                    DIY Plumbing
                  </Link>
                  <Link 
                    to="/blog?category=Plumbing Tips" 
                    className="block p-2 rounded hover:bg-gray-100 transition-colors"
                  >
                    Plumbing Tips
                  </Link>
                  <Link 
                    to="/blog?category=Industry News" 
                    className="block p-2 rounded hover:bg-gray-100 transition-colors"
                  >
                    Industry News
                  </Link>
                  <Link 
                    to="/blog?category=How-To Guides" 
                    className="block p-2 rounded hover:bg-gray-100 transition-colors"
                  >
                    How-To Guides
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            {/* Call to Action */}
            <Card className="bg-primary text-white">
              <CardContent className="pt-6">
                <h3 className="font-medium mb-3">Need a Plumber?</h3>
                <p className="mb-4 text-sm">
                  Find trusted plumbing professionals in New York for all your plumbing needs.
                </p>
                <div className="space-y-2">
                  <Link to="/suburbs">
                    <Button 
                      variant="outline" 
                      className="w-full bg-white text-primary hover:bg-gray-100"
                    >
                      Find a Plumber
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button 
                      variant="secondary" 
                      className="w-full bg-white bg-opacity-10 text-white hover:bg-opacity-20"
                    >
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-primary mb-6">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map(post => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-10 text-center">
          <Link to="/blog">
            <Button variant="outline" size="lg">
              Back to All Articles
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;

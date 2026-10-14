import StaticSeoPostView from "@/components/StaticSeoPostView";
import NotFound from "@/pages/NotFound";
import type { BlogPost } from "@/data/seoBlogPosts";
import { useHiddenBlogSlugs } from "@/hooks/useHiddenBlogs";

/** Code-published post that shows the 404 page once it's deactivated in the admin panel. */
const GuardedSeoPost = ({ post }: { post: BlogPost }) => {
  const hidden = useHiddenBlogSlugs();
  if (hidden.has(post.slug)) return <NotFound />;
  return <StaticSeoPostView post={post} />;
};

export default GuardedSeoPost;

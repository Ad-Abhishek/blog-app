import { usePosts } from "@/hooks/usePosts";
import { PostForm } from "@/components/posts/PostForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";

const CreatePost = () => {
  const { createPost, isLoading } = usePosts();
  const navigate = useNavigate();

  const handleSubmit = async (values: { title: string; body: string }) => {
    await createPost(values);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        <PostForm
          title="Create New Post"
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default CreatePost;

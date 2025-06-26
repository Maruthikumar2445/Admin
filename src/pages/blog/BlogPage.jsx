import React, { useState } from "react";
import AddBlog from "./AddBlog";
import BlogsList from "./BlogsList";
import "../../App.css";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const handleAddBlog = (form) => {
    const newBlog = {
      id: Date.now(),
      imageUrl: form.image ? URL.createObjectURL(form.image) : "",
      category: form.category,
      title: form.title,
      excerpt: form.excerpt,
    };
    setBlogs([newBlog, ...blogs]);
  };
  const handleDeleteBlog = (id) => setBlogs(blogs.filter((b) => b.id !== id));
  const handleUpdateBlog = (id, updated) => {
    setBlogs(
      blogs.map((b) =>
        b.id === id
          ? {
              ...b,
              imageUrl: updated.image
                ? URL.createObjectURL(updated.image)
                : b.imageUrl,
              category: updated.category,
              title: updated.title,
              excerpt: updated.excerpt,
            }
          : b
      )
    );
  };

  return (
    <div className="section-page">
      <h2>Blogs Manager</h2>
      <AddBlog onAdd={handleAddBlog} />
      <BlogsList blogs={blogs} onDelete={handleDeleteBlog} onUpdate={handleUpdateBlog} />
    </div>
  );
};

export default BlogPage;
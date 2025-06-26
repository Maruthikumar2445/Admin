import React, { useState } from "react";

const UpdateBlog = ({ blog, onUpdate, onCancel }) => {
  const [form, setForm] = useState({
    image: null,
    category: blog.category,
    title: blog.title,
    excerpt: blog.excerpt,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(blog.id, form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" name="image" accept="image/*" onChange={handleChange} />
      <input type="text" name="category" value={form.category} onChange={handleChange} required />
      <input type="text" name="title" value={form.title} onChange={handleChange} required />
      <textarea name="excerpt" value={form.excerpt} onChange={handleChange} required />
      <button type="submit">Update</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default UpdateBlog;
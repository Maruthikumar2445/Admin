import React, { useState } from "react";

const AddBlog = ({ onAdd }) => {
  const [form, setForm] = useState({
    image: null,
    category: "",
    title: "",
    excerpt: "",
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
    onAdd(form);
    setForm({
      image: null,
      category: "",
      title: "",
      excerpt: "",
    });
    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" name="image" accept="image/*" onChange={handleChange} required />
      <input type="text" name="category" placeholder="Category" onChange={handleChange} required />
      <input type="text" name="title" placeholder="Title" onChange={handleChange} required />
      <textarea name="excerpt" placeholder="Excerpt" onChange={handleChange} required />
      <button type="submit">Add Blog</button>
    </form>
  );
};

export default AddBlog;
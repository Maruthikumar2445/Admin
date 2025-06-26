import React, { useState } from "react";
import UpdateBlog from "./UpdateBlog";

const BlogsList = ({ blogs, onDelete, onUpdate }) => {
  const [editingId, setEditingId] = useState(null);

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {blogs.map((blog) =>
        editingId === blog.id ? (
          <UpdateBlog
            key={blog.id}
            blog={blog}
            onUpdate={(id, updated) => {
              onUpdate(id, updated);
              setEditingId(null);
            }}
            onCancel={() => setEditingId(null)}
          />
        ) : (
          <li key={blog.id} style={{ border: "1px solid #ccc", margin: "1rem 0", padding: 10, position: "relative" }}>
            <img src={blog.imageUrl} alt={blog.title} style={{ width: 80, height: 80, objectFit: "cover" }} />
            <div>
              <strong>{blog.title}</strong> ({blog.category})<br />
              <p>{blog.excerpt}</p>
              <button onClick={() => setEditingId(blog.id)}>Edit</button>
              <button onClick={() => onDelete(blog.id)}>Delete</button>
            </div>
          </li>
        )
      )}
    </ul>
  );
};

export default BlogsList;
import React, { useState } from "react";

const AddTestimonial = ({ onAdd }) => {
  const [form, setForm] = useState({
    image: null,
    name: "",
    role: "",
    quote: "",
    rating: 5,
    location: "",
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
      name: "",
      role: "",
      quote: "",
      rating: 5,
      location: "",
    });
    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" name="image" accept="image/*" onChange={handleChange} required />
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
      <input type="text" name="role" placeholder="Role" onChange={handleChange} required />
      <textarea name="quote" placeholder="Quote" onChange={handleChange} required />
      <input type="number" name="rating" min="1" max="5" placeholder="Rating" onChange={handleChange} required />
      <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
      <button type="submit">Add Testimonial</button>
    </form>
  );
};

export default AddTestimonial;
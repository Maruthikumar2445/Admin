import React, { useState } from "react";

const UpdateTestimonial = ({ testimonial, onUpdate, onCancel }) => {
  const [form, setForm] = useState({
    image: null,
    name: testimonial.name,
    role: testimonial.role,
    quote: testimonial.quote,
    rating: testimonial.rating,
    location: testimonial.location,
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
    onUpdate(testimonial.id, form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" name="image" accept="image/*" onChange={handleChange} />
      <input type="text" name="name" value={form.name} onChange={handleChange} required />
      <input type="text" name="role" value={form.role} onChange={handleChange} required />
      <textarea name="quote" value={form.quote} onChange={handleChange} required />
      <input type="number" name="rating" min="1" max="5" value={form.rating} onChange={handleChange} required />
      <input type="text" name="location" value={form.location} onChange={handleChange} required />
      <button type="submit">Update</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default UpdateTestimonial;
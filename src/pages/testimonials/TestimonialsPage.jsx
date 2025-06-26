import React, { useState } from "react";
import AddTestimonial from "./AddTestimonial";
import TestimonialsList from "./TestimonialsList";
import "../../App.css";

const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const handleAddTestimonial = (form) => {
    const newTestimonial = {
      id: Date.now(),
      imageUrl: form.image ? URL.createObjectURL(form.image) : "",
      name: form.name,
      role: form.role,
      quote: form.quote,
      rating: form.rating,
      location: form.location,
    };
    setTestimonials([newTestimonial, ...testimonials]);
  };
  const handleDeleteTestimonial = (id) => setTestimonials(testimonials.filter((t) => t.id !== id));
  const handleUpdateTestimonial = (id, updated) => {
    setTestimonials(
      testimonials.map((t) =>
        t.id === id
          ? {
              ...t,
              imageUrl: updated.image
                ? URL.createObjectURL(updated.image)
                : t.imageUrl,
              name: updated.name,
              role: updated.role,
              quote: updated.quote,
              rating: updated.rating,
              location: updated.location,
            }
          : t
      )
    );
  };

  return (
    <div className="section-page">
      <h2>Testimonials Manager</h2>
      <AddTestimonial onAdd={handleAddTestimonial} />
      <TestimonialsList testimonials={testimonials} onDelete={handleDeleteTestimonial} onUpdate={handleUpdateTestimonial} />
    </div>
  );
};

export default TestimonialsPage;
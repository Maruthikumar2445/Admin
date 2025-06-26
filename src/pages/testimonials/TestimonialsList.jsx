import React, { useState } from "react";
import UpdateTestimonial from "./UpdateTestimonial";

const TestimonialsList = ({ testimonials, onDelete, onUpdate }) => {
  const [editingId, setEditingId] = useState(null);

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {testimonials.map((t) =>
        editingId === t.id ? (
          <UpdateTestimonial
            key={t.id}
            testimonial={t}
            onUpdate={(id, updated) => {
              onUpdate(id, updated);
              setEditingId(null);
            }}
            onCancel={() => setEditingId(null)}
          />
        ) : (
          <li key={t.id} style={{ border: "1px solid #ccc", margin: "1rem 0", padding: 10, position: "relative" }}>
            <img src={t.imageUrl} alt={t.name} style={{ width: 60, height: 60, borderRadius: "50%" }} />
            <div>
              <strong>{t.name}</strong> ({t.role}, {t.location})<br />
              <span>Rating: {t.rating}</span>
              <p>{t.quote}</p>
              <button onClick={() => setEditingId(t.id)}>Edit</button>
              <button onClick={() => onDelete(t.id)}>Delete</button>
            </div>
          </li>
        )
      )}
    </ul>
  );
};

export default TestimonialsList;
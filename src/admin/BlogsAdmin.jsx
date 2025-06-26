import React, { useState } from "react";
import "../AdminDashboard.css";
import "./BlogsAdmin.css";
import parisImg from "../assets/paris.png";
import londonImg from "../assets/london.png";

const initialBlogs = [
	{
		id: 1,
		image: parisImg,
		category: "Travel Guide",
		title: "Planning a Europe Trip from Madurai? Read This First",
		excerpt: "A step-by-step breakdown of what you need to know about planning your European adventure from South India...",
	},
	{
		id: 2,
		image: londonImg,
		category: "Visa Tips",
		title: "Visa Rejection? Here's How to Avoid the Common Mistakes",
		excerpt: "Real examples and solutions from past client experiences to help you secure your visa approval...",
	},
];

const BlogsAdmin = ({ onBack }) => {
	const [blogs, setBlogs] = useState(initialBlogs);
	const [showAddBlogOverlay, setShowAddBlogOverlay] = useState(false);
	const [blogForm, setBlogForm] = useState({ title: "", category: "", excerpt: "", image: null });
	const [blogImagePreview, setBlogImagePreview] = useState(null);
	const [editingBlog, setEditingBlog] = useState(null);
	const [editBlogForm, setEditBlogForm] = useState({
		title: "",
		category: "",
		excerpt: "",
		image: null,
		imagePreview: ""
	});

	// Image upload
	const handleBlogImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setBlogForm({ ...blogForm, image: file });
			setBlogImagePreview(URL.createObjectURL(file));
		}
	};

	// Add Blog
	const handleAddBlog = (e) => {
		e.preventDefault();
		if (!blogForm.title || !blogForm.category || !blogForm.excerpt || !blogForm.image) return;
		const newBlog = {
			id: Date.now(),
			title: blogForm.title,
			category: blogForm.category,
			excerpt: blogForm.excerpt,
			image: blogImagePreview,
		};
		setBlogs([newBlog, ...blogs]);
		setShowAddBlogOverlay(false);
		setBlogForm({ title: "", category: "", excerpt: "", image: null });
		setBlogImagePreview(null);
	};

	// Update Blog
	const handleUpdateBlog = (e) => {
		e.preventDefault();
		if (!editBlogForm.title || !editBlogForm.category || !editBlogForm.excerpt) return;
		const updatedBlog = {
			...editingBlog,
			title: editBlogForm.title,
			category: editBlogForm.category,
			excerpt: editBlogForm.excerpt,
			image: editBlogForm.imagePreview || editingBlog.image,
		};
		setBlogs(blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)));
		setEditingBlog(null);
		setEditBlogForm({ title: "", category: "", excerpt: "", image: null, imagePreview: "" });
	};

	// Delete Blog
	const handleDeleteBlog = (id) => setBlogs(blogs.filter((b) => b.id !== id));

	// Show More Blogs (for demonstration, simply logs to console)
	const handleShowMore = () => {
		console.log("Show more blogs...");
		// Implement actual logic to show more blogs, e.g., fetch from server or expand local list
	};

	return (
		<section className="blog py-5" style={{ minHeight: "100vh" }}>
			<div className="blog-pattern"></div>
			<div className="container">
				<div className="text-center mb-5">
					<h2 className="section-title">All Blog Posts</h2>
					<div className="title-underline mx-auto"></div>
				</div>
				<div className="admin-main-row">
					<div className="admin-header-actions">
						<button className="admin-back-btn" onClick={onBack}>
							Back to Dashboard
						</button>
						<button className="admin-action-btn" onClick={() => setShowAddBlogOverlay(true)}>+ Add Blog</button>
					</div>
					<div className="blog-grid">
						{blogs.map((post, idx) => (
							<div
								className="blog-card"
								key={post.id}
								style={{
									width: 370,
									margin: 0,
									opacity: 1,
									animationDelay: `${0.1 + (idx % 9) * 0.1}s`
								}}
							>
								<div className="blog-img-wrapper">
									<img src={post.image} alt={post.title} className="blog-img" />
									<div className="blog-overlay">
										<button className="read-more-btn">Read More</button>
									</div>
								</div>
								<div style={{ padding: "1.5rem 1.5rem 1.2rem 1.5rem" }}>
									<div className="blog-title">{post.title}</div>
									<div className="blog-excerpt">{post.excerpt}</div>
								</div>
								<div className="blog-actions">
									<button
										className="admin-update-btn"
										onClick={() => {
											setEditingBlog(post);
											setEditBlogForm({
												title: post.title,
												category: post.category,
												excerpt: post.excerpt,
												image: null,
												imagePreview: post.image
											});
										}}
									>
										Update
									</button>
									<button
										className="admin-delete-btn"
										onClick={() => handleDeleteBlog(post.id)}
									>
										Delete
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Add Blog Overlay */}
			{showAddBlogOverlay && (
				<div className="admin-overlay">
					<div className="admin-overlay-form">
						<div className="d-flex justify-content-between align-items-center mb-4">
							<button className="admin-back-btn" onClick={() => setShowAddBlogOverlay(false)}>
								← Cancel
							</button>
							<h2 className="admin-form-title">Add Blog</h2>
							<span style={{ minWidth: 180 }}></span>
						</div>
						<form onSubmit={handleAddBlog}>
							<div className="row g-4">
								<div className="col-md-6">
									<label className="form-label">Title</label>
									<input
										type="text"
										className="form-control"
										value={blogForm.title}
										onChange={e => setBlogForm({ ...blogForm, title: e.target.value })}
										required
									/>
								</div>
								<div className="col-md-6">
									<label className="form-label">Category</label>
									<input
										type="text"
										className="form-control"
										value={blogForm.category}
										onChange={e => setBlogForm({ ...blogForm, category: e.target.value })}
										required
									/>
								</div>
								<div className="col-md-12">
									<label className="form-label">Excerpt</label>
									<input
										type="text"
										className="form-control"
										value={blogForm.excerpt}
										onChange={e => setBlogForm({ ...blogForm, excerpt: e.target.value })}
										required
									/>
								</div>
								<div className="col-md-12">
									<label className="form-label">Image</label>
									<input
										type="file"
										accept="image/*"
										className="form-control"
										onChange={handleBlogImageChange}
										required
									/>
									{blogImagePreview && (
										<img
											src={blogImagePreview}
											alt="Preview"
											style={{
												width: "100%",
												marginTop: 10,
												borderRadius: 8,
												objectFit: "cover",
												height: 180,
												boxShadow: "0 4px 16px #eee"
											}}
										/>
									)}
								</div>
							</div>
							<div className="text-end mt-4">
								<button type="submit" className="admin-action-btn" style={{ minWidth: 180 }}>
									Add Blog
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			{/* Update Blog Overlay */}
			{editingBlog && (
				<div className="admin-overlay">
					<div className="admin-overlay-form">
						<div className="d-flex justify-content-between align-items-center mb-4">
							<button className="admin-back-btn" onClick={() => setEditingBlog(null)}>
								← Cancel
							</button>
							<h2 className="admin-form-title">Update Blog</h2>
							<span style={{ minWidth: 180 }}></span>
						</div>
						<form onSubmit={handleUpdateBlog}>
							<div className="row g-4">
								<div className="col-md-6">
									<label className="form-label">Title</label>
									<input
										type="text"
										className="form-control"
										value={editBlogForm.title}
										onChange={e => setEditBlogForm({ ...editBlogForm, title: e.target.value })}
										required
									/>
								</div>
								<div className="col-md-6">
									<label className="form-label">Category</label>
									<input
										type="text"
										className="form-control"
										value={editBlogForm.category}
										onChange={e => setEditBlogForm({ ...editBlogForm, category: e.target.value })}
										required
									/>
								</div>
								<div className="col-md-12">
									<label className="form-label">Excerpt</label>
									<input
										type="text"
										className="form-control"
										value={editBlogForm.excerpt}
										onChange={e => setEditBlogForm({ ...editBlogForm, excerpt: e.target.value })}
										required
									/>
								</div>
								<div className="col-md-12">
									<label className="form-label">Image</label>
									<input
										type="file"
										accept="image/*"
										className="form-control"
										onChange={e => {
											const file = e.target.files[0];
											setEditBlogForm({
												...editBlogForm,
												image: file,
												imagePreview: file ? URL.createObjectURL(file) : editBlogForm.imagePreview
											});
										}}
									/>
									{editBlogForm.imagePreview && (
										<img
											src={editBlogForm.imagePreview}
											alt="Preview"
											style={{
												width: "100%",
												marginTop: 10,
												borderRadius: 8,
												objectFit: "cover",
												height: 180,
												boxShadow: "0 4px 16px #eee"
											}}
										/>
									)}
								</div>
							</div>
							<div className="text-end mt-4">
								<button type="submit" className="admin-action-btn" style={{ minWidth: 180 }}>
									Update Blog
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</section>
	);
};

export default BlogsAdmin;
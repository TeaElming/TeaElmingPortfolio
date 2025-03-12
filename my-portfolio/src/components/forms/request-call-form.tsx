/** @format */

import React, { useState } from "react"
import emailjs from "emailjs-com"
import "./css/request-call-form.css"

interface FormData {
	name: string
	email: string
	phone: string
	date: string
	time: string
	message: string
}

const RequestCallForm: React.FC = () => {
	const [formData, setFormData] = useState<FormData>({
		name: "",
		email: "",
		phone: "",
		date: "",
		time: "",
		message: "",
	})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [responseMessage, setResponseMessage] = useState("")

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsSubmitting(true)

		const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID!
		const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID!
		const userId = import.meta.env.VITE_EMAILJS_USER_ID!

		emailjs
			.send(serviceId, templateId, { ...formData }, userId)
			.then(() => {
				setResponseMessage("Request sent successfully!")
				setIsSubmitting(false)
				setFormData({
					name: "",
					email: "",
					phone: "",
					date: "",
					time: "",
					message: "",
				})
			})
			.catch(() => {
				setResponseMessage("An error occurred. Please try again.")
				setIsSubmitting(false)
			})
	}

	return (
		<form onSubmit={handleSubmit} className="request-call-form">
			<h3>Request a Call</h3>
			<label>Name:</label>
			<input
				type="text"
				name="name"
				value={formData.name}
				onChange={handleChange}
				required
			/>

			<label>Email:</label>
			<input
				type="email"
				name="email"
				value={formData.email}
				onChange={handleChange}
				required
			/>

			<label>Phone:</label>
			<input
				type="tel"
				name="phone"
				value={formData.phone}
				onChange={handleChange}
				required
			/>

			<label>Preferred Date:</label>
			<input
				type="date"
				name="date"
				value={formData.date}
				onChange={handleChange}
				required
			/>

			<label>Preferred Time:</label>
			<input
				type="time"
				name="time"
				value={formData.time}
				onChange={handleChange}
				required
			/>

			<label>Message (optional):</label>
			<textarea
				name="message"
				value={formData.message}
				onChange={handleChange}
			/>

			<button type="submit" disabled={isSubmitting}>
				{isSubmitting ? "Sending..." : "Send Request"}
			</button>
			{responseMessage && <p className="response-message">{responseMessage}</p>}
		</form>
	)
}

export default RequestCallForm

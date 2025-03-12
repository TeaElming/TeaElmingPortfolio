/** @format */

import React from "react"
import "./css/project-card.css"

export interface ProjectData {
	title: string
	url: string
	technologies: string[]
	stack: string
	description: string[]
	imgs: string[]
	video: string
}

interface ProjectCardProps {
	project: ProjectData
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
	return (
		<div className="project-card">
			<h2 className="project-title">{project.title}</h2>
			<a
				className="project-link"
				href={project.url}
				target="_blank"
				rel="noopener noreferrer"
			>
				{project.url}
			</a>
			<div className="project-details">
				<span className="project-stack">Stack: {project.stack}</span>
				<div className="project-technologies">
					{project.technologies.map((tech, index) => (
						<span key={index} className="project-tech">
							{tech}
						</span>
					))}
				</div>
			</div>
			<div className="project-description">
				{project.description.map((desc, index) => (
					<p key={index}>{desc}</p>
				))}
			</div>
			{project.imgs && project.imgs.length > 0 && (
				<div className="project-images">
					{project.imgs.map((img, index) => (
						<img
							key={index}
							src={img}
							alt={`${project.title} screenshot ${index + 1}`}
						/>
					))}
				</div>
			)}
			{project.video && (
				<div className="project-video">
					<video controls src={project.video}></video>
				</div>
			)}
		</div>
	)
}

export default ProjectCard

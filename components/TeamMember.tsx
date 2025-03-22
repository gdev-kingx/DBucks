import { Linkedin, Github } from "lucide-react";

const TeamMember = ({
	image,
	name,
	role,
	linkedInUrl,
	githubUrl,
}: {
	image: string;
	name: string;
	role: string;
	linkedInUrl: string;
	githubUrl: string;
}) => {
	return (
		<div className="bg-purple-900/20 rounded-2xl p-6 backdrop-blur-sm">
			<img
				src={image}
				alt={name}
				className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
			/>
			<h3 className="text-xl font-semibold mb-1">{name}</h3>
			<p className="text-purple-400 mb-2">{role}</p>
            <div className="flex justify-center text-blue-700">
                <a href={linkedInUrl}><Linkedin className="w-6 h-6 mr-3" /></a>
                <a href={githubUrl}><Github className="w-6 h-6 mr-3" /></a>
            </div>
		</div>
	);
};

export default TeamMember;

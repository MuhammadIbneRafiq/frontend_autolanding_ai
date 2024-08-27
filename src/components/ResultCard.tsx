import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { SVGProps } from "react";
import { JSX } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";

interface ResultCardProps {
  id: number;
  name: string;
  tweet: string;
  profile: string;
}

export default function ResultCard(props: ResultCardProps) {
  const navigate = useNavigate();
  return (
    <Card className="bg-[#1a1a2e] text-white p-4 rounded-lg min-w-80 max-w-md">
      <button
        onClick={() => navigate(`/project/${props.id}`)}
        className="flex items-start"
      >
        <Avatar className="mr-4">
          <AvatarImage src={props.profile} alt="User Avatar" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">{props.name}</h3>
              <p className="text-sm text-muted-foreground">
                Posted {Math.floor(Math.random() * 5 + 1)} hours ago
              </p>
            </div>
            <HeartIcon className="text-blue-500 w-6 h-6" />
          </div>
          <p className="mt-2 text-sm break-words whitespace-normal overflow-hidden">
            {props.tweet}
          </p>
        </div>
      </button>
    </Card>
  );
}

function HeartIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

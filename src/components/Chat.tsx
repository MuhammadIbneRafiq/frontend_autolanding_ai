import { Avatar, AvatarImage } from "./ui/avatar";
import { useEffect, useRef } from "react";

import { Loader } from "lucide-react";
import { Logo } from "./Logo";
import { ProjectStatus } from "@/types/Project";
import { ScrollShadow } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useChat } from "@/hooks/useChat";
import { useLocation } from "react-router-dom";
import { useProject } from "@/hooks/useProject";
import user1 from "../assets/francesco from Konnecte.png";
import user2 from "../assets/user5.jpg";
import user3 from "../assets/JAMIL.jpg";
import user4 from "../assets/user6.jpg";
import user7 from "../assets/alshahabRezvi.jpg";

interface ChatProps {
  loading: boolean;
}

interface CardProps {
  title: string;
  description: string;
  image: string;
}

export default function Chat({ loading }: ChatProps) {
  const path = useLocation();

  const chat = useChat({ id: path?.pathname.split("/")[2] });
  const { project } = useProject({ id: path?.pathname.split("/")[2] });

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      // Scroll to the bottom
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chat.chatHistory]); // Trigger whenever chat history changes

  const truncateDescription = (description: String) => {
    const words = description.split(" ");
    if (words.length > 6) {
      return words.slice(0, 10).join(" ") + "...";
    } else {
      return description;
    }
  };
  // Card to display the niche of freelancers profiles
  const Card: React.FC<CardProps> = ({ title, description, image }) => (
    <div className="card bg-dark m-1 rounded pt-2 px-2">
      <div className="image">
        <img src={image} alt="" className=" mb-3" />
      </div>
      <h3 className="mt-3">{title}</h3>
      <p className=" mt-2">{truncateDescription(description)}</p>
    </div>
  );
  const freelancers = [
    {
      title: "Francesco from Konnecte",
      description:
        "Italian AI agency helping law consultant and firms to 10x their business",
      image: user1,
    },
    {
      title: "Charlie",
      description:
        "AI hacker and musician exploring the frontiers of technology and ...",
      image: user2,
    },
    {
      title: "Jamil",
      description:
        "SEO silver plate youtuber with 10+ ecommerce clients.",
      image: user3,
    },
    {
      title: "Stavan",
      description:
        "Creative graphic designer with a passion for minimalist design and typography.",
      image: user4,
    },
    {
      title: "Alshahab Rezvi",
      description:
        "MERN Stack, Automation And AI Expert Over 3 Year Plus Experience",
      image: user7,
    },
    {
      title: "Luna ",
      description:
        "Innovative UI/UX designer committed to creating intuitive and visually appealing interfaces.",
      image: user3,
    },
    {
      title: "Oliver ",
      description:
        "Detail-oriented frontend developer with expertise in responsive web design and performance optimization.",
      image: user4,
    },
  ];

  const keyWords = [
    "Innovative graphic designer",
    "Creative web developer",
    "Experienced UI/UX designer",
    "Passionate digital marketer",
    "Skilled software engineer",
    "Talented photographer and videographer",
  ];
  return (
    <div className="flex flex-col h-[80vh] w-full gap-2 py-4">
      <ScrollShadow orientation="vertical" className="h-full" ref={scrollRef}>
        <div className="justify-center items-center">
          {path.pathname === "/" ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            >
              <div className="flex flex-col gap-2 items-center">
                <Logo height="210" width="340" />
                {loading ? (
                  <Loader className="animate-spin" size={36} />
                ) : (
                  // Adding Freelancer static profiles
                  <>
                    <p className="text-xl font-bold uppercase ">
                      Meet Autolanding AI, your personal agent to find
                      affordable and talented freelancers 👩🏿‍💻
                    </p>
                    <div className="freelancer_profiles w-full ">
                      <ul className="flex gap-4 overflow-x-auto w-full">
                        {freelancers.map((freelancer, index) => (
                          <li key={index} className="flex-shrink-0">
                            <Card
                              title={freelancer.title}
                              description={freelancer.description}
                              image={freelancer.image}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* rendering keywords */}
                    <div className="keywords w-full my-2">
                      <ul className="flex gap-4 overflow-x-auto w-full">
                        {keyWords.map((data, index) => (
                          <li key={index} className="flex-shrink-0">
                            <button className="btn p-2 rounded">
                              {data}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          ) : path.pathname.split("/")[1] === "project" && project ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="flex flex-col gap-4 h-full"
            >
              <div className="flex flex-col items-start justify-center space-y-2 mb-4">
                <h1 className="text-xl font-extrabold lg:text-5xl text-left">
                  {project?.title ?? "Untitled"}
                </h1>
                <h2 className="pb-2 text-xl tracking-tight text-left">
                  {new Date(project?.created_at ?? "").toDateString()}
                </h2>
              </div>
              <div className="flex flex-col w-full h-full space-y-2 mb-4">
                <h2 className="text-md lg:text-lg font-semibold tracking-tight first:mt-0">
                  Description
                </h2>
                <p className="text-sm md:text-lg">
                  {project?.description ?? "No description found."}
                </p>
              </div>
              <div className="flex flex-col w-full h-full space-y-2 mb-4">
                <h2 className="text-md lg:text-lg font-semibold tracking-tight first:mt-0">
                  Status
                </h2>
                <p className="text-sm md:text-lg">
                    {
                      ProjectStatus[
                        //@ts-expect-error ignore this error
                        project?.status ?? "not_started"
                      ]
                    }
                  </p>
              </div>
              <div className="flex flex-col w-full h-full space-y-2">
                <h2 className="text-md lg:text-lg font-semibold tracking-tight first:mt-0">
                  Attachments
                </h2>
                <p className="text-sm md:text-lg">
                    {project?.attachments_link? 
                      project?.attachments_link
                      : "None"}
                </p>
              </div>

              <div className="flex flex-col items-center pb-8">
                <Logo height="100" width="100" />
                <h2 className="scroll-m-20 text-xl mt-2 font-semibold tracking-tight first:mt-0 text-center">
                  Thank you for using Autolanding AI!
                </h2>
                <h2 className="scroll-m-20 text-xl font-semibold tracking-tight first:mt-0 text-center">
                  One of our team members will be in touch with you shortly.
                </h2>
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="flex flex-col gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              {!chat.isError &&
                chat?.chatHistory?.map((message) => (
                  <div key={message.message_id}>
                    <div className={`flex gap-1`}>
                      {message.sender === "user" ? (
                        <Avatar className="h-[32px] w-[32px]">
                          <AvatarImage
                            src="https://github.com/shadcn.png"
                            alt="@shadcn"
                          />
                        </Avatar>
                      ) : (
                        <Logo height="32" width="32" />
                      )}
                      <div className="flex flex-col items-center justify-center ml-2">
                        <span className="font-semibold">
                          {message.sender === "user" ? "You" : "Autolanding AI"}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p>{message.content}</p>
                    </div>
                  </div>
                ))}
            </motion.div>
          )}
        </div>
      </ScrollShadow>
    </div>
  );
}

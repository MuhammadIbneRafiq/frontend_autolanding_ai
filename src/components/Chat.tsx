import { Avatar, AvatarImage } from "./ui/avatar";
import { useEffect, useRef } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader } from "lucide-react";
import { Logo } from "./Logo";
import { ScrollShadow } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useChat } from "@/hooks/useChat";
import { useLocation } from "react-router-dom";
import { useProject } from "@/hooks/useProject";
import ReactMarkdown from "react-markdown";
import user1 from "../assets/francesco from Konnecte.png";
// import user2 from "../assets/user3.jpg";
import user3 from "../assets/JAMIL.jpg";
import user4 from "../assets/user6.jpg";
import user5 from "../assets/user5.jpg";
import user6 from "../assets/user1.jpg";
import user7 from "../assets/alshahabRezvi.jpg";
import ShareButton from "./ShareButton";
import { useAuth } from "@/hooks/useAuth";
import Project from "./Project"; // Import the refactored Project component

// import { useSearch } from "@/hooks/useSearch";

// display cards
import TwitterSearch from "./TwitterSearch";
import { getTweetResultProjects } from "@/constants/test";

interface ChatProps {
  loading: boolean;
  searchResults: ResultItemProps[];
}

interface CardProps {
  title: string;
  description: string;
  image: string;
}

// let tweetResultProjects: any = [];
interface Project {
  id: string | number;
  name: string;
  tweet: string; // This might be different in your actual type
  profile: string; // This might be different in your actual type
}

// This function converts Project[] to ResultItemProps[]
const convertProjectsToResultItems = (projects: Project[]) => {
  return projects.map((project) => ({
    id: typeof project.id === "string" ? parseInt(project.id, 10) : project.id,
    name: project.name ?? "",
    tweet: project.tweet ?? "",
    profile: project.profile ?? "",
  }));
};

// let tweetResultProjects: any = [];
interface Project {
  id: string | number;
  name: string;
  tweet: string; // This might be different in your actual type
  profile: string; // This might be different in your actual type
}

interface ResultItemProps {
  id: number;
  name: string;
  tweet: string;
  profile: string;
  url: string;
}

export default function Chat({ loading, searchResults }: ChatProps) {
  const path = useLocation();
  const chat = useChat({ id: path?.pathname.split("/")[2] });
  // const search = useSearch();

  const [tweetResultProjects, setTweetResultProjects] = useState<Project[]>([]);

  const { project } = useProject({ id: path?.pathname.split("/")[2] });
  const { isAuthenticated } = useAuth();

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Assuming getTweetResultProjects fetches an array of Project[]
    getTweetResultProjects().then((projects) => {
      const resultItems = convertProjectsToResultItems(projects ?? []);
      setTweetResultProjects(resultItems);
    });
  }, []);

  useEffect(() => {
    if (tweetResultProjects.length > 3) {
      // console.log("LOOPP");

      let arr = [];
      for (
        let i = tweetResultProjects.length - 1;
        i > tweetResultProjects.length - 4;
        i--
      ) {
        arr.push(tweetResultProjects[i]);
      }
      setTweetResultProjects(arr);
    }
  }, [tweetResultProjects]);

  useEffect(() => {
    if (scrollRef.current) {
      if (path?.pathname.includes("/project")) {
        // Scroll to the top
        scrollRef.current.scrollTop = 0;
      } else if (path?.pathname.includes("/chat")) {
        // Scroll to the bottom
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }
  }, [chat.chatHistory, path?.pathname]); // Trigger whenever chat history or path changes

  const truncateDescription = (description: string) => {
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
    // {
    //   title: "Charlie",
    //   description:
    //     "AI hacker and musician exploring the frontiers of technology and ...",
    //   image: user2,
    // },
    {
      title: "Jamil",
      description: "SEO silver plate youtuber with 10+ ecommerce clients.",
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
      image: user5,
    },
    {
      title: "Luna ",
      description:
        "Innovative UI/UX designer committed to creating intuitive and visually appealing interfaces.",
      image: user6,
    },
    {
      title: "Oliver ",
      description:
        "Detail-oriented frontend developer with expertise in responsive web design and performance optimization.",
      image: user7,
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

  function MarkdownRenderer({ content }: { content: string }) {
    return (
      <div className="markdown-content">
        <ReactMarkdown
          components={{
            h1: ({ node, ...props }) => (
              <h1
                style={{
                  fontSize: "2em",
                  marginBottom: "0.5em",
                  marginTop: "1em",
                }}
                {...props}
              />
            ),
            h2: ({ node, ...props }) => (
              <h2
                style={{
                  fontSize: "1.5em",
                  marginBottom: "0.5em",
                  marginTop: "1em",
                }}
                {...props}
              />
            ),
            h3: ({ node, ...props }) => (
              <h3
                style={{
                  fontSize: "1.17em",
                  marginBottom: "0.5em",
                  marginTop: "1em",
                }}
                {...props}
              />
            ),
            ul: ({ node, ...props }) => (
              <ul
                style={{
                  listStyleType: "disc",
                  marginBottom: "1em",
                  paddingLeft: "2em",
                }}
                {...props}
              />
            ),
            ol: ({ node, ...props }) => (
              <ol
                style={{
                  listStyleType: "decimal",
                  marginBottom: "1em",
                  paddingLeft: "2em",
                }}
                {...props}
              />
            ),
            li: ({ node, ...props }) => (
              <li style={{ marginBottom: "0.5em" }} {...props} />
            ),
            strong: ({ node, ...props }) => (
              <strong style={{ fontWeight: "bold" }} {...props} />
            ),
            em: ({ node, ...props }) => (
              <em style={{ fontStyle: "italic" }} {...props} />
            ),
            p: ({ node, ...props }) => (
              <p
                style={{ marginBottom: "1em", lineHeight: "1.5" }}
                {...props}
              />
            ),
            blockquote: ({ node, ...props }) => (
              <blockquote
                style={{
                  borderLeft: "4px solid #ccc",
                  paddingLeft: "1em",
                  marginLeft: "0",
                  marginRight: "0",
                }}
                {...props}
              />
            ),
            code: ({ node, ...props }) => (
              <code
                style={{
                  backgroundColor: "#f0f0f0",
                  padding: "0.2em 0.4em",
                  borderRadius: "3px",
                }}
                {...props}
              />
            ),
            pre: ({ node, ...props }) => (
              <pre
                style={{
                  backgroundColor: "#f0f0f0",
                  padding: "1em",
                  overflowX: "auto",
                  borderRadius: "4px",
                }}
                {...props}
              />
            ),
            a: ({ node, ...props }) => (
              <a
                style={{ fontWeight: "bold", textDecoration: "underline" }}
                {...props}
              />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    );
  }

  const [isLoading, setIsLoading] = useState(false);
  const fetchCheckoutUrl = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        `https://backend-autolanding-ai.vercel.app/stripe`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      window.location.href = response.data.checkoutUrl;
    } catch (error) {
      toast.error("There was an error. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error("Error creating Stripe checkout session:", error);
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return (
      <div className="flex flex-col h-[80vh] w-full gap-2 py-4 justify-center">
        <div className="text-center p-4">
          <p className="text-2xl font-semibold">Redirecting to payment...</p>
        </div>
      </div>
    );
  }

  // const len = 5;
  // console.log("yoyoyo");
  // console.log(searchResults);

  return (
    <div className="flex flex-col h-full w-full gap-2 py-4">
      {isAuthenticated && (
        <ShareButton
          shareUrl={window.location.href}
          title={
            "🚀 Streamline Your Workflow with AI! Click here to join the conversation and explore my latest project on Autolanding:"
          }
        />
      )}
      <ScrollShadow orientation="vertical" className="h-full" ref={scrollRef}>
        <div className="justify-center items-center px-4 pt-8 pb-8">
          {path.pathname === "/chatHome" ? (
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
                    <p className="text-xl font-bold uppercase text-center">
                      Your Personal AI Agent to get you agencies or freelancers
                      by simply chatting!
                    </p>
                    {/* <p className="text-xl font-bold uppercase text-center">
                      All you need to do is describe your project to our agent.
                    </p> */}
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
                            <button className="btn p-2 rounded">{data}</button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          ) : path.pathname.split("/")[1] === "project" && project ? (
              <Project project={project} fetchCheckoutUrl={fetchCheckoutUrl} />  // Use the Project component here
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
                            src="https://github.com/shadcn.png" // get from User_data from google or this
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
                      <MarkdownRenderer content={message.content} />
                    </div>
                  </div>
                ))}


              
                {chat?.chatHistory?.slice(-2)[0].content.includes("freelancer") && // if the message from user contains the word freelancer then the search results from the backend will be displayed
                chat?.chatHistory?.slice(-2)[0].sender == "user" && (
                  <TwitterSearch tweetResult={searchResults} />
                )}

                {chat?.chatHistory?.slice(-2)[0]?.content?.includes("project") && // if the message from user contains the word project then all the projects will be displayed
                  chat?.chatHistory?.slice(-2)[0]?.sender === "user" && (
                    <TwitterSearch
                      tweetResult={tweetResultProjects.map((project) => ({
                        id: typeof project.id === "string" ? parseInt(project.id, 10) : project.id,
                        name: project.name,
                        tweet: project.tweet, // Assuming 'tweet' is a property in Project
                        profile: project.profile, // Assuming 'profile' is a property in Project
                      }))}
                    />
                )}

                
            </motion.div> // add a toast to tell them to put up a paywall to have them direct client access or some prompting technique or joining the discord server here base on user's (-2)[0] message
          )}
        </div>
      </ScrollShadow>
    </div>
  );
}

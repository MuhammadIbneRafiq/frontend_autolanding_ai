// Project.tsx
import { Logo } from "./Logo";
// import { ProjectStatus } from "@/types/Project";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";


interface ProjectProps {
  project: any;
  fetchCheckoutUrl: () => void;
}

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

const Project: React.FC<ProjectProps> = ({ project, fetchCheckoutUrl }) => {
  return (
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
          <MarkdownRenderer
            content={project?.description ?? "No description found."}
          />
        </p>
      </div>
      <div className="flex flex-col w-full h-full space-y-2">
        <h2 className="text-md lg:text-lg font-semibold tracking-tight first:mt-0">
          Attachments
        </h2>
        <p className="text-sm md:text-lg">
          {project?.attachments_link ? project?.attachments_link : "None"}
        </p>
      </div>

      <div className="flex flex-col items-center pb-8">
        <Logo height="140" width="290" />
        <div className="scroll-m-20 mt-2 font-semibold text-center w-full px-5">
          <h2 className="scroll-m-20 text-xl font-semibold tracking-tight first:mt-0 text-center">
            Thank you for using Auto Landing AI.
          </h2>
          <h2 className="scroll-m-20 text-xl font-semibold tracking-tight first:mt-0 mb-8 text-center">
            Our team will be in touch with you shortly to discuss your project
            further.
          </h2>
          <h3 className="tracking-tight first:mt-0 mb-4 text-center">
            After that, you can use the link below to pay 50% of the agreed
            price upfront.
          </h3>
          <button
            onClick={fetchCheckoutUrl}
            className="text-black bg-white px-6 py-2 rounded-full transition duration-300 ease-in-out transform hover:bg-gray-200 active:bg-gray-300 shadow-lg"
          >
            Pay 50% Upfront
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Project;

import { cn } from "@/lib/utils";
import Marquee from "../magicui/marquee";

const reviews = [
  {
    name: "Ahmed",
    username: "@ahmed_freelancer",
    body: "wth finally no more review based shit! 🥳 Chatting with clients is so easy. Supporting my fam, thanks to this. 💪",
    img: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    name: "Maria",
    username: "@maria_dev",
    body: "and i thought ai's gonna take my job, heres its giving me DANG, love it! 🔥",
    img: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    name: "Chen",
    username: "@chen_code",
    body: "who thought of hiring by chatting? i wish tinder found me dates like Auto landing Ai finding me clients🙌",
    img: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    name: "Aisha",
    username: "@aisha_designs",
    body: "dude fuck cold emails haha this is infinite client leads glitch! 🌟",
    img: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    name: "Rahul",
    username: "@rahul_dev",
    body: "The AI chat rocks! Finding clients is so quick and easy. Feeling blessed. ✨",
    img: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    name: "Sophia",
    username: "@sophia_writer",
    body: "This platform is next level! AI chat is awesome. So many opportunities, so much freedom. 😍",
    img: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];


const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export const TwitterCard = () => {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
};
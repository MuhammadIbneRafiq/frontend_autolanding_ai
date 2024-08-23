import { supabase } from "@/hooks/supaBase";

export const tweetResult = [
  {
    id: 1,
    name: "Alex Johnson",
    tweet:
      "Looking for new freelance opportunities in web development. Available to start immediately. #freelance #webdev",
    profile:
      "https://pbs.twimg.com/profile_images/1624781151809466368/tnuASsdY_400x400.jpg",
    url: "https://www.linkedin.com/in/jamae/",
  },
  {
    id: 2,
    name: "Maria Garcia",
    tweet:
      "Experienced graphic designer open for freelance projects. DM me if you need a creative mind! #freelance #graphicdesign",
    profile:
      "https://pbs.twimg.com/profile_images/1624781151809466368/tnuASsdY_400x400.jpg",
    url: "https://www.linkedin.com/in/vasilijesimic/",
  },
  {
    id: 3,
    name: "Michael Brown",
    tweet:
      "Currently looking for freelance software development work. Specialize in Python and Django. #freelance #Python",
    profile:
      "https://pbs.twimg.com/profile_images/1624781151809466368/tnuASsdY_400x400.jpg",
    url: "https://www.linkedin.com/in/filip-wauters/",
  },
  {
    id: 4,
    name: "Emily Davis",
    tweet:
      "Available for freelance copywriting. Get in touch for quality content that resonates with your audience. #freelance #copywriting",
    profile:
      "https://pbs.twimg.com/profile_images/1624781151809466368/tnuASsdY_400x400.jpg",
    url: "https://www.linkedin.com/in/thomaspalermo",
  },
  // {
  //   id: 5,
  //   name: "John Wilson",
  //   tweet:
  //     "Looking for a new project! Freelance full-stack developer with experience in React and Node.js. #freelance #fullstack",
  //   profile:
  //     "https://pbs.twimg.com/profile_images/1624781151809466368/tnuASsdY_400x400.jpg",
  // },
  // {
  //   id: 6,
  //   name: "Sophia Martinez",
  //   tweet:
  //     "Freelance digital marketing expert available to boost your brand's online presence. Let's connect! #freelance #digitalmarketing",
  //   profile:
  //     "https://pbs.twimg.com/profile_images/1624781151809466368/tnuASsdY_400x400.jpg",
  // },
  // {
  //   id: 7,
  //   name: "James Anderson",
  //   tweet:
  //     "Offering freelance photography services. Capturing moments that matter. Contact me for collaborations. #freelance #photography",
  //   profile:
  //     "https://pbs.twimg.com/profile_images/1624781151809466368/tnuASsdY_400x400.jpg",
  // },
  // {
  //   id: 8,
  //   name: "Olivia Taylor",
  //   tweet:
  //     "Available for freelance UX/UI design projects. Creating user-centered designs that engage and convert. #freelance #uxdesign",
  //   profile:
  //     "https://pbs.twimg.com/profile_images/1624781151809466368/tnuASsdY_400x400.jpg",
  // },
  // {
  //   id: 9,
  //   name: "Daniel Hernandez",
  //   tweet:
  //     "Freelance mobile app developer open to new projects. Let's build something amazing together! #freelance #mobiledev",
  //   profile:
  //     "https://pbs.twimg.com/profile_images/1624781151809466368/tnuASsdY_400x400.jpg",
  // },
  // {
  //   id: 10,
  //   name: "Emma Lee",
  //   tweet:
  //     "Looking for freelance writing gigs. Experienced in blog posts, articles, and creative content. #freelance #writing",
  //   profile:
  //     "https://pbs.twimg.com/profile_images/1624781151809466368/tnuASsdY_400x400.jpg",
  // },
];

export const tweetResultProjects = [
  {
    id: 1,
    name: "Chris Thompson",
    tweet:
      "In need of a skilled web developer for a new project. Freelancers, please get in touch! #hiring #webdev",
    profile:
      "https://pbs.twimg.com/profile_images/1624781151809466368/tnuASsdY_400x400.jpg",
    url: "",
  },
  {
    id: 2,
    name: "Laura Martinez",
    tweet:
      "Looking to hire a creative graphic designer for our upcoming campaign. Freelancers, DM me your portfolio! #hiring #graphicdesign",
    profile:
      "https://pbs.twimg.com/profile_images/1624781151809466368/tnuASsdY_400x400.jpg",
    url: "",
  },
  {
    id: 3,
    name: "David Clark",
    tweet:
      "Seeking a freelance Python developer for a short-term project. Contact me if interested! #hiring #Python",
    profile:
      "https://pbs.twimg.com/profile_images/1624781151809466368/tnuASsdY_400x400.jpg",
    url: "",
  },
  {
    id: 4,
    name: "Sarah Johnson",
    tweet:
      "Need a talented copywriter for a series of blog posts. Freelancers, reach out! #hiring #copywriting",
    profile:
      "https://pbs.twimg.com/profile_images/1624781151809466368/tnuASsdY_400x400.jpg",
    url: "",
  },
  {
    id: 5,
    name: "Mark Robinson",
    tweet:
      "Hiring a full-stack developer for an exciting project. Freelancers with React and Node.js experience, let's connect! #hiring #fullstack",
    profile:
      "https://pbs.twimg.com/profile_images/1624781151809466368/tnuASsdY_400x400.jpg",
    url: "",
  },
  {
    id: 6,
    name: "Isabella White",
    tweet:
      "Looking for a digital marketing expert to help grow our brand. Freelancers, please reach out! #hiring #digitalmarketing",
    profile:
      "https://pbs.twimg.com/profile_images/1624781151809466368/tnuASsdY_400x400.jpg",
    url: "",
  },
  {
    id: 7,
    name: "Ryan Scott",
    tweet:
      "In need of a freelance photographer for an upcoming event. Contact me for details! #hiring #photography",
    profile:
      "https://pbs.twimg.com/profile_images/1624781151809466368/tnuASsdY_400x400.jpg",
    url: "",
  },
  {
    id: 8,
    name: "Grace Wilson",
    tweet:
      "Seeking a freelance UX/UI designer for a product redesign. Freelancers, let’s chat! #hiring #uxdesign",
    profile:
      "https://pbs.twimg.com/profile_images/1624781151809466368/tnuASsdY_400x400.jpg",
    url: "",
  },
  {
    id: 9,
    name: "Ethan Davis",
    tweet:
      "Looking to hire a freelance mobile app developer. Exciting projects ahead! #hiring #mobiledev",
    profile:
      "https://pbs.twimg.com/profile_images/1624781151809466368/tnuASsdY_400x400.jpg",
    url: "",
  },
  {
    id: 10,
    name: "Victoria Brown",
    tweet:
      "In search of a freelance writer for various content needs. Writers, please send over your samples! #hiring #writing",
    profile:
      "https://pbs.twimg.com/profile_images/1624781151809466368/tnuASsdY_400x400.jpg",
    url: "",
  },
];

export const getTweetResultProjects = async () => {
  try {
    // Query to fetch user data for a specific project_id
    const { data, error } = await supabase.rpc("fetch_projects_with_users");

    if (error) {
      throw error;
    }

    if (data.length > 0) {
      type KeyMap = { [key: string]: string };
      const keyMap: KeyMap = {
        project_id: "id",
        username: "name",
        description: "tweet",
        avatar_url: "profile",
      };

      type AnyObject = { [key: string]: any };

      const renameKeys = <T extends AnyObject>(
        obj: T,
        keyMap: KeyMap
      ): { [key: string]: any } => {
        return Object.keys(obj).reduce(
          (acc, key) => {
            const newKey = keyMap[key] || key; // Default to the original key if no mapping exists
            acc[newKey] = obj[key]; // Assign the value to the new key
            return acc;
          },
          {} as { [key: string]: any }
        );
      };

      const transformedData = Promise.all(
        data.map((item: any) => renameKeys(item, keyMap))
      );
      return transformedData;
    }
  } catch (error) {
    return [];
  }
};

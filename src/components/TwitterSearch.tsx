import ResultCard from "./ResultCard";

interface ResultItemProps {
  id: number;
  name: string;
  tweet: string;
  profile: string;
}

const truncateDescription = (description: string) => {
  const words = description.split(" ");
  if (words.length > 6) {
    return words.slice(0, 10).join(" ") + "...";
  } else {
    return description;
  }
};

const TwitterSearch = ({ tweetResult }: { tweetResult: ResultItemProps[] }) => {
  return (
    <div className="flex gap-2 overflow-x-auto whitespace-nowrap max-w-full">
      {tweetResult.map((result: ResultItemProps) => (
        <ResultCard
          key={result.id}
          id={result.id}
          name={result.name}
          tweet={truncateDescription(result.tweet)}
          profile={result.profile}
        />
      ))}
    </div>
  );
};

export default TwitterSearch;

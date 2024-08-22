import ResultCard from "./ResultCard";

interface ResultItemProps {
  id: number;
  name: string;
  tweet: string;
  profile: string;
  url: string;
}

const TwitterSearch = ({ tweetResult }: { tweetResult: ResultItemProps[] }) => {
  return (
    <div className="flex gap-2 overflow-x-auto whitespace-nowrap max-w-full">
      {tweetResult.map((result: ResultItemProps) => (
        <a href={result.url} target="_blank" rel="noreferrer" key={result.id}>
          <ResultCard
            key={result.id}
            id={result.id}
            name={result.name}
            tweet={result.tweet}
            profile={result.profile}
          />
        </a>
      ))}
    </div>
  );
};

export default TwitterSearch;

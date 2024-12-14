import { supabase } from "@/hooks/supaBase";

export const tweetResult = [
  {
    id: 1,
    name: "Jan de Vries",
    tweet:
      "WO-opgeleide beleidsadviseur met ervaring in overheidsbeleid. Op zoek naar een flexibele functie (24-32 uur) bij de overheid. #werkzoekend #overheid",
    profile: "https://example.com/profile1.jpg",
    url: "https://www.linkedin.com/in/jandevries/",
  },
  {
    id: 2,
    name: "Sophie van der Berg",
    tweet:
      "HBO Juridisch medewerker zoekt nieuwe uitdaging bij provincie Zuid-Holland. Ervaring met toegankelijkheidsbeleid. #werkzoekend #overheid",
    profile: "https://example.com/profile2.jpg",
    url: "https://www.linkedin.com/in/sophievdberg/",
  },
  {
    id: 3,
    name: "Mohammed El Amrani",
    tweet:
      "WO Informatica afgestudeerd, op zoek naar IT functie bij de overheid. Parttime beschikbaar. #werkzoekend #ICT #overheid",
    profile: "https://example.com/profile3.jpg",
    url: "https://www.linkedin.com/in/mohammed-el-amrani/",
  },
  {
    id: 4,
    name: "Emma Bakker",
    tweet:
      "HBO-opgeleide HR adviseur zoekt functie bij provincie. Ervaring met diversiteit & inclusie projecten. #werkzoekend #HR",
    profile: "https://example.com/profile4.jpg",
    url: "https://www.linkedin.com/in/emmabakker/",
  },
];

export const tweetResultProjects = [
  {
    id: 1,
    name: "Provincie Zuid-Holland",
    tweet:
      "Vacature: Beleidsadviseur Duurzaamheid (WO, 24-36 uur). Werkplek volledig aangepast mogelijk. #vacature #overheid",
    profile: "https://example.com/pzh-logo.jpg",
    url: "https://www.zuid-holland.nl/werken",
  },
  {
    id: 2,
    name: "Gemeente Den Haag",
    tweet:
      "HBO Juridisch medewerker gezocht (32 uur). Flexibele werktijden mogelijk. Inclusieve werkplek. #vacature #overheid",
    profile: "https://example.com/denhaag-logo.jpg",
    url: "https://werkenvoordenhaag.nl",
  },
  {
    id: 3,
    name: "Provincie Zuid-Holland",
    tweet:
      "IT Project Manager (WO, 24-40 uur). Hybride werken mogelijk. Ervaring met toegankelijkheid een pre. #vacature #ICT",
    profile: "https://example.com/pzh-logo.jpg",
    url: "https://www.zuid-holland.nl/werken",
  },
  {
    id: 4,
    name: "Gemeente Rotterdam",
    tweet:
      "HR Adviseur Diversiteit & Inclusie (HBO/WO, 28-36 uur). Aangepaste werkplek beschikbaar. #vacature #HR",
    profile: "https://example.com/rotterdam-logo.jpg",
    url: "https://www.rotterdam.nl/werken",
  },
  {
    id: 5,
    name: "Provincie Zuid-Holland",
    tweet:
      "Senior Communicatieadviseur (HBO+, 24-32 uur). Focus op inclusieve communicatie. Flexibele werktijden. #vacature",
    profile: "https://example.com/pzh-logo.jpg",
    url: "https://www.zuid-holland.nl/werken",
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

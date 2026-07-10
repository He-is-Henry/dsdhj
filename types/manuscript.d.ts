type Manuscript = {
  _id: string;

  name: string;
  email: string;
  affiliation: string;
  institutionalAddress: string;
  discipline: string;
  country: string;

  title: string;
  type: string;
  keywords: string[];
  abstract: string;
  references: string;

  coAuthors: { name: string; email: string }[];

  file: string;
  edited: boolean;

  comment: string;
  history: {
    comment: string;
    createdAt: string;
    readBy: string[];
  }[];

  author: string;
  status: "screening" | "under-review" | "accepted" | "paid" | "rejected";
  volume: number;
  issue: number;

  customId: string;
  slug: string;
  views: number;

  createdAt: Date;
  updatedAt: Date;
  submittedOn: Date;
};

type ManuscriptKeys = keyof Manuscript;
type ManuscriptValues = Manuscript[ManuscriptKeys];

type Archive = {
  issue: number;
  volume: number;
  file: string;
  createdAt: Date;
};

type Archives = Archive[];

type InitialManuscript = Partial<Manuscript>;

type Field = keyof InitialManuscript;
type Value = InitialManuscript[Field];

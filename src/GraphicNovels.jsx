import React from "react";
import Listicle from "./Listicle";

const ITEMS = [
  {
    title: "Chasin' the Bird",
    creator: "Dave Chisholm",
    image: "/images/graphic-novels/chasin-the-bird.jpg",
    year: 2020,
    genre: "Biographical",
    body: "Dave Chisholm is a talented artist and writer who has written a number of jazz themed graphic novels. This is easily the best of his books, and perhaps the best of all the works in this list. I love that he stuck with a short period of Bird's life told through multiple vantage points instead of trying to squeeze an entire biography into too few pages. The artwork is full of emotion and includes a handful of two page spreads that I'd be happy to hang on my walls. Highly recommended.",
    ratings: [
      { label: "Art", value: 5 },
      { label: "Story", value: 5 },
    ],
  },
  {
    title: "Billie Holiday",
    creator: "Ebony Gilbert",
    image: "images/graphic-novels/billie-holiday.jpg",
    year: 2020,
    genre: "Biographical",
    body: "Gilbert's Holiday biography is dark, violent, and tragic. The single color, sparingly lit noir-style panels immerse you in the terrible circumstances that surrounded Holliday's career. There are moments of joy found on the bandstand, but this is far from a feel-good celebration of her art. A tough read emotionally, but worth it.",
    ratings: [
      { label: "Art", value: 4 },
      { label: "Story", value: 4 },
    ],
  },
  {
    title: "Deep Cuts",
    creator: "Kyle Higgins & Joe Clark",
    image: "images/graphic-novels/deep-cuts.jpg",
    year: 2023,
    genre: "Fiction",
    body: "Deep Cuts is unique among the books on this list for having an experienced mainstream comic author in Kyle Higgins (and a mainstream comic publisher in Image). It's an anthology of six unrelated stories with six very different art styles that range from cartoony to realistic. The writing is fantastic, and introduces characters with real depth whose lives are touched by jazz music. Highly recommended.",
    ratings: [
      { label: "Art", value: 4 },
      { label: "Story", value: 5 },
    ],
  },
  {
    title: "Hot Jazz",
    creator: "Hunt Emerson",
    image: "images/graphic-novels/hot-jazz.jpg",
    year: 2015,
    genre: "Comedy",
    body: "Hot Jazz reads like a darker version of Sunday newspaper comic strips. A lot of the punchlines revolve around the fact that main character Max Zillion can't find an audience. Comedy is such a personal thing, and Emerson's humor just didn't work for me. I struggled to finish this and am not sure if there's anyone I would recommend it to.",
    ratings: [
      { label: "Art", value: 3 },
      { label: "Story", value: 1 },
    ],
  },
  {
    title: "Total Jazz",
    creator: "Blutch",
    image: "images/graphic-novels/total-jazz.jpg",
    year: 2018,
    genre: "Comedy",
    body: "Total Jazz is a collection of single page comics that originally ran in Jazzman magazine. Some are cultural commentary, some are silly, and others are just illustrations of musicians playing or listeners reacting to music. There are some nice pages in here, but also a lot that doesn't resonate for me.",
    ratings: [
      { label: "Art", value: 3 },
      { label: "Story", value: 2 },
    ],
  },
  {
    title: "Blue Giant",
    creator: "Shinichi Ishizuka",
    image: "images/graphic-novels/blue-giant.jpg",
    year: 2020,
    genre: "Manga",
    body: "Blue Giant is a manga that follows aspiring tenor saxophonist Miyamoto Dai. It does a good job of showing the passion and discipline required to be a great improviser and would make an excellent stealthy gift for a younger reader who isn't ready to listen to Coltrane but might enjoy a coming of age story. This series has dozens of volumes, as well as a film adaptation with music by Hiromi.",
    ratings: [
      { label: "Art", value: 3 },
      { label: "Story", value: 4 },
    ],
  },
  {
    title: "Monk!",
    creator: "Youssef Dadudi",
    image: "images/graphic-novels/monk.jpg",
    year: 2020,
    genre: "Biographical",
    body: "In Monk!, Dadudi's playful art style does a wonderful job of portraying the many sides of the genius composer and pianist. The story weaves between the beauty of his music, his vices, and his complex relationship with jazz benefactor Pannonica De Koenigswarter. Clocking in at over 300 pages, it is an unrushed and worthy tribute to the master.",
    ratings: [
      { label: "Art", value: 4 },
      { label: "Story", value: 4 },
    ],
  },
  {
    title: "Miles Davis and the Search for the Sound",
    creator: "Dave Chisholm",
    image: "images/graphic-novels/miles-davis-and-the-search-for-the-sound.jpg",
    year: 2020,
    genre: "Biographical",
    body: "As with all the Chisholm titles, it's easy to recommend this based on the artwork alone. It's truly a delight to see the music I love represented visually by an artist who really understands the music. I think Miles's career was too vast to fit into a trade-paperback sized novel, and the story suffers a little from trying to squeeze in so many career highlights. I would have loved to see a vignette about some smaller slice of Miles's life, like the formula that worked so well in Chasin' the Bird.",
    ratings: [
      { label: "Art", value: 5 },
      { label: "Story", value: 3 },
    ],
  },
  {
    title: "Enter the Blue",
    creator: "Dave Chisholm",
    image: "images/graphic-novels/enter-the-blue.jpg",
    year: 2022,
    genre: "Fantasy",
    body: "I have mixed feelings about this one. The artwork is amazing, and I love the idea of a jazz book that leans into the traditional comic book theme of abilities that transcend scientific explanation. I think the Blue Note tie-in undermines the story's credibility and makes the whole thing feel a bit like an ad. I hope Dave continues to explore this direction because it oozes with potential.",
    ratings: [
      { label: "Art", value: 5 },
      { label: "Story", value: 3 },
    ],
  },
];

function byCreatorThenTitle(a, b) {
  const lastFirst = (name) => { const p = name.split(' '); return [...p.slice(1), ...p.slice(0, 1)]; };
  const aParts = lastFirst(a.creator);
  const bParts = lastFirst(b.creator);
  for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
    const cmp = (aParts[i] ?? '').localeCompare(bParts[i] ?? '');
    if (cmp !== 0) return cmp;
  }
  return a.title.localeCompare(b.title);
}

export default function GraphicNovels() {
  return (
    <Listicle
      title="Jazz Graphic Novels"
      intro="Our dedicated team of jazz archeologists has searched far and wide to track down every jazz themed graphic novel on the market. Here are some great books that combine the music we love with amazing art and storytelling. There are no affiliate links on this page; consider buying them from your local bookstore."
      authorName="Adam Czerepinski"
      authorImage="/images/adam.jpg"
      items={[...ITEMS].sort(byCreatorThenTitle)}
    />
  );
}

import React from "react";

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-text">
        <h1 style={{color:"blueviolet"}}>Discover Your Next Great Read</h1>
        <p>
          Uncover captivating stories, enriching knowledge, and endless
          inspiration in our curated collection of books.
        </p>
        <button className="discover-btn">Discover Books</button>
      </div>
      <div className="hero-image">
        <img src="https://static.vecteezy.com/system/resources/thumbnails/026/401/801/small_2x/schoolgirl-reads-the-book-in-the-sky-flying-in-her-dreams-and-fantasies-learning-concept-with-little-girl-in-the-world-of-education-generated-ai-photo.jpg" alt="Books Illustration" />
      </div>
    </section>
  );
};

export default HeroSection;

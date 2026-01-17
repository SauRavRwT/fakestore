import React from 'react';  
import './About.css';

function About() {
  return (
    <div className="about-container my-5">
      <h2 className="mb-4">About FakeStore</h2>
      <p>
        Welcome to FakeStore,
        i am your neighborhood friend Balbheji, who build projects to in free time and share with the world.
      </p>
      <p>
        This is a simple e-commerce website built with React and Bootstrap. Which uses the FakeStore API to fetch product data. 
      </p>
      <p>
        Feel free to reach out to me for any queries or feedback!
      </p>
    </div>
  );
}

export default About;

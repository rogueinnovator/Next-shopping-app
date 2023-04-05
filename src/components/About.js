// You can use the `useRef` hook to create a reference to a DOM element and then use it to open a modal. Here's an example of how you can do it:

import React, { useRef } from "react";

function About() {
  const modalRef = useRef(null);

  const openModal = () => {
    modalRef.current.style.display = "block";
  };

  const closeModal = () => {
    modalRef.current.style.display = "none";
  };

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <div ref={modalRef} className="modal">
        <div className="modal-content">
          <span onClick={closeModal} className="close">
            &times;
          </span>
          <p>Modal Content</p>
        </div>
      </div>
    </div>
  );
}
export default About;

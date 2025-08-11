import { createPortal } from "react-dom";
// This portal ^ allows the modal to go all the way out
// to the root instead of being trapped in the DOM component it's in
import * as shared from "./shared.module.css";

// This Modal component will be passed in 3 different props:
//  -isOpen and setIsOpen will be states that you will need to make
//   on your end
//  -Module is the jsx data that will be inside of the Modal

// For example:
//
// const [isOpen, setIsOpen] = useState(false);
//
// return (
// <div>
//   <button onClick={() => setIsOpen(true)}>Click me!</button>   <--- You must set the click event
//   <Modal isOpen={isOpen} setIsOpen={setIsOpen} Module={() => (
//     <p>HELLO!</p>   <--- This will be displayed inside of the Modal (it can handle imgs)
//   )}/>
// </div>
// );

// (For any more reference you can look at src/components/related_and_outfit/Card.jsx (function at line 56))

// This allows for custom buttons, custom text, and even imgs to be
// passed in, opposed to having a set button that must be pressed
// to open the modal by default

// I've also added a custom "style" prop so you can adjust the container of the
// modal as you wish to

export default function Modal({ isOpen, setIsOpen, Module, style = {} }) {
  if (!isOpen) return null;

  return createPortal(
    <div
      id="activeModal"
      className={shared.modal}
      onClick={(e) => {
        if (e.target.id === "activeModal") setIsOpen(false);
      }}
    >
      <div className={shared["modal-content"]} style={style}>
        <span className={shared.close} onClick={() => setIsOpen(false)}>
          &times;
        </span>
        {Module}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}
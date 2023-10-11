import React, { useRef, useState } from "react";

const Modal = ({ id, children, width, height, ref }) => {
  return (
    <div  className="z-50">
      <input type="checkbox" id={id} className="modal-toggle" />
      <div className="modal backdrop-blur-sm">
        <div className="modal-box ">{children}</div>
        <label className="modal-backdrop" htmlFor={id}>
        </label>
      </div>
    </div>
  );
};

export default Modal;

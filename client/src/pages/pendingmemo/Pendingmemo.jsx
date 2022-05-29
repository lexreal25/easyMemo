import React from "react";
import "./pending.css";
export const Pendingmemo = () => {
  return (
    <div className="pending">
      <div className="pendingWrapper">
        <div className="memo-pending">
          <span className="memoId">ID: Loyalty-memo342</span>
          <span>To: </span>
          <span>From: </span>
        </div>
        <div className="date">{new Date().getDate()}</div>
        <p className="subj">The subject goes here</p>
      </div>
      <div className="pendingWrapper">
        <div className="memo-pending">
          <span className="memoId">ID: Loyalty-memo342</span>
          <span>To: </span>
          <span>From: </span>
        </div>
        <div className="date">{new Date().getDate()}</div>
        <p className="subj">The subject goes here</p>
      </div>
      <div className="pendingWrapper">
        <div className="memo-pending">
          <span className="memoId">ID: Loyalty-memo342</span>
          <span>To: </span>
          <span>From: </span>
        </div>
        <div className="date">{new Date().getDate()}</div>
        <p className="subj">The subject goes here</p>
      </div>
      <div className="pendingWrapper">
        <div className="memo-pending">
          <span className="memoId">ID: Loyalty-memo342</span>
          <span>To: </span>
          <span>From: </span>
        </div>
        <div className="details">
          <span className="date">Date: {new Date().getMonth}</span>
          <p className="subj">The subject goes here</p>
        </div>
      </div>
    </div>
  );
};

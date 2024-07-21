import React from 'react';

const Question = ({ question, answer }) => {
    console.log("Received question:", question);
    console.log("Received answer:", answer);

    const questionData = question ? JSON.parse(question) : {};
    const answerData = answer ? JSON.parse(answer) : {};

    return (
        <div>
            <h1>{questionData.content || "No question available"}</h1>
            <p>{answerData.content || "No answer available"}</p>
        </div>
    );
};

export default Question;

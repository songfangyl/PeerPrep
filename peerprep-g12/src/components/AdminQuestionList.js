import './component-styles/AdminQuestionList.css';
import React, { useState } from 'react';
import useQuestions from '../hooks/useQuestions';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import QuestionForm from './QuestionForm';
import Alert from '@mui/material/Alert';

export default function AdminQuestionList() {
  const {
    questions,
    loading,
    error,
    handleAddQuestion,
    handleUpdateQuestion,
    handleDeleteQuestion,
  } = useQuestions();

  const [open, setOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

  const difficultyMap = {
    0 : "Easy",
    1 : "Medium",
    2 : "Hard"
  }

  const handleOpenForUpdate = (question) => {
    setCurrentQuestion(question);
    setIsUpdate(true);     
    setOpen(true);     
  };

  // Function to handle opening the modal for adding a new question
  const handleOpenForAdd = () => {
    setCurrentQuestion(null);
    setIsUpdate(false);
    setOpen(true);
  };

  // Function to handle closing the modal
  const handleClose = () => {
    setCurrentQuestion(null);
    setOpen(false);
  };

  if (loading) {
    return <div className='loading'>Loading......</div>;
  }

  return (
    <div className='admin-question-list'>
      {(!questions || questions.length === 0) 
      ? 
        <div className='error'>No questions found, add a question now!</div> 
      : 
        (<></>) // not sure if it is good practice
      }

      {/* Add Question Button */}
      <Button 
        class='button'
        onClick={handleOpenForAdd} 
      >
        Add New Question
      </Button>

      {/* Error Message */}
      {error && <Alert severity="error" style={{ marginBottom: '15px' }}>{error}</Alert>}

      {/* Question List */}
      {questions.map((question) => (
        <div className='question-panel' key={question._id}>
          <Accordion className='question'>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id={question._id}
            >
              {question.title}
            </AccordionSummary>
            <AccordionDetails>
              <p>{question.description}</p>
              <p>{question.categories}</p>
              <p>{difficultyMap[question.difficulty]}</p>
            </AccordionDetails>
            <AccordionActions>
              <Button onClick={() => handleOpenForUpdate(question)}>Update</Button>
              <Button onClick={() => handleDeleteQuestion(question._id)}>
                Delete
              </Button>
            </AccordionActions>
          </Accordion>
        </div>
      ))}

      {/* Question Form for Add or Update */}
      {/* Current Implementation: Singleton, depends on currentQuestion */}
      <QuestionForm
        open={open} 
        onClose={handleClose} 
        isUpdate={isUpdate} 
        questionData={currentQuestion} 
        update={handleUpdateQuestion}
        add={handleAddQuestion}
      />
    </div>
  );
}

import { Alert, Box, Button, Checkbox, Container, Paper, TextField } from "@mui/material";
import { useState } from "react";

import type { Test } from "../../types";
import api from "../../api/api";
import axios from "axios";

const CreateTest = () => {
  const [formData, setFormData] = useState<Partial<Test>>({
    testImage: "",
    title: "",
    description: "",
    questions: [
      {
        questionImage: "",
        text: "",
        options: [
          {
            text: "",
            isCorrect: false,
          },
        ],
        points: 0,
      },
    ],
  });
  const [errorMsg, setErrorMsg] = useState("");

  const AddQuest = () => setFormData(prev => ({
    ...prev,
    questions: [...(prev.questions || []), {questionImage: "", text: "", options: [{text: "", isCorrect: false}], points: 0}]
  }));

  const DeleteQuest = (qIndex: number) => setFormData(prev => ({
    ...prev,
    questions: prev.questions?.filter((_, i) => i != qIndex)
  }))

  const AddOption = (qIndex: number) => setFormData(prev => ({
    ...prev,
    questions: prev.questions?.map((quest, index) => index === qIndex ? { ...quest, options: [...quest.options, {text: "", isCorrect: false}] } : quest)
  }));

  const DeleteOption = (qIndex: number, oIndex: number) => setFormData(prev => ({
    ...prev,
    questions: prev.questions?.map((quest, index) => index === qIndex ? {...quest, options: quest.options.filter((_, i) => i != oIndex)} : quest)
  }))

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData(() => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleQuestionChange = (qIndex: number, newVal: string) => setFormData((prev) => ({
    ...prev,
    questions: prev.questions?.map((quest, index) => index === qIndex ? {...quest, text: newVal} : quest)
  }));

  const handlePointsChange = (qIndex: number, newVal: string) => setFormData((prev) => ({
    ...prev,
    questions: prev.questions?.map((quest, index) => index === qIndex ? {...quest, points: Number(newVal)} : quest)
  }));

  const handleOptionChange = (qIndex: number, oIndex: number, newVal: string) => setFormData((prev) => ({
    ...prev,
    questions: prev.questions?.map((quest, index) => index === qIndex ? {...quest, options: quest.options?.map((option, index) => index === oIndex ? {...option, text: newVal} : option)} : quest)
  }));

  const toggleCorrect = (qIndex: number, oIndex: number) => setFormData((prev) => ({
    ...prev,
    questions: prev.questions?.map((quest, index) => index === qIndex ? {...quest, options: quest.options.map((option, optIndex) => optIndex === oIndex ? {...option, isCorrect: true} : {...option, isCorrect: false})} : quest) 
  }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();

    const fileInput = document.getElementById('inputFile') as HTMLInputElement;
    if (fileInput.files?.[0]) data.append("testImage", fileInput.files[0]);
    
    formData.questions?.forEach((_, qIndex) => {
      const fileInput = document.getElementById(`file-question-${qIndex}`) as HTMLInputElement;
      if (fileInput.files?.[0]) data.append(`questionImage_${qIndex}`, fileInput.files[0]);
    });

    const questions = JSON.stringify(formData.questions)
    data.append("title", formData.title || "")
    data.append("description", formData.description || "")
    data.append("questions", questions);

    try {
      await api.post("/test/create", data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error: ", error);
        const message = error.response?.data?.message || "Something went wrong";
        setErrorMsg(message);
      }
    }
  };

  return (
    <Container>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {errorMsg && (
          <Alert severity="error" sx={{ width: "45%", mb: 2, mx: "auto" }}>
            {errorMsg}
          </Alert>
        )}
        <Button component="label" htmlFor="inputFile">
          Upload Image
          <input name="testImage" type="file" id="inputFile" hidden />
        </Button>
        <TextField
          name="title"
          value={formData?.title}
          onChange={handleChange}
          label="Title"
          required
          slotProps={{ htmlInput: { maxLength: 128 } }}
          helperText={`${formData.title?.length}/128`}
        />
        <TextField
          name="description"
          value={formData?.description}
          onChange={handleChange}
          label="Description"
          slotProps={{ htmlInput: { maxLength: 256 } }}
          helperText={`${formData.description?.length}/256`}
        />
        {formData.questions?.map((question, qIndex) => (
          <Paper key={qIndex} sx={{display: "flex", flexDirection: "column", gap: 2}}>
            <Button component="label" htmlFor={`file-question-${qIndex}`} >
              Upload Image
              <input name="questionImage" type="file" id={`file-question-${qIndex}`} hidden />
            </Button>
            <TextField name="text" value={question.text} onChange={(e) => { handleQuestionChange(qIndex, e.target.value) }} label="Question" slotProps={{ htmlInput: { maxLength: 128 } }} helperText={`${formData.title?.length}/128`} />
                {question.options.map((option, oIndex) => (
                  <Box key={oIndex} sx={{ display: 'flex', alignItems: 'center', gap: 1 }} width="100%">
                    <TextField name="text" value={option.text} onChange={(e) => {handleOptionChange(qIndex, oIndex, e.target.value)}} label="Option" sx={{width: "95%"}} slotProps={{ htmlInput: { maxLength: 128 } }} helperText={`${formData.title?.length}/128`} />
                    <Checkbox name="isCorrect" checked={option.isCorrect} onChange={() => {toggleCorrect(qIndex, oIndex)}}/>
                    <Button onClick={() => {DeleteOption(qIndex, oIndex)}}>D</Button>
                  </Box>
                ))}
            <Button onClick={() => {AddOption(qIndex)}} variant="outlined" >Add Option</Button>
            <TextField type="number" name="points" value={question.points} onChange={(e) => {handlePointsChange(qIndex, e.target.value)}} label="Points" />
            <Button onClick={() => {DeleteQuest(qIndex)}}>Delete</Button>
          </Paper>
        ))}
        <Button onClick={AddQuest} variant="outlined" >Add Question</Button>
        <Button onClick={handleSubmit} variant="contained" color="warning" >Send</Button>
      </Box>
    </Container>
  );
};

export default CreateTest;

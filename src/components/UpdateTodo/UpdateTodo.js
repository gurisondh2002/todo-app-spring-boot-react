import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../Security/AuthContext';
import { createTodoApi, getTodoApi, retrieveAllTodosForUsername, updateTodoApi } from '../api/TodoApiService';
import {Formik , Form, Field, ErrorMessage } from 'formik'
import { useNavigate } from 'react-router-dom';


function UpdateTodo() {

  const navigate = useNavigate();

  const {id} = useParams();
  const [description, setDescription] = useState('');
  const [targetDate, setTargetDate] = useState('');

  const authContext = useAuth();
  const username = authContext.username;

  useEffect(
    () => getTodo(), [id]
  )

  function getTodo(){
    if(id !== -1){

    getTodoApi(username, id)
    .then(resp => {
      setDescription(resp.data.description);
      setTargetDate(resp.data.targetDate);
    })
    .catch(err => console.log(err));
  }
  }

  const handleSubmit = (e) =>{
    // e.preventDefault();
    const todo = {
      id:id,
      username:username,
      description:e.description,
      targetDate:e.targetDate,
      done:false
    }

    if(id === -1){
      createTodoApi(username, todo)
      .then(resp =>{
        navigate("/todos");
      })
      .catch(err =>{
        console.log(err);
      })
    }
    else{
    updateTodoApi(username, id, todo)
    .then(resp =>{
      navigate("/todos");
    })
    .catch(err =>{
      console.log(err);
    })
  }
  }

  const validateValues = (e) =>{
    let errors = {}

    if(e.description.length < 5){
      errors.description = "Enter atleast 5 characters"
    }
    if(e.targetDate == null || e.targetDate === ''){
      errors.targetDate = "Enter the target date"
    }
    return errors;
  }
  return (
    <div>
      <h1>Enter Todo Details</h1>
      <div>
        <Formik initialValues={{description, targetDate}}
        enableReinitialize = {true}
        onSubmit={handleSubmit}
        validate={validateValues}
        validateOnChange={false}
        validateOnBlur={false}>
          {
            (props) =>(
              <Form>
                <ErrorMessage name="description" component="div"/>
                <ErrorMessage name="targetDate" component="div"/>
                <fieldset className="form-group">
                  <label>Description</label>
                  <Field type="texr" className="form-control" name="description"/>
                </fieldset>
                <fieldset className="form-group">
                  <label>Target Date</label>
                  <Field type="texr" className="form-control" name="targetDate"/>
                </fieldset>
                <div>
                  <button className="btn btn-success m-5" type="submit">Save</button>
                </div>
              </Form>
            )
          }
        </Formik>
      </div>
    </div>
  )
}

export default UpdateTodo
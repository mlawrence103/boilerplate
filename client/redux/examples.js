import axios from 'axios';

//action types
const GOT_EXAMPLES_FROM_SERVER = 'GOT_EXAMPLES_FROM_SERVER';
const CREATE_EXAMPLE = 'CREATE_EXAMPLE';
const DELETE_EXAMPLE = 'DELETE_EXAMPLE';

//action creators
export const gotExamplesFromServer = (examples) => ({
  type: GOT_EXAMPLES_FROM_SERVER,
  examples,
});

export const _createExample = (example) => ({
  type: CREATE_EXAMPLE,
  example,
});

export const _deleteCampus = (example) => ({
  type: DELETE_EXAMPLE,
  example,
});

//thunk creators
export const fetchExamples = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('/api/examples');
      const examples = res.data;
      dispatch(gotExamplesFromServer(examples));
    } catch (error) {
      console.log(error);
    }
  };
};

export const createExample = (example, history) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('/api/examples', example);
      const newExample = res.data;
      dispatch(_createExample(newExample));
      history.push('/examples');
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteExample = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`/api/exaples/${id}`);
      const example = res.data;
      dispatch(_deleteExample(example));
    } catch (error) {
      console.log(error);
    }
  };
};

//reducer
export default function examplesReducer(state = [], action) {
  switch (action.type) {
    case GOT_EXAMPLES_FROM_SERVER:
      return action.examples;
    case CREATE_EXAMPLE:
      return [...state, action.example];
    case DELETE_EXAMPLE:
      return state.filter((example) => example.id !== action.example.id);
    default:
      return state;
  }
}
